import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/style.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
  ]);
  
  return router;
}

const router = rout(); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> 
  </StrictMode>
)
