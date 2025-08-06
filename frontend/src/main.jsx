import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="356742496510-jo7u3v181lmp82i5ijt9m8lj4uelihit.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
