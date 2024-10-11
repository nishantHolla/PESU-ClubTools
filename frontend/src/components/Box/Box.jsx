import "./box_style.css";

function Box({ color, children, className, ...props }) {
  if (!className) className = "";

  return (
    <div
      className={`box-component ${className}`}
      style={{
        background: color ? color : "rgba(255, 255, 255, 0.1)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Box;
