import ImageFrame from "../../components/ImageFrame/ImageFrame";
import "./dashboard_style.css";
import { useSession } from "../../providers/session/Session";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, createUser } from "../../lib/db";

function Dashboard() {
  const { user, data } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (location.pathname === "/u") {
      navigate(`/u/${user.uid}/projects`);
    }

    if (location.pathname === `/u/${user.uid}`) {
      navigate(`/u/${user.uid}/projects`);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <ImageFrame className="blank-project">Blank Project</ImageFrame>
      {data.projectids.map((id) => {
        return <ImageFrame src="" alt="" key={id} />;
      })}
    </div>
  );
}

export default Dashboard;
