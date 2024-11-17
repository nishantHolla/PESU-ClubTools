import "./image_frame_style.css";

function ImageFrame({ src, alt, link, children, className, ...props }) {
  if (!className) className = "";

  const content = src ? (
    <img src={src} alt={alt || "Image"} className="frame-image" />
  ) : (
    <div className="frame-placeholder">{children}</div>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`image-frame ${className}`}
      {...props}
    >
      {content}
    </a>
  ) : (
    <div className={`image-frame ${className}`} {...props}>
      {content}
    </div>
  );
}

export default ImageFrame;
