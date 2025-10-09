import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
const clientId =
  "1096918096475-uc28gvuo81v8thbrjmceum3um0k6brg9.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
