import Icon from "../Icon/Icon";
import "./project_bar_style.css";

function ProjectItem({ iconName, name, id, current, setCurrent }) {
  return (
    <div
      className={`project-item ${id === current && "project-item-active"}`}
      onClick={() => {
        setCurrent(id);
      }}
    >
      <Icon type={iconName} />
      <h3 className="project-item-name">{name}</h3>
    </div>
  );
}

function ProjectBar({ current, setCurrent }) {
  return (
    <div className="project-bar">
      <ProjectItem
        iconName="eva:brush"
        id="template"
        current={current}
        setCurrent={setCurrent}
        name="Template"
      />
      <ProjectItem
        iconName="eva:mail"
        id="email"
        current={current}
        setCurrent={setCurrent}
        name="Email"
      />
      <ProjectItem
        iconName="eva:cube"
        id="status"
        current={current}
        setCurrent={setCurrent}
        name="Status"
      />
      <ProjectItem
        iconName="eva:gear"
        id="settings"
        current={current}
        setCurrent={setCurrent}
        name="Settings"
      />
    </div>
  );
}

export default ProjectBar;
