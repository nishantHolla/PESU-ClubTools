import "./Link.css";
import { Link } from "react-router-dom";

const LinkComponent = ({ className, ...props }) => {
  if (!className) className = "";

  return (
    <Link {...props} className={`link-component ${className}`}>
      {props.children}
    </Link>
  );
};

export default LinkComponent;
