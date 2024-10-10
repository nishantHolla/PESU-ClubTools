import Icon from "../Icon/Icon";
import "./password_style.css";
import { useState } from "react";

function Password({ children, placeholder, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="password-component">
      <Icon type="mdi:lock" />
      {children}
      <input
        {...props}
        type={isOpen ? "text" : "password"}
        placeholder={placeholder || "Password"}
      />
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Icon type={isOpen ? "mdi:eye" : "mdi:eye-off"} />
      </div>
    </div>
  );
}

export default Password;
