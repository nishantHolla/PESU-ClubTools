import ImageFrame from "../../components/ImageFrame/ImageFrame";
import "./dashboard_style.css";
import { useSession } from "../../providers/session/Session";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../lib/db";

function Dashboard() {
  const { user, userData, addProject } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreateProject = () => {
    createProject((result) => {
      addProject(result);
      console.log(result);
      navigate(`/u/${user.uid}/p/${result.data.projectid}`);
    });
  };

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

  if (!userData || !userData.projects) return <></>;

  return (
    <div className="dashboard-container">
      <ImageFrame className="blank-project" onClick={handleCreateProject}>
        Blank Project
      </ImageFrame>
      {userData.projects.map((p) => {
        return (
          <ImageFrame
            src=""
            alt=""
            key={p.projectid}
            onClick={() => {
              navigate(`/u/${user.uid}/p/${p.projectid}`);
            }}
          />
        );
      })}
    </div>
  );
}

export default Dashboard;
