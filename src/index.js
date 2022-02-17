import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MediaContextProvider from "./context/MediaContext";
import { UserContextProvider } from "./context/authContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <MediaContextProvider>
        <App />
      </MediaContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
