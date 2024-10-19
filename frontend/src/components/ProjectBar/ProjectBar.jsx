import Icon from "../Icon/Icon";
import "./projectbar_style.css";

function ProjectItem({ current, setCurrent, name, id, icon }) {
  return (
    <div
      className={`projectbar-item ${current === id && "projectbar-selected"}`}
      onClick={() => {
        setCurrent(id);
      }}
    >
      <Icon type={icon} />
      <span className="projectbar-title">{name}</span>
    </div>
  );
}

function ProjectBar({ current, setCurrent }) {
  return (
    <div className="projectbar-container">
      <ProjectItem
        current={current}
        setCurrent={setCurrent}
        name="Template"
        id="template"
        icon="eva:brush"
      />
      <ProjectItem
        current={current}
        setCurrent={setCurrent}
        name="Mail"
        id="mail"
        icon="eva:mail"
      />
      <ProjectItem
        current={current}
        setCurrent={setCurrent}
        name="Status"
        id="status"
        icon="eva:cube"
      />
      <ProjectItem
        current={current}
        setCurrent={setCurrent}
        name="Settings"
        id="settings"
        icon="eva:settings"
      />
    </div>
  );
}

export default ProjectBar;
