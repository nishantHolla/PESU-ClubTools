import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/index.css";
import "./styles/style.css";

import { SessionProvider } from "./lib/session";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function rout() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/u/:uid",
      element: <Dashboard />,
    },
    {
      path: "/u",
      element: <Dashboard />,
    },
  ]);

  return router;
}

const router = rout();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
);
