import "./button_style.css";

function Button({ ...props }) {
  return (
    <button {...props} className={`button-component ${props.className}`} />
  );
}

export default Button;
