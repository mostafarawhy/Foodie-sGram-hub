import { useContext } from "react";
import { GlobalUserContext } from "./context/UsersContext";

const Title = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const username = currentUser?.name;

  return (
    <div className=" title">
      <h2>Welcome {username ? username : "Foodie"}</h2>
      <p>UPLOAD YOUR FOOD EXPERINCE !</p>
    </div>
  );
};

export default Title;
