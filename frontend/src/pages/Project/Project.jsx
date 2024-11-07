import { useState } from "react";
import "./project_style.css";
import ProjectBar from "../../components/ProjectBar/ProjectBar";

function Project() {
  const [current, setCurrent] = useState("template");
  return (
    <div className="project-container">
      <ProjectBar current={current} setCurrent={setCurrent} />
    </div>
  );
}

export default Project;
