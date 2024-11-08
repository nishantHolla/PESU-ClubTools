import { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";

function Field({ i, currentProject, setCurrentProject }) {
  const [options, setOptions] = useState(
    currentProject.csv[0].map((o) => {
      return { label: o, value: o };
    }),
  );
  const [current, setCurrent] = useState(
    options.find((f) => f.value === currentProject.coords[i].field) ||
      options[0],
  );

  const handleChange = (selectedOption) => {
    setCurrent(selectedOption);
    setCurrentProject({
      ...currentProject,
      coords: currentProject.coords.map((c, idx) => {
        if (idx !== i) return c;
        return { ...c, field: selectedOption.value };
      }),
    });
  };

  return (
    <div className="project-field">
      <div className="project-field-number">{i}</div>
      <Dropdown options={options} value={current} onChange={handleChange} />
    </div>
  );
}

export default Field;
