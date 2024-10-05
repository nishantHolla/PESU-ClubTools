import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={`background ${darkMode ? "dark" : ""}`} id="background">
      <button id="mode-toggle" className="mode-toggle" onClick={toggleMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>
      <div className="login-box" id="login-box">
        <h2>Login</h2>
        <form>
          <div className="textbox">
            <input type="email" placeholder="Email" required />
            <span className="icon">&#x2709;</span>
          </div>
          <div className="textbox">
            <input type="password" placeholder="Password" required />
            <span className="icon">&#128274;</span>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <button type="button" className="btn google-btn">
            Sign in with Google
          </button>
        </form>
        <div className="register">
          <p>
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
