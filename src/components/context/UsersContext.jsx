import { useState, createContext } from "react";

export const GlobalUserContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  user: {},
  setUser: () => {},
  token: {},
  setToken: () => {},
  facebook: {
    loginSuccess: () => {},
    loginFail: () => {},
    profileSuccess: () => {},
  },
});

// eslint-disable-next-line react/prop-types
const GlobalUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }); //Initialize to user if found

  // Combine the state and functions into a single object
  const GlobalUserProviderValue = {
    user,
    setUser,
    token,
    setCurrentUser: (user) => {
      localStorage.setItem("user", JSON.stringify(user));

      setCurrentUser(user);
    },
    currentUser,
    setToken,
  };

  return (
    <GlobalUserContext.Provider value={GlobalUserProviderValue}>
      {children}
    </GlobalUserContext.Provider>
  );
};

export default GlobalUserProvider;
