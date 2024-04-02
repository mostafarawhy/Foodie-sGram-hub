import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalUserProvider from "./components/context/UsersContext.jsx";
import GlobalProvider from "./components/context/GlobalState.jsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalUserProvider>
      <GlobalProvider>
        <Router>
          <App />
        </Router>
      </GlobalProvider>
    </GlobalUserProvider>
  </React.StrictMode>
);
