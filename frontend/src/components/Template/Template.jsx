import "./template_style.css";
import { useSession } from "../../providers/session/Session";
import { useEffect, useState } from "react";
import { useStatus } from "../../providers/status/Status";
import Editable from "../Editable/Editable";
import Button from "../Button/Button";
import { updateProject as dbUpdateProject } from "../../lib/db";

function Template({ projectid }) {
  const { setStatus } = useStatus();
  const { userData, updateProject } = useSession();
  const [project, setProject] = useState(
    userData.projects.find((i) => i.projectid === projectid),
  );

  const handleUpdateName = (e) => {
    setProject({ ...project, name: e.target.value });
  };

  const handleSave = () => {
    updateProject(project);
    dbUpdateProject(
      project,
      () => {
        setStatus("success", "Project saved!", 3000);
      },
      () => {
        setStatus("error", "Something went wrong. Try again later");
      },
    );
  };

  return (
    <div className="template-container">
      <div className="template-container-left"></div>
      <div className="template-container-right">
        <div className="template-sidebar">
          <Editable value={project.name} onChange={handleUpdateName} />
          <div className="template-panel"></div>
          <Button className="template-save" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Template;
