import { useState, createContext } from "react";

export const GlobalContext = createContext({
  selectedImg: null,
  setSelectedImg: () => {},
  uploaderId: null,
  setUploaderId: () => {},
  selectedImageID: null,
  setSelectedImageID: () => {},
  isOpen: true, //
  setIsOpen: () => {},
  loginModalOpen: false,
  setLogInModalOpen: () => {},
  toggle: true, //mobilemenu toggle
  setToggle: () => {},
});

// eslint-disable-next-line react/prop-types
const GlobalProvider = ({ children }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [uploaderId, setUploaderId] = useState(null);
  const [selectedImageID, setSelectedImageID] = useState(null);

  const [loginModalOpen, setLogInModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  // handle rating
  // const [rating, setRating] = useState(0);
  // const [hoverRating, setHoverRating] = useState(0);

  // const handleMouseEnter = (starIndex) => {
  //   setHoverRating(starIndex);
  // };

  // const handleMouseLeave = () => {
  //   setHoverRating(0);
  // };

  // const handleClick = (starIndex) => {
  //   setRating(starIndex);
  // };

  const GlobalProviderValue = {
    selectedImg,
    setSelectedImg,
    loginModalOpen,
    setLogInModalOpen,
    uploaderId,
    setUploaderId,
    selectedImageID,
    setSelectedImageID,
    isOpen,
    setIsOpen,
    toggle,
    setToggle,
  };

  return (
    <GlobalContext.Provider value={GlobalProviderValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
