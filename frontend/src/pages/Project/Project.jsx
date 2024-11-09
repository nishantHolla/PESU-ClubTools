import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSession } from "../../providers/session/Session";
import "./project_style.css";
import ProjectBar from "../../components/ProjectBar/ProjectBar";
import ProjectTemplate from "../../components/ProjectTemplate/ProjectTemplate";
import ProjectEmail from "../../components/ProjectEmail/ProjectEmail";

function Project() {
  const { projects } = useSession();
  const params = useParams();
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    setCurrentProject(projects.find((f) => f["_id"] === params.projectid));
  }, []);

  return (
    <div className="project-container">
      <ProjectBar
        projectid={params.projectid}
        userid={params.userid}
        current={params.state || "template"}
      />
      {params.state === "template" && (
        <ProjectTemplate
          projectid={params.projectid}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
        />
      )}
      {params.state === "email" && (
        <ProjectEmail
          projectid={params.projectid}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
        />
      )}
    </div>
  );
}

export default Project;
