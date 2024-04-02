import { useContext, useEffect, useState } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { GlobalUserContext } from "../components/context/UsersContext.jsx";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const { currentUser } = useContext(GlobalUserContext);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // Guard clause to prevent unnecessary processing
    if (!file) {
      return;
    }

    const storageRef = ref(projectStorage, file.name);
    const collectionRef = collection(projectFirestore, "images");

    const uploadTask = uploadBytesResumable(storageRef, file);

    const unsubscribe = uploadTask.on(
      "state_changed",
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const downloadUrl = await getDownloadURL(storageRef);
        const createdAt = timestamp();
        const currentUserId = currentUser?.id || currentUser?.sub;

        await addDoc(collectionRef, {
          UploadUserId: currentUserId,
          url: downloadUrl,
          createdAt,
          likes: 0,
          interactedAccounts: {},
          comments: [],
        });

        setUrl(downloadUrl);
      }
    );

    // Cleanup function to unsubscribe when unmounts
    return () => unsubscribe();
  }, [file]);

  return { progress, error, url };
};

export default useStorage;
