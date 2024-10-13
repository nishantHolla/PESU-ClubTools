import "./avatar_style.css";
import { useEffect, useState } from "react";
import { useSession } from "../../providers/session/Session";
import UserPanel from "../UserPanel/UserPanel";
import Icon from "../Icon/Icon";

function Avatar({ showPanel }) {
  const { user } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="avatar-component"
      onClick={(e) => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="avatar-badge">
        {user && user.displayName && user.displayName[0]}
      </div>
      <div className="avatar-name">{user && user.displayName}</div>
      <Icon type="eva:arrow-down" className="avatar-icon"/>
      {isOpen && showPanel && <UserPanel />}
    </div>
  );
}

export default Avatar;
