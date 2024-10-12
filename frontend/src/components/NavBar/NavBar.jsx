import "./navbar_style.css";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "../Link/Link"

function NavLink({ text, href }) {
  return (
    <Link className="navbar-link" to={href}>
      {text}
    </Link>
  );
}

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWide, setIsWide] = useState(true);
  const location = useLocation();
  const pathname = location.pathname;

  const links = {
    "/": [
      { name: "About", href: "/about" },
      { name: "Getting Started", href: "/gettingStarted" },
      { name: "Contact Us", href: "/contact" },
    ],
    "/u": [
      { name: "My Projects", href: "/about" },
      { name: "Templates", href: "/gettingStarted" },
      { name: "Documentation", href: "/contact" },
    ],
  };

  const getLinks = (pathname) => {
    if (pathname.startsWith("/u")) return links["/u"];
    else if (links[pathname]) return links[pathname];
    return [];
  };

  const closeNavBar = () => {
    setIsOpen(false);
  };

  const getActions = (pathname) => {
    if (pathname === "/") {
      return (
        <>
          <RouterLink to="/signup">
            <Button onClick={closeNavBar}>Signup</Button>
          </RouterLink>
          <RouterLink to="/login">
            <Button onClick={closeNavBar}>Login</Button>
          </RouterLink>
        </>
      );
    }

    return <></>;
  };

  const checkWindowWidth = () => {
    setIsWide(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowWidth);
    checkWindowWidth();

    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  useEffect(() => {
    if (isWide && isOpen) setIsOpen(false);
  }, [isWide]);

  return (
    <nav className="navbar-component" data-state={isOpen ? "open" : "close"}>
      <div className="navbar-top">
        <div className="navbar-top-left">
          <RouterLink to="/">
            <img
              src="/images/logo_transparent.png"
              width="153px"
              height="40px"
              alt="logo"
            />
          </RouterLink>
        </div>
        <div className="navbar-top-middle">
          {isWide && getLinks(pathname).map((l, i) => (
            <NavLink text={l.name} href={l.href} key={i} />
          ))}
        </div>
        <div className="navbar-top-right">
          {isWide && getActions(pathname)}
          {getLinks(pathname).length > 0 && !isWide && (
            <Icon
              type={isOpen ? "eva:close" : "eva:menu"}
              className="navbar-icon"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          )}
        </div>
      </div>
      <div className="navbar-bottom">
        {getLinks(pathname).map((l, i) => (
          <NavLink text={l.name} href={l.href} key={i} />
        ))}
        <div className="navbar-bottom-actions">{getActions(pathname)}</div>
      </div>
    </nav>
  );
}

export default NavBar;
