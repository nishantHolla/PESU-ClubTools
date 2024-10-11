import "./button_style.css";

function Button({ className, ...props }) {
  if (!className) className = ''

  return (
    <button {...props} className={`button-component ${className}`} />
  );
}

export default Button;
