import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "../lib/session";

function Dashboard() {
  const navigate = useNavigate();
  const { uid } = useParams();
  const { user, logout } = useSession();

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }

    if (user.uid !== uid) {
      return navigate(`/u/${user.uid}`);
    }
  }, []);

  const handleLogout = () => {
    logout().then(() => {
      return navigate("/");
    });
  };

  return (
    <div>
      <h1>Hi {user && user.displayName}</h1>
      <button onClick={handleLogout}>
        <h3>logout</h3>
      </button>
    </div>
  );
}

export default Dashboard;
