import { useEffect, useState } from "react";
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import Icon from "../Icon/Icon";
import { useSession } from "../../providers/session/Session";

function Field({ i, projectid, currentProject, setCurrentProject }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { projects } = useSession();
  const [options, setOptions] = useState(
    currentProject.csv[0].map((o) => {
      return { label: o, value: o };
    }),
  );
  const [current, setCurrent] = useState(
    options.find((f) => f.value === currentProject.coords[i].field) ||
      options[0],
  );
  const [size, setSize] = useState(currentProject.coords[i].size || 40);
  const [color, setColor] = useState(currentProject.coords[i].color || "#000000");

  useEffect(() => {
    setCurrentProject({
      ...currentProject,
      coords: currentProject.coords.map((c, idx) => {
        if (idx !== i) return c;
        return { ...c, field: current.value, size, color };
      }),
    });
  }, [current, size, color]);

  const handleFieldChange = (selectedOption) => {
    setCurrent(selectedOption);
  };

  const handleSizeChange = (e) => {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue)) {
      return;
    }
    setSize(newValue);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleRemoveField = (i) => {
    const newCoords = currentProject.coords.filter((_, idx) => idx !== i);
    setCurrentProject({ ...currentProject, coords: newCoords });
  };

  return (
    <div className="project-field">
      <div className="project-field-header">
        <div
          className="project-field-expand-collapse"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <Icon type={isExpanded ? "eva:collapse" : "eva:expand"} />
        </div>
        <div className="project-field-number">{i + 1}</div>
        {projects.find((p) => p["_id"] === projectid)?.coords.length === 0 && (
          <div
            className="project-field-remove"
            onClick={() => {
              if (projects.find((p) => p["_id"] === projectid).qr) return;
              handleRemoveField(i);
            }}
          >
            <Icon type="eva:trash" />
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="project-field-properties">
          <p className="project-field-label">Field column</p>
          <Dropdown
            options={options}
            value={current}
            onChange={handleFieldChange}
            isDisabled={
              projects.find((p) => p["_id"] === currentProject["_id"]).coords
                .length > 0
            }
          />
          <p className="project-field-label">Font size</p>
          <Input
            type="number"
            value={size}
            onChange={handleSizeChange}
            disabled={
              projects.find((p) => p["_id"] === currentProject["_id"]).coords
                .length > 0
            }
          />
          <p className="project-field-label">Text color</p>
          <Input
            type="color"
            value={color}
            onChange={handleColorChange}
            disabled={
              projects.find((p) => p["_id"] === currentProject["_id"]).coords
                .length > 0
            }
          />
        </div>
      )}
    </div>
  );
}

export default Field;
