import "./dashboard_style.css";
import axios from "axios";
import { BACKEND_URL } from "../../lib/constants";
import ImageFrame from "../../components/ImageFrame/ImageFrame";
import ProjectFrame from "../../components/ProjectFrame/ProjectFrame";
import { useStatus } from "../../providers/status/Status";
import { useSession } from "../../providers/session/Session";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, projects, setProjects } = useSession();
  const { setStatus } = useStatus();
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

  const createProject = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/project`, {
        email: user.email,
      }, {headers: {'Authorization': `Bearer ${await user.getIdToken()}`}});
      const project = response.data.result;
      setProjects([project, ...projects]);
      navigate(`/u/${user.uid}/p/${project["_id"]}/template`);
      localStorage.setItem('projects', JSON.stringify(projects))
    } catch (e) {
      setStatus("error", "Failed to create new project");
    }
  };

  return (
    <div className="dashboard-container">
      <ImageFrame className="blank-project" onClick={createProject}>
        Blank Project
      </ImageFrame>
      {projects.map((p) => (
        <ProjectFrame key={p["_id"]} project={p} />
      ))}
    </div>
  );
}

export default Dashboard;
