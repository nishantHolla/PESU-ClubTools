import "./project_style.css";
import { useEffect, useState } from "react";
import { useSession } from "../../providers/session/Session";
import { useParams, useNavigate } from "react-router-dom";
import ProjectBar from "../../components/ProjectBar/ProjectBar";
import Mail from "../../components/Mail/Mail";
import Template from "../../components/Template/Template";

function Project() {
  const { projectid } = useParams();
  const { user, userData } = useSession();
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
      <div className="project-workspace">
        {current === "mail" && <Mail />}
        {current === "template" && (
          <Template
            projectid={projectid}
          />
        )}
      </div>
    </div>
  );
}

export default Project;
