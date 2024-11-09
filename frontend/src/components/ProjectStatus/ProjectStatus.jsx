import "./project_status_style.css";
import { BACKEND_URL } from "../../lib/constants";
import Button from "../Button/Button";
import axios from "axios";
import { useStatus } from "../../providers/status/Status";

function ProjectStatus({ projectid, currentProject, setCurrentProject }) {
  const { setStatus } = useStatus();
  const handleSend = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/send/${projectid}`);
    } catch (e) {
      setStatus("error", "Failed to send certificates");
    }
  };
  return (
    <div className="project-status-container">
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
}

export default ProjectStatus;
