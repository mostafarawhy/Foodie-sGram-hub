import { projectFirestore } from "../firebase/config.js";
import { setDoc, updateDoc, doc, getDoc } from "firebase/firestore";

//adding Interactions To  database (firestore)

const useInteraction = () => {
  const addNewInteraction = async (
    UploaderId,
    currentUser,
    interactionType,
    imageUrl,
    input
  ) => {
    const userId = UploaderId;
    const currentUserId = currentUser?.id || currentUser?.sub;
    const username = currentUser?.name;
    const commentString = input || "";
    const notificationsDocRef = doc(projectFirestore, "notifications", userId);
    const notificationsDocSnap = await getDoc(notificationsDocRef);
    const notificatioData = notificationsDocSnap.data(); //array of objects
    const notificationsArray = notificatioData?.notifications;
    const alreadyExists = notificationsArray.some((notification) => {
      return (
        interactionType === "like" &&
        notification.type === interactionType &&
        notification.senderProfileName === username &&
        notification.message ===
          `${username} ${
            interactionType === "comment"
              ? "commented on Your Post"
              : "Liked Your Post"
          }`
      );
    });

    if (notificationsArray) {
      !alreadyExists &&
        userId !== currentUserId &&
        notificationsArray.push({
          type: interactionType,
          senderProfileName: username,
          imageUrl: imageUrl,
          commentInput: `${
            interactionType === "comment" ? `: ${commentString} ` : ""
          } `,
          message: `${username} ${
            interactionType === "comment"
              ? `commented on Your Post `
              : "Liked Your Post "
          } `, //either commented or liked ur post
          read: false,
        });

      await updateDoc(notificationsDocRef, {
        notifications: notificationsArray,
      });
    }
    //for error handling if for somereason when creating user the notification collection failed
    else {
      await setDoc(notificationsDocRef, {
        notifications: [],
      });
    }
  };

  const readNotifications = async (userId) => {
    const notificationsRef = doc(projectFirestore, "notifications", userId);
    const notificationsSnapshot = await getDoc(notificationsRef);
    const notificationsData = notificationsSnapshot.data();
    const userNotificationsArray = notificationsData?.notifications || [];

    // Mark all notifications as read
    const updatedNotifications = userNotificationsArray.map((notification) => ({
      ...notification,
      read: true,
    }));

    await updateDoc(notificationsRef, {
      notifications: updatedNotifications,
    });
  };

  return { addNewInteraction, readNotifications };
};

export default useInteraction;
