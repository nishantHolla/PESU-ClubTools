import "./navbar_style.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSession } from "../../providers/session/Session";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { Link as RouterLink } from "react-router-dom";
import Link from "../Link/Link";

function NavLink({ text, href, onClick }) {
  return (
    <Link className="navbar-link" to={href} onClick={onClick}>
      {text}
    </Link>
  );
}

function NavBar() {
  const { user } = useSession();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isWide, setIsWide] = useState(true);
  const location = useLocation();
  const pathname = location.pathname;

  const goTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = {
    "/": [
      {
        name: "How to use",
        onClick: () => {
          goTo("#home-usage");
        },
      },
      {
        name: "About",
        onClick: () => {
          goTo("#home-about");
        },
      },
      {
        name: "Contact Us",
        onClick: () => {
          goTo("#home-contact-us");
        },
      },
    ],
    "/u": [
      { name: "My Projects", href: `/u/:uid/projects` },
      { name: "Templates", href: `/u/:uid/templates` },
    ],
  };

  const closeNavBar = () => {
    setIsOpen(false);
  };

  const getLinks = (pathname) => {
    if (pathname.startsWith("/u") && user) {
      return links["/u"].map((l) => {
        l.href = l.href.replace(":uid", user ? user.uid : "unk");
        return l;
      });
    } else if (links[pathname]) {
      return links[pathname];
    }

    return [];
  };

  const getActions = (pathname) => {
    if (pathname === "/") {
      if (user) {
        return (
          <RouterLink to={`/u/${user.uid}`}>
            <Button onClick={closeNavBar}>Dashboard</Button>
          </RouterLink>
        );
      } else {
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
    }

    return <></>;
  };

  const checkWindowWidth = () => {
    setIsWide(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowWidth);
    checkWindowWidth();

    if (pathname.startsWith("/u") && !user) {
      navigate("/");
    }

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
          {isWide &&
            getLinks(pathname).map((l, i) => (
              <NavLink
                text={l.name}
                href={l.href}
                onClick={l.onClick}
                key={i}
                hello="a"
              />
            ))}
        </div>
        <div className="navbar-top-right">
          {isWide && getActions(pathname)}
          {pathname.startsWith("/u") && isWide && (
            <div className="navbar-avatar">
              <Avatar showPanel={true} />
            </div>
          )}
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
          <NavLink text={l.name} href={l.href} key={i} onClick={closeNavBar} />
        ))}
        <div className="navbar-bottom-actions">
          <div className="navbar-avatar">
            {pathname.startsWith("/u") && <Avatar showPanel={true} />}
          </div>
          {getActions(pathname)}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
