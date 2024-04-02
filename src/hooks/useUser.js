import { projectFirestore, timestamp } from "../firebase/config.js";
import { collection, getDoc, setDoc, doc } from "firebase/firestore";

const useUser = () => {
  const addUser = async (userData) => {
    const userId = userData?.id || userData?.sub;
    const username = userData?.name;
    const userEmail = userData?.email;
    const notificationsDocRef = doc(projectFirestore, "notifications", userId);
    const notificationsDocSnap = await getDoc(notificationsDocRef);
    await setDoc(doc(projectFirestore, "users", userId), {
      displayName: username,
      email: userEmail,
      createdAt: timestamp(),
    });
    if (!notificationsDocSnap.exists()) {
      // If the notifications document doesn't exist, create it
      await setDoc(notificationsDocRef, {
        notifications: [],
      });
    }
  };

  return { addUser };
};
export default useUser;
