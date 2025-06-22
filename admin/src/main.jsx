import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";
import AdminContext from "./context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <BrowserRouter>
    <AdminContext>
      <App />
      </AdminContext>
    </BrowserRouter>
  </AuthContext>
);
