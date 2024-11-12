import { useEffect, useState } from "react";
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import { useSession } from "../../providers/session/Session";

function Field({ i, currentProject, setCurrentProject }) {
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
  const [size, setSize] = useState(40);
  const [color, setColor] = useState("#000000");

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

  return (
    <div className="project-field">
      <div className="project-field-number">{i}</div>
      <div className="project-field-properties">
        <Dropdown
          options={options}
          value={current}
          onChange={handleFieldChange}
          isDisabled={
            projects.find((p) => p["_id"] === currentProject["_id"]).coords
              .length > 0
          }
        />
        <Input
          type="number"
          value={size}
          onChange={handleSizeChange}
          disabled={
            projects.find((p) => p["_id"] === currentProject["_id"]).coords
              .length > 0
          }
        />
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
    </div>
  );
}

export default Field;
