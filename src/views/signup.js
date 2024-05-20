import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FaGooglePlusG,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaEyeSlash,
  FaEye,
  FaSpinner,
} from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import zxcvbn from "zxcvbn";
import "./signup.css";

const Loader = () => (
  <div className="loader-container">
    <FaSpinner className="loader-spinner" />
  </div>
);

const SignUp = (props) => {
  const history = useHistory();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = useState("");
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("red");

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleShowLoginPassword = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    signUpFormik.handleChange(event);

    const result = zxcvbn(password);
    setPasswordStrength(result.score);

    switch (result.score) {
      case 0:
        setPasswordStrengthText("Too weak");
        setPasswordStrengthColor("red");
        break;
      case 1:
        setPasswordStrengthText("Weak");
        setPasswordStrengthColor("orange");
        break;
      case 2:
        setPasswordStrengthText("Fair");
        setPasswordStrengthColor("yellow");
        break;
      case 3:
        setPasswordStrengthText("Good");
        setPasswordStrengthColor("lightgreen");
        break;
      case 4:
        setPasswordStrengthText("Strong");
        setPasswordStrengthColor("green");
        break;
      default:
        setPasswordStrengthText("");
        setPasswordStrengthColor("red");
    }
  };

  const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm Password is required"),
  });

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const signUpFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      const handleSubmit = (values) => {
        fetch("https://sendit-backend-qhth.onrender.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.name,
            email: values.email,
            password: values.password,
            is_admin: false,
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else if (response.status === 400 || response.status === 409) {
              setIsSignUp(false);
              throw new Error("User already exists");
            } else {
              throw new Error(`Sign up failed with status ${response.status}`);
            }
          })
          .then((data) => {
            setIsLoading(false);
            if (data.success) {
              alert("Sign up successful");
              history.push("/");
            } else {
              console.error("Sign up failed:", data.message);
              alert(data.message);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            if (err.message === "User already exists") {
              alert("User already exists. Please log in instead.");
            } else {
              console.error(err);
              alert("An error occurred during sign up.");
            }
          });
        signUpFormik.resetForm();
      };
      handleSubmit(values);
    },
  });

  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      const handleLogin = (values) => {
        fetch("https://sendit-backend-qhth.onrender.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setIsLoading(false);
            if (data.token) {
              console.log("Login successful");
              console.log("Token:", data.token);
              localStorage.setItem("token", data.token);
              history.push("/");
            } else {
              console.error("Login failed:", data.message);
              alert(data.message);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            console.error("Error:", err);
          });
      };
      handleLogin(values);
    },
  });

  return (
    <div
      className={`container ${isSignUp ? "active" : ""} ${
        isLoading ? "loading" : ""
      }`}
      id="container"
    >
      {isLoading && <Loader />}
      <div className={`form-container sign-up ${isSignUp ? "active" : ""}`}>
        <form onSubmit={signUpFormik.handleSubmit}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon" id="google">
              <FaGooglePlusG />
            </a>
            <a href="#" className="icon" id="facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="icon" id="github">
              <FaGithub />
            </a>
            <a href="#" className="icon" id="linkedin">
              <FaLinkedinIn />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            onChange={signUpFormik.handleChange}
            value={signUpFormik.values.name}
          />
          {signUpFormik.errors.name && (
            <div className="error-message">{signUpFormik.errors.name}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="email"
            name="email"
            onChange={signUpFormik.handleChange}
            value={signUpFormik.values.email}
          />
          {signUpFormik.errors.email && (
            <div className="error-message">{signUpFormik.errors.email}</div>
          )}
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="password"
              name="password"
              onChange={handlePasswordChange}
              value={signUpFormik.values.password}
            />
            <span className="show-password-btn" onClick={handleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="password-strength-indicator">
            <div
              className={`strength-bar strength-${passwordStrength}`}
              style={{ width: `${(passwordStrength / 4) * 100}%` }}
            ></div>
            <span
              className="strength-text"
              style={{ color: passwordStrengthColor }}
            >
              {passwordStrengthText}
            </span>
          </div>
          {signUpFormik.errors.password && (
            <div className="error-message">{signUpFormik.errors.password}</div>
          )}
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={signUpFormik.handleChange}
              value={signUpFormik.values.confirmPassword}
            />
            <span
              className="show-password-btn"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {signUpFormik.errors.confirmPassword && (
            <div className="error-message">
              {signUpFormik.errors.confirmPassword}
            </div>
          )}
          <button className="signup" type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div className={`form-container sign-in ${isSignUp ? "" : "active"}`}>
        <form onSubmit={signInFormik.handleSubmit}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon" id="google">
              <FaGooglePlusG />
            </a>
            <a href="#" className="icon" id="facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="icon" id="github">
              <FaGithub />
            </a>
            <a href="#" className="icon" id="linkedin">
              <FaLinkedinIn />
            </a>
          </div>
          <span>or use your email password</span>
          <input
            type="email"
            placeholder="Email"
            className="email"
            name="email"
            onChange={signInFormik.handleChange}
            value={signInFormik.values.email}
          />
          {signInFormik.errors.email && (
            <div className="error-message">{signInFormik.errors.email}</div>
          )}
          <div className="password-input-container">
            <input
              type={showLoginPassword ? "text" : "password"}
              placeholder="Password"
              className="password"
              name="password"
              onChange={signInFormik.handleChange}
              value={signInFormik.values.password}
            />
            <span
              className="show-password-btn"
              onClick={handleShowLoginPassword}
            >
              {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {signInFormik.errors.password && (
            <div className="error-message">{signInFormik.errors.password}</div>
          )}
          <a href="#" className="reset">
            Forget Your Password?
          </a>
          <button className="signup" type="submit">
            Sign In
          </button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button className="hidden" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
