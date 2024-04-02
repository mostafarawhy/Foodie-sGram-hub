import { useContext } from "react";
import LoginModal from "./LoginModal";
import NavBar from "./NavBar";
import ToggleMenu from "./ToggleMenu";
import { GlobalContext } from "./context/GlobalState";

const Home = () => {
  const { loginModalOpen } = useContext(GlobalContext);
  return (
    <>
      <NavBar />
      {loginModalOpen && <LoginModal />}
      <ToggleMenu />
    </>
  );
};

export default Home;
