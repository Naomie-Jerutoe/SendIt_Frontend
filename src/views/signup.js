import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { FaEyeSlash, FaEye, FaSpinner } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import zxcvbn from "zxcvbn";
import { jwtDecode } from "jwt-decode";
import "./signup.css";
import classNames from "classnames";

const Loader = () => (
  <div className="loader-container">
    <FaSpinner className="loader-spinner" />
  </div>
);

const PasswordInput = ({
  name,
  placeholder,
  showPassword,
  handleShowPassword,
  handleChange,
  value,
}) => (
  <div className="password-input-container">
    <input
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
      value={value}
    />
    <span className="show-password-btn" onClick={handleShowPassword}>
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
);

const SignUp = () => {
  const history = useHistory();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = useState("");
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("red");

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
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://sendit-backend-qhth.onrender.com/signup",
          {
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
          }
        );
        const data = await response.json();
        setIsLoading(false);
        if (response.ok) {
          alert("Sign up successful.Please login");
          setIsSignUp(false);
        } else if (response.status === 400 || response.status === 409) {
          setIsSignUp(false);
          throw new Error(data.message || "User already exists. Please Log in");
        } else {
          throw new Error(
            data.message || `Sign up failed with status ${response.status}`
          );
        }
      } catch (error) {
        setIsLoading(false);
        alert(error.message);
      }
      signUpFormik.resetForm();
    },
  });

  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://sendit-backend-qhth.onrender.com/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          }
        );
        const data = await response.json();
        setIsLoading(false);
        if (data.token) {
          localStorage.setItem("token", data.token);
          const accessToken = jwtDecode(data.token);
          if (accessToken.sub.is_admin) {
            history.push("/admin_dashboard");
          } else {
            history.push("/user-dashboard");
          }
        } else {
          throw new Error(data.message || "Login failed");
        }
      } catch (error) {
        setIsLoading(false);
        alert(error.message);
      }
    },
  });

  return (
    <div
      className={classNames("container", {
        active: isSignUp,
        loading: isLoading,
      })}
      id="container"
    >
      {isLoading && <Loader />}
      <div
        className={classNames("form-container", "sign-up", {
          active: isSignUp,
        })}
      >
        <form onSubmit={signUpFormik.handleSubmit}>
          <img
            className="image"
            src={`${process.env.PUBLIC_URL}/black___red_simple_flat_delivery_service_logo-removebg-preview-1500h.png`}
            alt="Logo"
          />
          <h1>Create Account</h1>
          <h5>Use your email for registration</h5>
          <input
            type="text"
            placeholder="Name"
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
            name="email"
            onChange={signUpFormik.handleChange}
            value={signUpFormik.values.email}
          />
          {signUpFormik.errors.email && (
            <div className="error-message">{signUpFormik.errors.email}</div>
          )}
          <PasswordInput
            name="password"
            placeholder="Password"
            showPassword={showPassword}
            handleShowPassword={() => setShowPassword(!showPassword)}
            handleChange={handlePasswordChange}
            value={signUpFormik.values.password}
          />
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
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm Password"
            showPassword={showConfirmPassword}
            handleShowPassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            handleChange={signUpFormik.handleChange}
            value={signUpFormik.values.confirmPassword}
          />
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
      <div
        className={classNames("form-container", "sign-in", {
          active: !isSignUp,
        })}
      >
        <form onSubmit={signInFormik.handleSubmit}>
          <img
            className="image"
            src={`${process.env.PUBLIC_URL}/black___red_simple_flat_delivery_service_logo-removebg-preview-1500h.png`}
            alt="Logo"
          />
          <h1>Sign In</h1>
          <h5>Enter your Email and Password</h5>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={signInFormik.handleChange}
            value={signInFormik.values.email}
          />
          {signInFormik.errors.email && (
            <div className="error-message">{signInFormik.errors.email}</div>
          )}
          <PasswordInput
            name="password"
            placeholder="Password"
            showPassword={showLoginPassword}
            handleShowPassword={() => setShowLoginPassword(!showLoginPassword)}
            handleChange={signInFormik.handleChange}
            value={signInFormik.values.password}
          />
          {signInFormik.errors.password && (
            <div className="error-message">{signInFormik.errors.password}</div>
          )}
          <Link to="/reset-password" className="reset">
            Forgot Your password?
          </Link>
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
            <button className="hidden" onClick={() => setIsSignUp(false)}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button className="hidden" onClick={() => setIsSignUp(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
