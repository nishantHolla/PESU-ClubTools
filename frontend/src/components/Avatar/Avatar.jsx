import "./avatar_style.css";
import { useEffect, useState, useRef } from "react";
import { useSession } from "../../providers/session/Session";
import UserPanel from "../UserPanel/UserPanel";
import Icon from "../Icon/Icon";

function Avatar({ showPanel }) {
  const { user } = useSession();
  const up = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  function setRef(e) {
    up.current = e;
  }

  function toggleIsOpen(e) {
    if (e && e.target === up.current) return;
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (isOpen) {
      document.querySelector("main").addEventListener("click", toggleIsOpen);
    } else {
      document.querySelector("main").removeEventListener("click", toggleIsOpen);
    }
  }, [isOpen]);

  return (
    <div className="avatar-component" onClick={toggleIsOpen}>
      <div className="avatar-badge">
        {user && user.displayName && user.displayName[0]}
      </div>
      <div className="avatar-name">{user && user.displayName}</div>
      <Icon type="eva:arrow-down" className="avatar-icon" />
      {isOpen && showPanel && <UserPanel setRef={setRef} />}
    </div>
  );
}

export default Avatar;
