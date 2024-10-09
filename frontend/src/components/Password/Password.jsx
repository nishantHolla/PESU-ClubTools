import Icon from "../Icon/Icon";
import "./password_style.css";
import { useState } from "react";

function Password({ children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="password-component">
      <Icon type="password" />
      {children}
      <input
        {...props}
        type={isOpen ? "text" : "password"}
        placeholder="Password"
      />
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Icon type={isOpen ? "eye-opened" : "eye-closed"} />
      </div>
    </div>
  );
}

export default Password;
