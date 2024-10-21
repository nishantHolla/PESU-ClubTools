import ImageFrame from "../../components/ImageFrame/ImageFrame";
import "./dashboard_style.css";
import { useSession } from "../../providers/session/Session";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

<<<<<<< HEAD
=======
  const handleCreateProject = () => {
    createProject((result) => {
      addProject(result);
      console.log(result);
      navigate(`/u/${user.uid}/p/${result.data.projectid}`);
    });
  };

>>>>>>> parent of 0f89069 (Add data uploading)
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
      <ImageFrame src="certificate1.png" alt="Certificate 1" />
      <ImageFrame src="certificate2.png" alt="Certificate 2" />
      <ImageFrame src="certificate3.png" alt="Certificate 3" />
      <ImageFrame src="certificate4.png" alt="Certificate 4" />
      <ImageFrame src="certificate5.png" alt="Certificate 5" />
    </div>
  );
}

export default Dashboard;
