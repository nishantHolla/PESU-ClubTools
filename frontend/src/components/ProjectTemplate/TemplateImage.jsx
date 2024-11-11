import { inferImage } from "../../lib/util";
import QR from "./QR";
import Icon from "../Icon/Icon";
import { useStatus } from "../../providers/status/Status";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../lib/constants";
import { useSession } from "../../providers/session/Session";
import { FileUploader } from "react-drag-drop-files";

const FILE_TYPES = ["JPG", "PNG"];

function Coord({ i, c }) {
  return (
    <div
      className="project-coord unselectable"
      style={{
        top: `${c.y}%`,
        left: `${c.x}%`,
      }}
    >
      {i}
    </div>
  );
}

function TemplateImage({ projectid, currentProject, setCurrentProject }) {
  const qr_parent = useRef(null);
  const { projects, setProjects } = useSession();
  const { setStatus } = useStatus();

  const handleFieldAddition = (e) => {
    const p = projects.find((f) => f["_id"] === projectid);
    if (!p || !p.csv || p.coords.length > 0) return;
    const rect = e.target.getBoundingClientRect();
    const l = ((e.clientX - rect.left) / rect.width) * 100;
    const t = ((e.clientY - rect.top) / rect.height) * 100;

    setCurrentProject({
      ...currentProject,
      coords: [
        ...currentProject.coords,
        {
          x: l,
          y: t,
          field: currentProject.csv[0][0],
        },
      ],
    });
  };

  const handleChange = async (file) => {
    setProjects((old) => {
      return old.map((p) => {
        if (p["_id"] !== projectid) return p;
        return { ...p, image: file, contentType: file.type };
      });
    });
    setCurrentProject({
      ...currentProject,
      image: file,
      contentType: file.type,
    });

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/template/${projectid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setStatus("success", "Uploaded image!", 3000);
    } catch (e) {
      setStatus("error", "Failed to upload image");
    }
  };

  if (!currentProject) return <div></div>;

  return currentProject.image ? (
    <div className="template-image-container">
      <div className="template-image-ref" ref={qr_parent}>
        {currentProject.qr && (
          <QR
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            parent={qr_parent}
          />
        )}
        <img
          className="template-image unselectable"
          src={inferImage(currentProject)}
          alt="something went wrong"
          width="100%"
          onClick={handleFieldAddition}
        />
        {currentProject.coords.map((c, i) => (
          <Coord key={i} i={i} c={c} />
        ))}
      </div>
    </div>
  ) : (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={FILE_TYPES}
      classes="template-image-drop"
    >
      <div className="template-image-instruction">
        <Icon type="eva:plus" />
        <div>Click here to upload your template image</div>
      </div>
    </FileUploader>
  );
}

export default TemplateImage;
