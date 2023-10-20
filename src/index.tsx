import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import FirebaseProvider from "./context/FirebaseContext.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>
);
