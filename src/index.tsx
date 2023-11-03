import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import FirebaseProvider from "./context/FirebaseContext.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
    <ToastContainer autoClose={2000} />
  </React.StrictMode>
);
