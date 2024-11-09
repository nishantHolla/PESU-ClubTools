import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./project_style.css";
import ProjectBar from "../../components/ProjectBar/ProjectBar";
import ProjectTemplate from "../../components/ProjectTemplate/ProjectTemplate";
import ProjectEmail from "../../components/ProjectEmail/ProjectEmail";

function Project() {
  const params = useParams();

  return (
    <div className="project-container">
      <ProjectBar projectid={params.projectid} userid={params.userid} current={params.state || "template"}/>
      {params.state === "template" && (
        <ProjectTemplate projectid={params.projectid} />
      )}
      {params.state === "email" && <ProjectEmail projectid={params.projectid} />}
    </div>
  );
}

export default Project;
