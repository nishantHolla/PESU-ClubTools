import "./project_template_style.css";
import Button from "../Button/Button";
import axios from "axios";
import { BACKEND_URL } from "../../lib/constants";
import TemplateImage from "./TemplateImage";
import CsvData from "./CsvData";
import { useStatus } from "../../providers/status/Status";
import { useSession } from "../../providers/session/Session";
import { useEffect, useState } from "react";
import Field from "./Field";

function ProjectTemplate({ projectid }) {
  const { projects, setProjects } = useSession();
  const [currentProject, setCurrentProject] = useState(null);
  const { setStatus } = useStatus();

  useEffect(() => {
    setCurrentProject(projects.find((f) => f["_id"] === projectid));
  }, []);

  const saveFields = async () => {
    setProjects((o) =>
      o.map((p) => {
        if (p["_id"] !== projectid) return p;
        return { ...p, coords: currentProject.coords };
      }),
    );

    try {
      await axios.post(`${BACKEND_URL}/api/v1/project/${projectid}`, {
        coords: currentProject.coords,
      });
    } catch (e) {
      setStatus("error", "Failed to upload changes");
    }
  };

  return (
    <div className="project-template-container">
        <TemplateImage
          projectid={projectid}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
        />
      <div className="project-template-sidebar">
        {currentProject && (
          <>
            <h3 className="project-name">{currentProject.name}</h3>
            <div>
              <h4 className="project-subsection-heading">Participant Data</h4>
              {currentProject.image && (
                <CsvData
                  projectid={projectid}
                  currentProject={currentProject}
                  setCurrentProject={setCurrentProject}
                />
              )}
            </div>
            {currentProject.csv && (
              <div>
                <h4 className="project-subsection-heading">Fields</h4>
                <p>Click on the image to add fields</p>
                <div className="project-field-container">
                  {currentProject.coords.map((_, i) => (
                    <Field
                      i={i}
                      key={i}
                      currentProject={currentProject}
                      setCurrentProject={setCurrentProject}
                    />
                  ))}
                </div>
                {projects.find((f) => f["_id"] === projectid)?.coords.length ===
                  0 &&
                  currentProject.coords.length > 0 && (
                    <Button
                      className="project-save-fields"
                      onClick={saveFields}
                    >
                      Save fields
                    </Button>
                  )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectTemplate;
