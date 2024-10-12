import "./avatar_style.css";
import { useEffect, useRef, useState } from "react";
import { useSession } from "../../providers/session/Session";
import UserPanel from "../UserPanel/UserPanel";

function Avatar({showPanel}) {
  const { user } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  return (
    <div
      className="avatar-component"
      ref={ref}
      onClick={(e) => {
        if (e.target !== ref.current || !showPanel) return;
        setIsOpen(!isOpen);
      }}
    >
      {user && user.displayName && user.displayName[0]}
      {isOpen && showPanel && <UserPanel />}
    </div>
  );
}

export default Avatar;
