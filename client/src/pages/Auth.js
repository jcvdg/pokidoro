import React, { useState } from "react";
import "./Auth.css";
// import Logo from "../../img/logo.png";
import CenterContainer from "../components/Modals/CenterContainer";
import { logIn, signUp } from "../store/actions/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const initialState = {
    email: "",
    password: "",
    confirmpass: "",
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState(initialState);
  const [confirmPass, setConfirmPass] = useState(true);

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  return (
    <div className="Auth">
      <CenterContainer>
      <div className="top">
        <div className="title">
          <h1>Pokidoro</h1>
          <h6>One session at a time</h6>
        </div>
      </div>
      <div className="bottom">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{ isSignUp ? "Register" : "Login" }</h3>
          <div>
            <input
              required
              type="text"
              placeholder="Email"
              className="infoInput"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              style={{ border: confirmPass ? "" : "1px solid red"}}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                style={{ border: confirmPass ? "" : "1px solid red"}}
              />
            )}
          </div>

          <span
            style={{
              color: "rgba(212,0,0,1)",
              fontSize: "12px",
              fontWeight: "700",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Password and confirm password do not match
          </span>
          <div className="signupToggle">
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign up"}
            </span>
            <button
              className="button"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
        </CenterContainer>
    </div>
  );
};

export default Auth;