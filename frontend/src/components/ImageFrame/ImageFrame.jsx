import "./image_frame_style.css";

function ImageFrame({ src, alt, children, className, ...props }) {
  if (!className) className = "";

  return (
    <div className={`image-frame ${className}`} {...props}>
      {src ? (
        <img src={src} alt={alt || "Image"} className="frame-image" />
      ) : (
        <div className="frame-placeholder">{children}</div>
      )}
    </div>
  );
}

export default ImageFrame;
