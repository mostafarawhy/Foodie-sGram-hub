// useFirestore.js
import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config.js";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const useFirestore = (myCollection) => {
  const [docs, setDocs] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   console.log(docs[0]);
  // }, [isloading]);

  useEffect(() => {
    const q = query(
      collection(projectFirestore, myCollection),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching Firestore documents:", error);
        setIsLoading(false); // Set loading state to false in case of error
      }
    );

    return () => {
      unsub();
    };
  }, [myCollection]);

  return { docs, isloading };
};

export default useFirestore;
