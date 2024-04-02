import { useContext } from "react";
import LoginButton from "./LoginButton";
import { GlobalContext } from "./context/GlobalState";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GlobalUserContext } from "./context/UsersContext";
import useUser from "../hooks/useUser";

// eslint-disable-next-line react/prop-types
const LoginModal = () => {
  const { addUser } = useUser();
  const { setLogInModalOpen } = useContext(GlobalContext);
  const { user, setUser, setToken, token, setCurrentUser } =
    useContext(GlobalUserContext);

  const profileResponseFacebook = (response) => {
    console.log(response);
    // Handle the Facebook login response here
    setUser({ ...user, [response.id]: response });
    addUser(response);

    setCurrentUser(response);
    setLogInModalOpen(false); // Close the modal after successful login
  };
  const tokenResponseFacebook = (response) => {
    console.log(response);
    // Handle the Facebook login response here
    setToken({ ...token, [response.userID]: response });
  };

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto
        block
      `}
    >
      <div className=" flex items-center justify-center min-h-screen">
        <div
          className=" fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className=" bg-custom1 relative  rounded-lg px-6 py-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="text-xl font-bold text-white  flex items-center justify-center">
              ImageHub
            </div>
          </div>
          <h2 className="text-center text-white text-xl font-bold mb-4">
            Login to your Account
          </h2>
          <form>
            <div className="mb-4">
              <h3 className="block text-white">Email</h3>
              <input
                type="email"
                id="email"
                className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-6">
              <h3
                htmlFor="password"
                className=" block text-sm font-medium text-white"
              >
                Password
              </h3>
              <input
                type="password"
                id="password"
                className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              <div className="text-sm text-custom4 hover:text-custom3 mt-5">
                <a href="#" className="hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mb-6">
              <LoginButton />
            </div>
            <div className="mb-4">
              <FacebookLogin
                appId="your fb app id here "
                onSuccess={tokenResponseFacebook}
                onFail={(error) => {
                  console.log("Login Failed!", error);
                  // Handle failure logic here, such as showing an error message
                }}
                onProfileSuccess={profileResponseFacebook}
                style={{
                  backgroundColor: "#4267b2",
                  color: "#fff",
                  fontSize: "16px",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div className="text-sm text-custom4 ">
              By logging in, you agree to our <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>.
            </div>
          </form>
          <button
            className="absolute top-4 right-4 text-custom3 hover:text-white focus:outline-none"
            onClick={() => setLogInModalOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
