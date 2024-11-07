import { useNavigate } from "react-router-dom";
import { useSession } from "../../providers/session/Session";
import ImageFrame from "../ImageFrame/ImageFrame";
import {inferImage} from "../../lib/util"
import "./project_frame_style.css";

function ProjectFrame({ project }) {
  const navigate = useNavigate();
  const { user } = useSession();
  return (
    <div
      className="project-frame"
      onClick={() => {
        navigate(`/u/${user.uid}/p/${project["_id"]}`);
      }}
    >
      <ImageFrame src={inferImage(project)}/>
      <div className="project-frame-info">
        <h3 className="project-frame-title">{project.name}</h3>
        <p className="project-frame-date">
          {new Date(project.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default ProjectFrame;
