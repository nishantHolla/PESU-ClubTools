import Icon from "../Icon/Icon";
import "./input_style.css";

function Input({ children, icon, ...props }) {
  return (
    <div className="input-component">
      {icon && <Icon type={icon} />}
      {children}
      <input {...props} />
    </div>
  );
}

export default Input;
