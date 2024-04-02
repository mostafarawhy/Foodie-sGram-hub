import { projectFirestore } from "../firebase/config.js";
import {
  doc,
  updateDoc,
  increment,
  getDoc,
  deleteField,
} from "firebase/firestore";

const useUpdateFireStore = () => {
  const deleteComment = async (commentsArray, imageId, commentId, userId) => {
    const indexToDelete = commentsArray.findIndex(
      (comment) => comment.commentId === commentId
    );
    const imageRef = doc(projectFirestore, "images", imageId);
    const imageSnapshot = await getDoc(imageRef);
    const imageData = imageSnapshot.data();

    if (
      indexToDelete !== -1 &&
      userId === imageData.comments[indexToDelete].profileId
    ) {
      const updatedComments = [
        ...commentsArray.slice(0, indexToDelete),
        ...commentsArray.slice(indexToDelete + 1),
      ];

      // Update the Firestore document with the new comments array
      await updateDoc(imageRef, { comments: updatedComments });

      return indexToDelete;
    } else {
      return -1;
    }
  };

  const updateComment = async (
    imageId,
    commentId,
    profileName,
    commentInput,
    profileId
  ) => {
    const imageRef = doc(projectFirestore, "images", imageId);
    const imageSnapshot = await getDoc(imageRef);
    const imageData = imageSnapshot.data();

    // adding comments
    if (imageData.comments) {
      const imageCommentsArray = imageData.comments;
      // Push a new comment object to the array
      imageCommentsArray.push({
        commentId: commentId,
        profileName: profileName,
        commentInput: commentInput,
        profileId: profileId,
      });

      // Update Firestore document with the new comments array
      await updateDoc(imageRef, { comments: imageCommentsArray });
    }
  };

  // Define likesUpdate function
  const likesUpdate = async (imageId, profileId) => {
    const imageRef = doc(projectFirestore, "images", imageId);

    const imageSnapshot = await getDoc(imageRef);
    const imageData = imageSnapshot.data();

    // Check if the profile has already liked the image
    if (imageData.interactedAccounts[profileId]) {
      await updateDoc(imageRef, {
        likes: increment(-1),
      });
      await updateDoc(imageRef, {
        [`interactedAccounts.${profileId}`]: deleteField(),
      });
    } else {
      await updateDoc(imageRef, {
        likes: increment(1),
      });
      const newAccountsLikedThat = {
        ...imageData.interactedAccounts,
        [profileId]: true,
      };
      await updateDoc(imageRef, { interactedAccounts: newAccountsLikedThat });
    }
  };

  return { likesUpdate, updateComment, deleteComment };
};

export default useUpdateFireStore;
