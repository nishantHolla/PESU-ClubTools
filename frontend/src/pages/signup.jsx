import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="signup_page">
      <div className="background1"></div>
      <div class="hero11">
        <span className="heading1">Create Account</span>
        <br></br>
        <div className="Name">
          <div className="ele1">
            <div className="label1">First Name</div>
            <input type="text" name="Name" className="namefield"></input>
          </div>
          <div className="ele2">
            <div className="label1">Last Name</div>
            <input type="text" name="Name" className="namefield"></input>
          </div>
        </div>
        <div className="ele3">
          <div className="label1">Email</div>
          <input type="text" name="Name" className="emailfield"></input>
        </div>
        <div className="ele3">
          <div className="label1">Password</div>
          <input type="password" name="Name" className="emailfield"></input>
        </div>
        <button className="btn1">Sign up</button>
        <br></br>
        <span className="text2">Already have an account ?</span>
        <Link to="/login"className="text4">Login </Link>
        <br></br>
        <div className="or">
          <hr className="line"></hr>
          <span className="text3">or</span>
          <hr className="line1"></hr> 
        </div>
        <button className="btn2">Sign up with Google</button>
      </div>
    </div>
  );
}

export default Signup;
