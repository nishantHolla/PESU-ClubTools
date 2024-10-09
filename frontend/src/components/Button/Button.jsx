import "./button_style.css";

function Button(props) {
  return (
    <div className="button-component">
      <button {...props} />
    </div>
  );
}

export default Button;
