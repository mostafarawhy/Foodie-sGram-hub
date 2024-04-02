import { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import { GlobalUserContext } from "./context/UsersContext";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

// eslint-disable-next-line react/prop-types
const LoginButton = () => {
  const { setLogInModalOpen } = useContext(GlobalContext);
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const navigate = useNavigate();
  const logOut = () => {
    googleLogout();
    setCurrentUser(null);
  };

  return (
    <button
      className="bg-custom3 hover:bg-custom5 text-custom4 font-bold py-1 px-1.5 rounded md:text-xsm md:py-2 md:px-4"
      onClick={() => {
        if (currentUser) {
          setCurrentUser(null);
          navigate("/");
          logOut();
        } else {
          setLogInModalOpen(true);
        }
      }}
    >
      {currentUser ? "Sign Out" : "Sign In"}
    </button>
  );
};

export default LoginButton;
