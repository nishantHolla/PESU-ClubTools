import "./project_template_style.css";
import Button from "../Button/Button";
import axios from "axios";
import { BACKEND_URL } from "../../lib/constants";
import TemplateImage from "./TemplateImage";
import CsvData from "./CsvData";
import { useStatus } from "../../providers/status/Status";
import { useSession } from "../../providers/session/Session";
import { useState, useEffect } from "react";
import Field from "./Field";

function ProjectTemplate({ projectid, currentProject, setCurrentProject }) {
  const { projects, setProjects } = useSession();
  const { setStatus } = useStatus();
  const defaultQR = { x: 0, y: 0, size: 100 };

  const saveFields = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/project/${projectid}`, {
        coords: currentProject.coords,
        qr: currentProject.qr,
      });

      setProjects((o) =>
        o.map((p) => {
          if (p["_id"] !== projectid) return p;
          return { ...p, coords: currentProject.coords, qr: currentProject.qr };
        }),
      );

      setStatus("success", "Uploaded changes!", 3000);
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
              <div className="project-field-container">
                <h4 className="project-subsection-heading">Fields</h4>
                <p>Click on the image to add fields</p>
                <div className="project-field-list">
                  {currentProject.coords.map((_, i) => (
                    <Field
                      i={i}
                      key={i}
                      currentProject={currentProject}
                      setCurrentProject={setCurrentProject}
                    />
                  ))}
                  <div className="project-qr-input">
                    <input
                      type="checkbox"
                      checked={currentProject.qr ? true : false}
                      disabled={
                        projects.find((p) => p["_id"] === currentProject["_id"])
                          .qr
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        setCurrentProject({
                          ...currentProject,
                          qr: e.target.checked ? defaultQR : null,
                        });
                      }}
                    />
                    <p>Add Verification QR code</p>
                  </div>
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
