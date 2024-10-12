import "./avatar_style.css";
import { useEffect } from "react";
import { useSession } from "../../providers/session/Session";

function Avatar() {
  const { user } = useSession();

  return (
    <div className="avatar-component">
      {user && user.displayName && user.displayName[0]}
    </div>
  );
}

export default Avatar;
