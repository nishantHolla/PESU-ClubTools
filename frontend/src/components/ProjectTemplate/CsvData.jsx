import { useState, useEffect } from "react";
import Papa from "papaparse";
import Icon from "../Icon/Icon";
import { useStatus } from "../../providers/status/Status";
import { FileUploader } from "react-drag-drop-files";
import { useSession } from "../../providers/session/Session";
import CsvVisalizer from "./CsvVisualizer";

const FILE_TYPES = ["CSV"];

function CsvData({ projectid }) {
  const { projects, setProjects } = useSession();
  const [currentProject, setCurrentProject] = useState(null);
  const { setStatus } = useStatus();

  useEffect(() => {
    setCurrentProject(projects.find((f) => f["_id"] === projectid));
  }, []);

  const handleChange = (file) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        if (!result.data[0].includes("email")) {
          setStatus(
            "error",
            "Your CSV file must have a column named 'email'",
            5000,
          );
        } else {
          setCurrentProject({ ...currentProject, csv: result.data });
        }
      },
      error: (error) => {
        setStatus("error", "Parsing CSV file failed", 5000);
        console.log("Error: ", error);
      },
    });
  };

  return currentProject?.csv ? (
    <CsvVisalizer data={currentProject.csv} />
  ) : (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={FILE_TYPES}
      classes="csv-drop"
    >
      <div>
        <Icon type="eva:plus" />
        <div className="csv-instruction">
          Click here to upload your CSV data
        </div>
      </div>
    </FileUploader>
  );
}

export default CsvData;
