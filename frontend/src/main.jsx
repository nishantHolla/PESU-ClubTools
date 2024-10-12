import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/colors.css";
import "./styles/fonts.css";
import "./styles/layout.css";

import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import { StatusProvider } from "./providers/status/Status";
import { SessionProvider } from "./providers/session/Session";

function rout() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "u/:uid",
          element: <Dashboard />,
        },
        {
          path: "u/:uid/projects",
          element: <Dashboard />,
        },
        {
          path: "u/:uid/templates",
          element: <Dashboard />,
        },
        {
          path: "u/:uid/settings",
          element: <Dashboard />,
        },
        {
          path: "u",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return router;
}

const router = rout();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionProvider>
      <StatusProvider>
        <RouterProvider router={router} />
      </StatusProvider>
    </SessionProvider>
  </StrictMode>,
);
