import "./project_style.css";
import { useEffect, useState } from "react";
import { useSession } from "../../providers/session/Session";
import { useParams, useNavigate } from "react-router-dom";
import ProjectBar from "../../components/ProjectBar/ProjectBar";
import Mail from "../../components/Mail/Mail";

function Project() {
  const { projectid } = useParams();
  const { user } = useSession();
  const [current, setCurrent] = useState("template");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (!projectid) {
      navigate(`/u/${user.uid}/projects`);
    }
  }, []);

  return (
    <div className="project-container">
      <ProjectBar current={current} setCurrent={setCurrent} />
      <div className="project-workspace">{current === "mail" && <Mail />}</div>
    </div>
  );
}

export default Project;
