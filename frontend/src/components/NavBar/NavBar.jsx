import { useEffect } from "react";
import "./navbar_style.css";
import { useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, []);

  return (
    <div className="navbar-component">
      <img
        src="/images/logo_transparent.png"
        width="150px"
        height="80%"
        alt="logo"
      />
    </div>
  );
}

export default NavBar;
