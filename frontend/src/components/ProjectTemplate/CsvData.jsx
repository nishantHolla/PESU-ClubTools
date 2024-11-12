import axios from "axios";
import { BACKEND_URL } from "../../lib/constants";
import Papa from "papaparse";
import Icon from "../Icon/Icon";
import { useStatus } from "../../providers/status/Status";
import { FileUploader } from "react-drag-drop-files";
import { useSession } from "../../providers/session/Session";
import CsvVisalizer from "./CsvVisualizer";

const FILE_TYPES = ["CSV"];

function CsvData({ projectid, currentProject, setCurrentProject }) {
  const { setProjects } = useSession();
  const { setStatus } = useStatus();

  const handleChange = (file) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: async (result) => {
        if (!result.data[0].includes("email")) {
          setStatus(
            "error",
            "Your CSV file must have a column named 'email'",
            5000,
          );
        } else {
          try {
            await axios.post(`${BACKEND_URL}/api/v1/project/${projectid}`, {
              csv: result.data,
            });

            setProjects((old) => {
              return old.map((p) => {
                if (p["_id"] !== projectid) return p;
                return { ...p, csv: result.data };
              });
            });

            setCurrentProject({ ...currentProject, csv: result.data });

            setStatus("success", "Uploaded data!", 3000)
          } catch (e) {
            setStatus("error", "Failed to upload data");
          }
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
