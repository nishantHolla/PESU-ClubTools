import Box from "../../components/Box/Box";
import Input from "../../components/Input/Input";
import Password from "../../components/Password/Password";
import "./signup_style.css";

function Signup() {
  return (
    <div className="signup-container">
      <Box className="signup-box">
        <Input icon="mdi:user" placeholder="Clubname"></Input>
        <Input icon="mdi:mail" placeholder="Email"></Input>
        <Password />
      </Box>
    </div>
  );
}

export default Signup;
