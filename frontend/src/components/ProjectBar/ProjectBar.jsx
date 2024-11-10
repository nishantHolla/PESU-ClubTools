import Icon from "../Icon/Icon";
import { useNavigate } from "react-router-dom";
import "./project_bar_style.css";

function ProjectItem({ iconName, name, id, onClick, current }) {
  return (
    <div
      className={`project-item ${id === current && "project-item-active"}`}
      onClick={onClick}
    >
      <Icon type={iconName} />
      <h3 className="project-item-name">{name}</h3>
    </div>
  );
}

function ProjectBar({ projectid, userid, current }) {
  const navigate = useNavigate()
  const moveTo = (dest) => {
    return navigate(`/u/${userid}/p/${projectid}/${dest}`)
  }

  return (
    <div className="project-bar">
      <ProjectItem
        iconName="eva:brush"
        id="template"
        name="Template"
        current={current}
        onClick={()=>{moveTo("template")}}
      />
      <ProjectItem
        iconName="eva:mail"
        id="email"
        name="Email"
        current={current}
        onClick={()=>{moveTo("email")}}
      />
      <ProjectItem
        iconName="eva:cube"
        id="status"
        name="Status"
        current={current}
        onClick={()=>{moveTo("status")}}
      />
      <ProjectItem
        iconName="eva:gear"
        id="settings"
        name="Settings"
        current={current}
        onClick={()=>{moveTo("settings")}}
      />
    </div>
  );
}

export default ProjectBar;
