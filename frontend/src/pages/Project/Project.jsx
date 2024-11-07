import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./project_style.css";
import ProjectBar from "../../components/ProjectBar/ProjectBar";
import ProjectTemplate from "../../components/ProjectTemplate/ProjectTemplate";

function Project() {
  const params = useParams();
  const [current, setCurrent] = useState("template");

  return (
    <div className="project-container">
      <ProjectBar current={current} setCurrent={setCurrent} />
      {current === "template" && <ProjectTemplate projectid={params.projectid}/>}
    </div>
  );
}

export default Project;
