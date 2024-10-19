import "./projectTile_style.css";
import ImageFrame from "../ImageFrame/ImageFrame";
import {useSession} from "../../providers/session/Session"
import { useNavigate } from "react-router-dom";

function ProjectTile({ project }) {
  const navigate = useNavigate();
  const {user} = useSession();

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    const time = date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${time}`;
  };

  return (
    <div className="projecttile-component" onClick={() => {
      navigate(`/u/${user.uid}/p/${project.projectid}`)
    }}>
      <ImageFrame alt="project">No image added</ImageFrame>
      <div className="project-details">
        <h3 className="project-name">{project.name}</h3>
        <p className="project-ceration">
          Created on {getDate(project.createAt)}
        </p>
      </div>
    </div>
  );
}

export default ProjectTile;
