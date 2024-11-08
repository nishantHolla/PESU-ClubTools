import "./project_email_style.css";
import Input from "../Input/Input";
import { useStatus } from "../../providers/status/Status";
import { useSession } from "../../providers/session/Session";
import { useState, useEffect } from "react";

function ProjectEmail({ projectid }) {
  const { projects, setProjects } = useSession();
  const [currentProject, setCurrentProject] = useState(null);
  const { setStatus } = useStatus();

  useEffect(() => {
    setCurrentProject(projects.find((f) => f["_id"] === projectid));
  }, []);

  const handleSubjectChange = (e) => {
    setCurrentProject({ ...currentProject, emailSubject: e.target.value });
  };

  if (!currentProject) return <div></div>

  return (
    <div className="project-email-container">
      <div className="project-email-left">
        <Input
          type="text"
          value={currentProject.emailSubject}
          onChange={handleSubjectChange}
          placeholder="Subject"
          className="project-email-subject-input"
        />
        <div className="project-email-body-container"></div>
      </div>
      <div className="project-email-sidebar">
        {currentProject && (
          <>
            <h3 className="project-name">{currentProject.name}</h3>
            {currentProject.csv && (
              <div>
                <h4 className="project-subsection-heading">Variables</h4>
                {currentProject.csv[0].map((v, i) => {
                  return (
                    <div key={i} className="project-email-variable">
                      ${v}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectEmail;
