import logo from "../assets/logo-transparent-chef.png";
import { useContext, useEffect } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GlobalUserContext } from "./context/UsersContext";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import axios from "axios";
import useUser from "../hooks/useUser";

const HomePageLogin = () => {
  const { user, setUser, setToken, token, setCurrentUser, currentUser } =
    useContext(GlobalUserContext);
  const navigate = useNavigate();
  const { addUser } = useUser();

  const GoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);

      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      setUser({ ...user, [userInfo.sub]: userInfo });
      setCurrentUser(userInfo.data);
      addUser(userInfo.data);

      navigate("/home-profile");

      console.log(userInfo.data);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const profileResponseFacebook = (response) => {
    // Handle the Facebook login response here
    setUser({ ...user, [response.id]: response });
    addUser(response);

    setCurrentUser(response);
    navigate("/home-profile");
  };
  const tokenResponseFacebook = (response) => {
    // Handle the Facebook login response here
    setToken({ ...token, [response.userID]: response });
  };

  useEffect(() => {
    currentUser && navigate("/home-profile");
  }, []);
  return (
    <>
      <div className="relative h-screen flex items-center justify-center  Home-page "></div>

      <div className="w-full max-w-3xl mx-auto  flex rounded-lg shadow-lg bg-white bg-opacity-75 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden z-10">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-custom3 to-custom1 py-8 px-6 w-1/2">
          {/* Logo */}
          <img className="h-90 w-auto mb-4" src={logo} alt="Logo" />
          {/* Site Info */}
          <div className="text-white text-center">
            <h2 className="text-3xl text-custom4 font-semibold">Foodies Hub</h2>
            <p className="text-custom4 text-xl mt-2">
              Discover,Share your Food Places and Experiences
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div className="bg-custom1 py-8 px-6 sm:px-10 w-1/2">
          {/* Title */}
          <h2 className="text-3xl text-custom4 font-semibold mb-4 text-center">
            Bon Appétit !
          </h2>
          {/* Form */}
          <form>
            {/* Email */}
            <div className="mb-4 ">
              <div htmlFor="email" className="block text-custom4">
                Email
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-custom3 focus:ring-opacity-50"
              />
            </div>
            {/* Password */}
            <div className="mb-4">
              <div htmlFor="password" className="block text-custom4">
                Password
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>
            {/* Forgot Password */}
            <div className="text-right mb-4">
              <a href="#" className="text-sm text-custom4 hover:text-custom3">
                Forgot Password?
              </a>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-custom3 text-white rounded-lg py-2 hover:bg-custom5 transition duration-300 ring ring-custom4 ring-opacity-50"
            >
              Login
            </button>
          </form>
          {/* Sign Up */}
          <div className="fle text-center mt-4">
            <p className="text-custom4">Don't have an account?</p>
            <a
              href="#"
              className="text-custom4 text-lg font-bold hover:text-custom3 underline"
            >
              Sign up
            </a>
          </div>
          {/* Social Buttons */}
          <div className="flex flex-col gap-7 items-center justify-center mt-4">
            <FacebookLogin
              appId="your fb app id here ..."
              onSuccess={tokenResponseFacebook}
              onFail={(error) => {
                console.log("Login Failed!", error);
                // Handle failure logic here, such as showing an error message
              }}
              onProfileSuccess={profileResponseFacebook}
              className="bg-custom3 text-white rounded-lg py-2 px-3  hover:bg-custom5 transition duration-300 ring ring-custom4 ring-opacity-50"
              // style={{
              //   backgroundColor: "#4267b2",
              //   color: "#fff",
              //   fontSize: "16px",
              //   padding: "12px 24px",
              //   border: "none",
              //   borderRadius: "4px",
              // }}
            />
            <button
              className="bg-custom3 text-white rounded-lg py-2 px-5  hover:bg-custom5 transition duration-300 ring ring-custom4 ring-opacity-50"
              onClick={() => GoogleLogin()}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageLogin;
