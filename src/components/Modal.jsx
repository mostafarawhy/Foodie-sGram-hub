import { motion } from "framer-motion";
import CommentBox from "./CommentBox";
import { useContext, useState } from "react";
import useUpdateFireStore from "../hooks/useUpdateFireStore";
import { GlobalUserContext } from "./context/UsersContext";
import { GlobalContext } from "./context/GlobalState";
import useInteraction from "../hooks/useInteraction";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Modal = () => {
  const [input, setInput] = useState("");
  const { updateComment } = useUpdateFireStore();
  const { addNewInteraction } = useInteraction();
  const { selectedImg, setSelectedImg, selectedImageID, uploaderId } =
    useContext(GlobalContext);
  const { setLogInModalOpen } = useContext(GlobalContext);
  const { currentUser } = useContext(GlobalUserContext);
  const currentProfileName = currentUser?.name;
  const currentProfileId = currentUser?.id || currentUser?.sub;
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
      navigate("/home-profile");
    }
  };

  const handleComment = () => {
    const randomCommentId = generateRandomCommentId();
    if (!currentUser) {
      setLogInModalOpen(true);
    } else {
      updateComment(
        selectedImageID,
        randomCommentId,
        currentProfileName,
        input,
        currentProfileId
      );
      addNewInteraction(
        uploaderId,
        currentUser,
        "comment",
        selectedImg,
        input,
        selectedImageID
      );
      setInput("");
    }
  };

  const generateRandomCommentId = () => {
    return Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
  };

  return (
    <motion.div
      className="backdrop flex flex-col justify-center items-center"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg}
        alt="enlarged pic"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
      <div className="mt-5 w-full flex flex-row justify-center items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Add Your Experience..."
          className=" border w-8/12 border-gray-300 rounded-l-md px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleComment}
          className="ml-2 bg-custom2 hover:bg-custom3 text-white font-bold rounded-r-md px-4 py-2"
        >
          Comment
        </button>
      </div>
      <CommentBox />
    </motion.div>
  );
};

export default Modal;
