import "./signup_style.css";

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
import "./signup_style.css";

function Signup() {
  const navigate = useNavigate();
  const { signup, user } = useSession();
  const { setStatus } = useStatus();
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [validity, setValidity] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(null, null);
    if (user) {
      navigate(`/u/${user.uid}`);
    }
  }, []);

  const [form, setForm] = useState({
    clubname: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const handleSignup = () => {
    setLoading(true);

    const signupSuccess = (user) => {
      if (user) {
        navigate(`/u/${user.uid}`);
      }
    };

    const signupFail = (error) => {
      if (error.code === "auth/email-already-in-use") {
        setStatus("error", "Email already in use. Do you want to login?");
      } else {
        setStatus("error", "Something went wrong. See console.");
        console.log(error);
      }
    };

    signup(form.email, form.password, form.clubname, signupSuccess, signupFail);
  };

  const validateForm = () => {
    if (!touched) return;
    setIsValid(false);

    if (form.clubname.length === 0) {
      setStatus("error", "Please enter a club name.");
      setValidity(1);
      return;
    } else if (!validateEmail(form.email)) {
      setStatus("error", "Please enter a valid email.");
      setValidity(2);
      return;
    } else if (form.password.length <= 5) {
      setStatus("error", "Password must be at least 5 characters long.");
      setValidity(3);
      return;
    } else if (form.confirmPassword !== form.password) {
      setStatus("error", "Passwords do not match.");
      setValidity(4);
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
    <div className="signup-container">
      <Box className="signup-box">
        <div className="signup-heading">
          <h2>Join us today!</h2>
          <p>Sign up now to become a member</p>
        </div>
        <div className="signup-form">
          <Input
            icon="eva:person"
            className={validity === 1 ? "signup-error" : ""}
            placeholder="Clubname"
            value={form.clubname}
            onChange={(e) => {
              updateForm("clubname", e.target.value);
            }}
          ></Input>
          <Input
            icon="eva:mail"
            className={validity === 2 ? "signup-error" : ""}
            placeholder="Email"
            value={form.email}
            onChange={(e) => {
              updateForm("email", e.target.value);
            }}
          ></Input>
          <Password
            placeholder="Enter password"
            className={validity === 3 ? "signup-error" : ""}
            value={form.password}
            onChange={(e) => {
              updateForm("password", e.target.value);
            }}
          />
          <Password
            placeholder="Re-enter password"
            className={validity === 4 ? "signup-error" : ""}
            icon="eva:check"
            value={form.confirmPassword}
            onChange={(e) => {
              updateForm("confirmPassword", e.target.value);
            }}
          />
          <Button
            className="button-primary"
            disabled={!isValid || loading}
            onClick={handleSignup}
          >
            {loading ? "Loading..." : "Sign up"}
          </Button>
          <SignupWithGoogle
            disabled={loading}
            preClick={() => {
              setLoading(true);
            }}
          />
          <p className="signup-redirect">
            Already a member?&nbsp;
            <Link to="/login">Login here</Link>
          </p>
        </div>
      </Box>
    </div>
  );
}

export default Signup;
