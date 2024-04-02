import { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import { motion } from "framer-motion";

const ToggleMenu = () => {
  const { toggle } = useContext(GlobalContext);

  // Define CSS classes based on the toggle state
  const menuClass = toggle
    ? "toggle-menu flex px-4"
    : "toggle-menu flex px-4 hidden";

  return (
    <motion.div className={menuClass}>
      <ul className="list-none bg-black flex flex-col justify-center items-center w-full h-full py-3 rounded-lg gap-10 text-pink-700">
        <li style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Link 1</li>
        <li style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Link 2</li>
        <li style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Link 3</li>
      </ul>
    </motion.div>
  );
};

export default ToggleMenu;
