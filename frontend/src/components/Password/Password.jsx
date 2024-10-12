import Icon from "../Icon/Icon";
import "./password_style.css";
import { useState } from "react";

function Password({ children, className, placeholder, icon, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  if (!className) className = "";

  return (
    <div className={`password-component input-component ${className}`}>
      <Icon type={icon || "eva:lock"} />
      {children}
      <input
        {...props}
        type={isOpen ? "text" : "password"}
        placeholder={placeholder || "Password"}
      />
      <div
        className="eye-container"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Icon type={isOpen ? "eva:eye" : "eva:eye-off"} />
      </div>
    </div>
  );
}

export default Password;
