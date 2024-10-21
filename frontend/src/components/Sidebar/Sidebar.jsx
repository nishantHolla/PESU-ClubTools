import "./sidebar_style.css";

function Sidebar({ color, children, className, ...props }) {
  if (!className) className = "";

  return (
    <div
      className={`sidebar-component ${className}`}
      style={{
        background: color ? color : "rgba(255, 255, 255, 0.1)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Sidebar;
