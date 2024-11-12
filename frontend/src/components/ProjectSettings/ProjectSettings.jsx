import axios from "axios";
import { BACKEND_URL } from "../../lib/constants";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./project_settings_style.css";
import { useSession } from "../../providers/session/Session";
import { useStatus } from "../../providers/status/Status";
import { useEffect, useState } from "react";
import { useModal } from "../../providers/modal/Modal";
import { useNavigate } from "react-router-dom";

function ProjectSettings({ projectid, currentProject, setCurrentProject }) {
  const navigate = useNavigate();
  const { setStatus } = useStatus();
  const { projects, setProjects } = useSession();
  const [isValidRename, setIsValidRename] = useState(false);
  const { setModal } = useModal();
  const [rename, setRename] = useState("");

  useEffect(() => {
    if (!currentProject) return;
    setIsValidRename(!(rename.length === 0 || rename === currentProject.name));
  }, [rename, currentProject]);

  useEffect(() => {
    if (currentProject && !rename) {
      setRename(currentProject.name);
    }
  }, [currentProject]);

  const handleRename = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/project/${projectid}`, {
        name: rename,
      });
      setProjects((o) =>
        o.map((p) => {
          if (p["_id"] !== projectid) return p;
          return { ...p, name: rename };
        }),
      );

      setCurrentProject({ ...currentProject, name: rename });
      setStatus("success", "Renamed project!", 3000);
    } catch (e) {
      setStatus("error", "Failed to upload changes");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/project/${projectid}`);
      setProjects((o) => o.filter((p) => p["_id"] !== projectid));
      setCurrentProject(null);
      setModal(null);
      navigate("/u");
    } catch (e) {
      setStatus("error", "Failed to upload changes");
    }
  };

  const handleDelete = () => {
    setModal(
      <div className="delete-project-modal">
        <h3 className="delete-project-heading">Delete Project</h3>
        <p className="delete-project-instruction">
          Are you sure you want to delete this project? This action can not be
          reverted.
        </p>
        <div className="delete-project-actions">
          <Button
            className="button-danger delete-project-confirm"
            onClick={confirmDelete}
          >
            Continue
          </Button>
          <Button
            className="delete-project-cancel"
            onClick={() => {
              setModal(null);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>,
    );
  };

  if (!currentProject) return <div></div>;

  return (
    <div className="project-settings-container">
      <div className="project-settings-section">
        <h3 className="project-settings-heading">Actions</h3>
        <div className="project-settings-name-container">
          <p className="project-settings-label">Project Name</p>
          <Input
            type="text"
            placeholder="Project name..."
            className="project-rename-input"
            value={rename}
            onChange={(e) => {
              setRename(e.target.value);
            }}
          />
          <Button
            className="project-rename-button"
            disabled={!isValidRename}
            onClick={handleRename}
          >
            Rename
          </Button>
        </div>
        <div className="project-settings-delete-container">
          <Button
            className="project-delete-button button-danger"
            onClick={handleDelete}
          >
            Delete project
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectSettings;
