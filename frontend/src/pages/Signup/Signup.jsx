import Box from "../../components/Box/Box";
import Input from "../../components/Input/Input";
import Password from "../../components/Password/Password";
import Button from "../../components/Button/Button";
import "./signup_style.css";

function Signup() {
  return (
    <div className="signup-container">
      <Box className="signup-box">
        <div className="signup-heading">
          <h2>Join us today!</h2>
          <p>Signup now to become a member</p>
        </div>
        <div className="signup-form">
          <Input icon="eva:person" placeholder="Clubname"></Input>
          <Input icon="eva:mail" placeholder="Email"></Input>
          <Password placeholder="Enter password" />
          <Password placeholder="Re-enter password" />
          <Button>Signup</Button>
          <Button>Signup with Google</Button>
          <p className="signup-redirect">Already a member? Login here</p>
        </div>
      </Box>
    </div>
  );
}

export default Signup;
