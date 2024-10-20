import "./template_style.css";
import { base64ToFile } from "../../lib/utils";
import { IMAGE_FILE_TYPES, DATA_FILE_TYPES } from "../../lib/constants";
import { useSession } from "../../providers/session/Session";
import { useState, useRef, useEffect } from "react";
import { useStatus } from "../../providers/status/Status";
import { updateProject as dbUpdateProject, uploadImage } from "../../lib/db";
import Papa from "papaparse";

import Editable from "../Editable/Editable";
import Button from "../Button/Button";
import File from "../File/File";

function Template({ projectid }) {
  const imageRef = useRef(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const { setStatus } = useStatus();
  const { userData, updateProject } = useSession();
  const [project, setProject] = useState(
    userData.projects.find((i) => i.projectid === projectid),
  );

  useEffect(() => {
    if (project && project.image) {
      imageRef.current.src = URL.createObjectURL(base64ToFile(project.image));
    }
    console.log(project)
  }, []);

  const handleUpdateName = (e) => {
    setProject({ ...project, name: e.target.value });
  };

  const handleTemplateUpload = (file) => {
    setProject({ ...project, image: file });
    imageRef.current.src = URL.createObjectURL(file);
    setImageUploaded(true);
  };

  const handleDataUpload = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        const csvString = result.data
          .slice(0, -1)
          .map((row) => row.join(","))
          .join("\n");
        setProject({ ...project, csv: csvString });
      },
      header: false,
    });
  };

  const handleSave = () => {
    updateProject(project);
    dbUpdateProject(
      project,
      () => {
        if (imageUploaded)
          uploadImage(project.projectid, project.image, () => {
            setStatus("success", "Project saved!", 3000);
          });
        else setStatus("success", "Project saved!", 3000);
      },
      () => {
        setStatus("error", "Something went wrong. Try again later");
      },
    );
  };

  return (
    <div className="template-container">
      <div className="template-container-left">
        <img ref={imageRef} className="template-image" />
      </div>
      <div className="template-container-right">
        <div className="template-sidebar">
          <div className="template-project-name">
            <Editable value={project.name} onChange={handleUpdateName} />
          </div>
          <div className="template-panel">
            <div className="template-panel-section">
              <h3 className="template-panel-heading">Upload template</h3>
              <File
                value={project.image}
                types={IMAGE_FILE_TYPES}
                handleChange={handleTemplateUpload}
                maxSize={2}
                onTypeError={() => {
                  setStatus(
                    "error",
                    `Supported files types are ${IMAGE_FILE_TYPES.join(", ")}`,
                    3000,
                  );
                }}
                onSizeError={() => {
                  setStatus(
                    "error",
                    "File size must be smaller than 2MB.",
                    3000,
                  );
                }}
              />
            </div>
            <div className="template-panel-section">
              <h3 className="template-panel-heading">Upload data</h3>
              <File
                value={project.csv}
                types={DATA_FILE_TYPES}
                handleChange={handleDataUpload}
                maxSize={2}
                onTypeError={() => {
                  setStatus(
                    "error",
                    `Supported files types are ${DATA_FILE_TYPES.join(", ")}`,
                    3000,
                  );
                }}
                onSizeError={() => {
                  setStatus(
                    "error",
                    "File size must be smaller than 2MB.",
                    3000,
                  );
                }}
              />
            </div>
          </div>
          <Button className="template-save" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Template;
