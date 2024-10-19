import "./image_frame_style.css";

function ImageFrame({ src, alt, children, className, blue, ...props }) {
  if (!className) className = "";

  return (
    <div className={`image-frame ${className}`} {...props}>
      {src ? (
        <img src={src} alt={alt || "Image"} className="frame-image" />
      ) : (
        <div className={`frame-placeholder ${blue && 'frame-blue'}`}>{children}</div>
      )}
    </div>
  );
}

export default ImageFrame;
