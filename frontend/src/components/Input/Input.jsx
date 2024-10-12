import Icon from "../Icon/Icon";
import "./input_style.css";

function Input({ children, icon, className, ...props }) {
  if (!className) className = "";
  return (
    <div className={`input-component ${className}`}>
      {icon && <Icon type={icon} />}
      {children}
      <input {...props} />
    </div>
  );
}

export default Input;
