import "./file_style.css";
import { FileUploader } from "react-drag-drop-files";

function File({ value, ...props }) {
  return (
    <div className="file-component" data-isaccepted={value ? "1" : "0"}>
      {value ? (
        <div>File uploaded.</div>
      ) : (
        <FileUploader {...props} classes="drop-zone">
          Click here or drag the file here to upload
        </FileUploader>
      )}
    </div>
  );
}

export default File;
