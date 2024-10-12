
const LinkComponent = ({ className, ...props }) => {
  if (!className) className = "";

  return (
    <a {...props} className={`link-component ${className}`}>
      {props.children}
    </a>
  );
};

export default LinkComponent;
