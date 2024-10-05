import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "../lib/session";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login_google, user } = useSession();

  useEffect(() => {
    if (user) {
      return navigate(`/u/${user.uid}`);
    }
  }, []);

  const handleLoginGoogle = () => {
    setLoading(true);
    login_google().then(() => {
      return navigate(`/u/`);
    });
  };

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
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Loading" : "Login"}
          </button>
          <button
            type="button"
            className="btn google-btn"
            disabled={loading}
            onClick={handleLoginGoogle}
          >
            {loading ? "Loading" : "Sign in with Google"}
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
