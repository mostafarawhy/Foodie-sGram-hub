import { useContext, useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { GlobalContext } from "./context/GlobalState";
import useUpdateFireStore from "../hooks/useUpdateFireStore.js";
import { GlobalUserContext } from "./context/UsersContext.jsx";

const CommentBox = () => {
  const { docs } = useFirestore("images"); // fetching
  const { deleteComment } = useUpdateFireStore();
  const { selectedImageID, isOpen } = useContext(GlobalContext);
  const { currentUser } = useContext(GlobalUserContext);
  // eslint-disable-next-line no-unused-vars
  const [currentImageData, setCurrentImageData] = useState(null);
  const [comments, setComments] = useState(null);
  const currentProfileId = currentUser?.id || currentUser?.sub;

  useEffect(() => {
    const currentImageObj = docs.find((doc) => doc.id === selectedImageID);
    currentImageObj && setCurrentImageData(currentImageObj);
    const commentsArray = currentImageObj && currentImageObj.comments;
    commentsArray && setComments(commentsArray);
  }, [comments, docs, selectedImageID]);

  return (
    <div className=" mb-10 text-xs w-9/12 text-xs bg-custom1 py-4 mt-4 rounded-md  comment-section">
      {comments &&
        comments
          .slice()
          .reverse()
          .map((commentObj) => (
            <div
              className="flex flex-col ml-5 mr-5 text-xs flex-start"
              key={commentObj.commentId}
            >
              <div className="flex flex-row items-center justify-between text-pink-100">
                <div className="flex flex-row flex-start items-center gap-3">
                  <img
                    className="ml-1 rounded-full w-10 min-w-10"
                    src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
                    alt="profile"
                  />
                  <div>{commentObj.profileName}</div>
                </div>
                {currentUser && currentProfileId === commentObj.profileId && (
                  <button
                    className="text-custom4 hover:text-custom3 focus:outline-none"
                    onClick={() =>
                      deleteComment(
                        comments,
                        selectedImageID,
                        commentObj.commentId,
                        currentProfileId
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="comment-container mb-5 flex flex-row gap-5 text-pink-100">
                {commentObj.commentInput}
              </div>
            </div>
          ))}
    </div>
  );
};

export default CommentBox;
