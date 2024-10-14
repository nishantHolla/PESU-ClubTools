import "./login_style.css";

import { useStatus } from "../../providers/status/Status";
import { useEffect, useState } from "react";
import { useSession } from "../../providers/session/Session";
import { useNavigate } from "react-router-dom";

import Box from "../../components/Box/Box";
import Input from "../../components/Input/Input";
import Password from "../../components/Password/Password";
import Button from "../../components/Button/Button";
import SignupWithGoogle from "../../components/SignupWithGoogle/SignupWithGoogle";
import Link from "../../components/Link/Link";

function Login() {
  const navigate = useNavigate();
  const { login, user } = useSession();
  const { setStatus } = useStatus();
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [validity, setValidity] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(`/u/${user.uid}`);
    }
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const updateForm = (key, value) => {
    setTouched(true);
    setForm((o) => {
      o[key] = value;
      return { ...o };
    });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleLogin = () => {
    setLoading(true);

    const loginSuccess = (user) => {
      if (user) {
        navigate(`/u/${user.uid}`);
      }
    };

    const loginFail = (error) => {
      if (error.code === "auth/user-not-found") {
        setStatus("error", "User not found. Do you want to sign up?");
      } else {
        setStatus("error", "Something went wrong. See console.");
        console.log(error);
      }
    };

    login(form.email, form.password, loginSuccess, loginFail);
  };

  const validateForm = () => {
    if (!touched) return;
    setIsValid(false);

    if (!validateEmail(form.email)) {
      setStatus("error", "Please enter a valid email.");
      setValidity(1);
      return;
    } else if (form.password.length <= 5) {
      setStatus("error", "Password must be at least 5 characters long.");
      setValidity(2);
      return;
    }

    setStatus("", "");
    setIsValid(true);
    setValidity(0);
  };

  useEffect(() => {
    validateForm();
  }, [form]);

  return (
    <div className="login-container">
      <Box className="login-box">
        <div className="login-heading">
          <h2>Welcome back!</h2>
          <p>Login to access your account</p>
        </div>
        <div className="login-form">
          <Input
            icon="eva:mail"
            className={validity === 1 ? "login-error" : ""}
            placeholder="Email"
            value={form.email}
            onChange={(e) => {
              updateForm("email", e.target.value);
            }}
          />
          <Password
            placeholder="Enter password"
            className={validity === 2 ? "login-error" : ""}
            value={form.password}
            onChange={(e) => {
              updateForm("password", e.target.value);
            }}
          />
          <Button
            className="button-primary"
            disabled={!isValid || loading}
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
          <SignupWithGoogle
            disabled={loading}
            preClick={() => {
              setLoading(true);
            }}
          />
          <p className="login-redirect">
            Don't have an account?&nbsp;
            <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </Box>
    </div>
  );
}

export default Login;
