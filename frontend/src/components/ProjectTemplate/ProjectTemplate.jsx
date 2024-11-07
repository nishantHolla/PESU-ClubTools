import "./project_template_style.css";
import TemplateImage from "./TemplateImage";
import { useSession } from "../../providers/session/Session";
import { useEffect, useState } from "react";

function ProjectTemplate({ projectid }) {
  const { projects } = useSession();
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    setCurrentProject(projects.find((f) => f["_id"] === projectid));
  }, []);

  return (
    <div className="project-template-container">
      <TemplateImage projectid={projectid} />
      <div className="project-template-sidebar">
        {currentProject && (
          <>
            <h3 className="project-name">{currentProject.name}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectTemplate;
