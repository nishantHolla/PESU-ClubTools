import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import "./login_style.css";

function Login() {
  return (
    <div>
      <h1>This is the login page</h1>
      <div className="login-box">
        <Box>
          <Button />
        </Box>
      </div>
    </div>
  );
}

export default Login;
