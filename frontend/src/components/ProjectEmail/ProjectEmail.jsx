import "./project_email_style.css";
import axios from "axios";
import { BACKEND_URL } from "../../lib/constants";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useStatus } from "../../providers/status/Status";
import { useSession } from "../../providers/session/Session";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

function ProjectEmail({ projectid, currentProject, setCurrentProject }) {
  const { projects, setProjects } = useSession();
  const { setStatus } = useStatus();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "font",
    "script",
    "align",
    "color",
    "background"
  ];

  const handleSubjectChange = (e) => {
    setCurrentProject({ ...currentProject, emailSubject: e.target.value });
  };

  const handleBodyChange = (e) => {
    setCurrentProject({ ...currentProject, emailBody: e });
  };

  const handleEmailSave = async () => {
    setProjects((o) =>
      o.map((p) => {
        if (p["_id"] !== projectid) return p;
        return {
          ...p,
          emailBody: currentProject.emailBody,
          emailSubject: currentProject.emailSubject,
        };
      }),
    );

    try {
      await axios.post(`${BACKEND_URL}/api/v1/project/${projectid}`, {
        emailBody: currentProject.emailBody,
        emailSubject: currentProject.emailSubject,
      });
    } catch (e) {
      setStatus("error", "Failed to upload changes");
    }
  };

  if (!currentProject) return <div></div>;

  return (
    <div className="project-email-container">
      <div className="project-email-left">
        <Input
          type="text"
          value={currentProject.emailSubject}
          onChange={handleSubjectChange}
          placeholder="Subject"
          className="project-email-subject-input"
        />
        <div className="project-email-body-container">
          <ReactQuill
            theme="snow"
            value={currentProject.emailBody}
            onChange={handleBodyChange}
            modules={modules}
            formats={formats}
            placeholder="Click here to add mail body..."
          />
        </div>
      </div>
      <div className="project-email-sidebar">
        {currentProject && (
          <>
            <h3 className="project-name">{currentProject.name}</h3>
            {currentProject.csv && (
              <>
                <div className="project-email-variable-section">
                  <h4 className="project-subsection-heading">Variables</h4>
                  {currentProject.csv[0].map((v, i) => {
                    return (
                      <div key={i} className="project-email-variable">
                        ${v}
                      </div>
                    );
                  })}
                </div>
                {projects.find((f) => f["_id"] === projectid).emailBody
                  .length === 0 &&
                  projects.find((f) => f["_id"] === projectid).emailSubject
                    .length === 0 &&
                  currentProject.emailBody.length !== 0 &&
                  currentProject.emailSubject.length !== 0 && (
                    <Button
                      className="project-save-email"
                      onClick={handleEmailSave}
                    >
                      Save Email
                    </Button>
                  )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectEmail;
