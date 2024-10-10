import Box from "../../components/Box/Box";
import Input from "../../components/Input/Input";
import Password from "../../components/Password/Password";
import Button from "../../components/Button/Button";
import "./signup_style.css";

function Signup() {
  return (
    <div className="signup-container">
      <Box className="signup-box">
        <h2>Join us today!</h2>
        <p>Signup now to become a member</p>
        <Input icon="mdi:user" placeholder="Clubname"></Input>
        <Input icon="mdi:mail" placeholder="Email"></Input>
        <Input icon="mdi:password" placeholder="Password"></Input>
        <Password placeholder="Re-enter password" />
        <Button>Signup</Button>
        <p>Already a member? Login here</p>
        <Button>Signup with Google</Button>
      </Box>
    </div>
  );
}

export default Signup;
