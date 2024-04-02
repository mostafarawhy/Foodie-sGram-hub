import { useContext, useState } from "react";
import { navLinks } from "../Constants/index";
import LoginButton from "./LoginButton";
import { GlobalContext } from "./context/GlobalState";
import { GlobalUserContext } from "./context/UsersContext";
import NotificationDropDown from "./NotificationDropDown";

const NavBar = () => {
  const [active, setActive] = useState("");
  const { toggle, setToggle } = useContext(GlobalContext);
  const { currentUser } = useContext(GlobalUserContext);

  // const userPicture = currentUser?.picture?.data?.url;
  const username = currentUser?.name;

  return (
    <nav
      className={`w-full flex items-center py-3 fixed top-0 z-20 bg-custom1`}
    >
      <div className="w-full flex justify-between items-center px-3 md:px-20">
        <div
          to="/"
          className="flex flex-row items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={
              "https://i.pinimg.com/736x/9b/e3/75/9be3752201e8dd56a385222f7ecce07a.jpg"
            }
            alt="picture"
            className="rounded-full w-12 min-w-12"
          />
          <p className="text-white text-[18px] sm:text-sm md:text-[14px] font-bold cursor-pointer flex">
            {username ? username : "ImagesHub"} &nbsp;
          </p>
        </div>

        <div className="flex flex-row gap-5 block md:hidden">
          <LoginButton />

          <button
            className="text-white flex items-center justify-center h-10 w-10 hover:pointer "
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-custom3  hover:text-custom4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-row gap-10">
          <NotificationDropDown />
          <ul className="list-none text-custom4 flex flex-row gap-10 md:flex hidden ">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-custom3" : "text-custom4"
                } hover:text-custom3 text-[18px] text-custom font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}

            <LoginButton />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
