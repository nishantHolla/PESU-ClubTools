import Icon from "../Icon/Icon";
import "./textarea_style.css";

function Textarea({ children, icon, className, ...props }) {
  if (!className) className = "";
  return (
    <div className={`textarea-component ${className}`}>
      {icon && <Icon type={icon} />}
      {children}
      <textarea {...props} />
    </div>
  );
}

export default Textarea;
