import "./project_status_style.css";
import { BACKEND_URL } from "../../lib/constants";
import Button from "../Button/Button";
import StatusVisualizer from "./StatusVisualizer";
import axios from "axios";
import { useSession } from "../../providers/session/Session";
import { useStatus } from "../../providers/status/Status";
import { useEffect, useState } from "react";

function ProjectStatus({ projectid, currentProject, setCurrentProject }) {
  const { setStatus } = useStatus();
  const { projects } = useSession();
  const [projectStatus, setProjectStatus] = useState([]);

  const updateStatus = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/status/${projectid}`,
      );
      setProjectStatus(response.data.result);
    } catch (e) {
      setStatus("error", "Failed to fetch project status");
    }
  };

  const formatStatus = (projectStatus) => {
    const result = projectStatus.map((p) => [p.name, p.email, p["_id"], p.status]);
    result.unshift(["Name", "Email", "Certificate ID", "Status"]);
    return result;
  };

  const handleSend = async () => {
    const project = projects.find((f) => f["_id"] === projectid);

    if (!project) {
      setStatus("error", "Failed to identify current project");
      return;
    }

    if (!project.csv) {
      setStatus(
        "warning",
        "Please upload participant details before sending emails",
        5000,
      );
      return;
    }

    if (!project.emailSubject || !project.emailBody) {
      setStatus(
        "warning",
        "Please upload email subject and body before sending emails",
        5000,
      );
      return;
    }

    if (!project.image) {
      setStatus(
        "warning",
        "Please upload template image before sending emails",
        5000,
      );
      return;
    }

    if (project.coords.length === 0) {
      setStatus(
        "warning",
        "Please add at least one filed to template image before sending emails",
        5000,
      );
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/v1/send/${projectid}`);
      setStatus("success", "Emails queued for sending!", 3000);
      updateStatus();
    } catch (e) {
      setStatus("error", "Failed to send certificates");
    }
  };

  useEffect(() => {
    updateStatus();

    const polling = setInterval(updateStatus, 5000);

    return () => {
      clearInterval(polling);
    };
  }, []);

  useEffect(() => {
    console.log(projectStatus);
  }, [projectStatus]);

  return (
    <div className="project-status-container">
      <Button onClick={handleSend} className="project-status-send-button">
        Send Email
      </Button>
      <StatusVisualizer data={formatStatus(projectStatus)} />
      {projectStatus.length === 0 && (
        <div className="project-status-instruction">
          Send emails to see their status
        </div>
      )}
    </div>
  );
}

export default ProjectStatus;
