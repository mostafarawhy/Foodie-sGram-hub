import { useContext, useState } from "react";
import { GlobalUserContext } from "./context/UsersContext";
import useNotification from "../hooks/useNotification";
import { motion, AnimatePresence } from "framer-motion";
import useInteraction from "../hooks/useInteraction";
import { Link } from "react-router-dom";

const NotificationDropDown = () => {
  //openning dropdown
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { currentUser } = useContext(GlobalUserContext);
  const { readNotifications } = useInteraction();
  const userId = currentUser?.id || currentUser?.sub;
  const { notificationsArray } = useNotification(userId);
  //shows only latest 8 notifications
  const visibleNotifications =
    notificationsArray?.length > 6
      ? notificationsArray.slice(0, 8)
      : notificationsArray;

  // shortning long comments in notification preview ...
  const shortPreview = (str) => {
    return str && str.length <= 20 ? str : str.slice(0, 20) + "...";
  };

  // counting new notificatin
  const notificationsNum = () => {
    let count = 0;
    notificationsArray?.forEach((notificationObj) => {
      !notificationObj.read && count++;
    });
    return count;
  };

  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
    //to clear background from unread and set all to read
    setTimeout(() => {
      readNotifications(userId);
    }, 1400);
  };

  return (
    <div className="relative">
      <div className="flex flex row gap-2">
        {notificationsNum() > 0 && (
          <div className="flex items-center justify-center bg-custom3 text-white rounded-md w-6 h-6">
            {notificationsNum()}
          </div>
        )}

        <button
          className="text-custom4 hover:text-custom3 focus:outline-none"
          onClick={toggleDropdown}
        >
          Notification
        </button>
      </div>

      <AnimatePresence>
        {dropDownOpen && (
          <motion.div className="notification-dropdown">
            <div className="notification-tail"></div>
            <div className="notification-content">
              {notificationsArray.length <= 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="block px-2 py-2 flex flex-row items-center justify-center text-xs text-black font-bold"
                  href="/"
                >
                  you have no notifications
                </motion.div>
              ) : (
                visibleNotifications?.map((notification, index) => (
                  <motion.div
                    key={index}
                    className={`flex flex-row items-center ${
                      !notification.read ? "bg-custom5" : ""
                    }`}
                  >
                    <Link
                      className="flex flex-row items-center"
                      to={`/home-profile?imageUrl=${notification.imageUrl}&imageId=${notification.imageId}`}
                    >
                      <img
                        className="ml-1 rounded-full w-8 min-w-8"
                        src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
                        alt="profile"
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="block px-2 py-2 text-xs text-black font-bold   "
                      >
                        {`${notification.message} ${shortPreview(
                          notification.commentInput
                        )}`}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropDown;
