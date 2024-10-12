import "./modal_style.css";

function Modal({ className }) {
  if (!className) className = "";
  return <div className={`modal-component ${className}`}>M</div>;
}

export default Modal;
