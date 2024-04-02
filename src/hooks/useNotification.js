import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config.js";
import { doc, onSnapshot } from "firebase/firestore";

const useNotification = (userId) => {
  const [notificationsArray, setNotificationsArray] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing or invalid");
      return;
    }

    const notificationsRef = doc(projectFirestore, "notifications", userId);
    const unsubscribe = onSnapshot(
      notificationsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const notificationsData = snapshot.data();
          const userNotificationsArray = notificationsData.notifications;
          setNotificationsArray(userNotificationsArray?.reverse());
        } else {
          setNotificationsArray([]);
          setError(null);
        }
      },
      (error) => {
        setError("Error fetching notifications: " + error.message);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { notificationsArray, error };
};

export default useNotification;
