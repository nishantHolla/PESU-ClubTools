import { inferImage } from "../../lib/util";
import Icon from "../Icon/Icon";
import { useStatus } from "../../providers/status/Status";
import axios from "axios";
import { BACKEND_URL } from "../../lib/constants";
import { useState, useEffect } from "react";
import { useSession } from "../../providers/session/Session";
import { FileUploader } from "react-drag-drop-files";

const FILE_TYPES = ["JPG", "PNG"];

function TemplateImage({ projectid }) {
  const { projects, setProjects } = useSession();
  const [currentProject, setCurrentProject] = useState(null);
  const { setStatus } = useStatus();
  const [file, setFile] = useState();

  useEffect(() => {
    setCurrentProject(projects.find((f) => f["_id"] === projectid));
  }, []);

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
    } catch (e) {
      setStatus("error", "Failed to upload image");
    }
  };

  if (!currentProject) return <></>;

  return currentProject.image ? (
    <div className="template-image-container">
      <img
        src={inferImage(currentProject)}
        alt="something went wrong"
        width="90%"
      />
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
