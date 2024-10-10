import "./box_style.css";

function Box({ color, children, ...props }) {
  return (
    <div
      className="box-component"
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
