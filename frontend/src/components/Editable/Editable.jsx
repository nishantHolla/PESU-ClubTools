import "./editable_style.css";
import Icon from "../Icon/Icon";
import { useEffect, useRef, useState } from "react";

function Editable({ value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="editable-component">
      <input
        value={value}
        onChange={onChange}
        data-ison={isEditing ? "1" : "0"}
        ref={inputRef}
        onBlur={() => {
          setIsEditing(false);
        }}
      />
      <div
        data-ison={isEditing ? "1" : "0"}
        className="editable-label"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        {value}
        <Icon type="eva:edit" className="editable-symbol" />
      </div>
    </div>
  );
}

export default Editable;
