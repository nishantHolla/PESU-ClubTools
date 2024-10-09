import "./button_style.css";

function Button({ color, ...props }) {
  if (!color) color = "var(--theme-0)";

  return (
    <div
      className="button-component"
      style={{
        background: color,
      }}
    >
      <button {...props} />
    </div>
  );
}

export default Button;
