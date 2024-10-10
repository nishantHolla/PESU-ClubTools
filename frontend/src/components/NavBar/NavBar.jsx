import "./navbar_style.css";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { useState } from "react";

function NavLink({ text, href }) {
  return (
    <span className="navbar-link" href={href}>
      {text}
    </span>
  );
}

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
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

  const getActions = (pathname) => {
    if (pathname === "/") {
      return (
        <>
          <Button>Signup</Button>
          <Button>Login</Button>
        </>
      );
    }

    return <></>;
  };

  return (
    <nav className="navbar-component" data-state={isOpen ? 'open' : 'close'}>
      <div className="navbar-top">
        <img
          src="/images/logo_transparent.png"
          width="153px"
          height="40px"
          alt="logo"
        />
        <div className="navbar-top-middle">
          {getLinks(pathname).map((l, i) => (
            <NavLink text={l.name} href={l.href} key={i} />
          ))}
        </div>
        <div className="navbar-top-right">{getActions(pathname)}</div>
        <Icon
          type={isOpen ? "mdi:close" : "mdi:menu"}
          className="navbar-icon"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
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
