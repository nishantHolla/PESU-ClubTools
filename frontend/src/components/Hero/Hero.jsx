import "./hero_style.css";

function Hero({
  title,
  subtitle,
  image,
  className = "",
  reverseLayout = false,
  ...props
}) {
  return (
    <div className={`hero-component ${className}`}>
      <div
        className={`hero-content ${reverseLayout ? "reverse" : ""}`}
        {...props}
      >
        <div className="text-section">
          <h1 className="title">{title}</h1>
          <p className="lead">{subtitle}</p>
        </div>
        <div className="image-section">
          <img src={image} alt="Hero" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
