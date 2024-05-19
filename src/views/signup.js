import React, { useState } from "react";
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./signup.css";

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const signInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const signUpFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log(values);
      // Add your form submission logic here
      const handleSubmit = (values)=>{
        fetch('https://sendit-backend-qhth.onrender.com/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: values.email,
            username: values.name,
            password: values.password,
            is_admin: false
          })
        }).
        then(response = response.json()).
        then(data = console.log(data)).
        catch(err=>console.error(err))
        signUpFormik.values.name = ''
        signUpFormik.values.email = ''
        signUpFormik.values.password = ''
      }
      handleSubmit(values)      
    },
  });

  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
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
          if (data.token) {
            console.log("Login successful");
            console.log("Token:", data.token);
            // Store the token in localStorage or handle it appropriately
            localStorage.setItem("token", data.token);
          } else {
            console.error("Login failed:", data.message);
            // Handle the error case (e.g., show an alert or error message)
            alert(data.message);
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    };
    handleLogin(values);

    },
  });

  return (
    <div className={`container ${isSignUp ? "active" : ""}`} id="container">
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
          <span>or use your email for registeration</span>
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
            id="email"
            name="email"
            onChange={signUpFormik.handleChange}
            value={signUpFormik.values.email}
          />
          {signUpFormik.errors.email && (
            <div className="error-message">{signUpFormik.errors.email}</div>
          )}
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={signUpFormik.handleChange}
            value={signUpFormik.values.password}
          />
          {signUpFormik.errors.password && (
            <div className="error-message">{signUpFormik.errors.password}</div>
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
            id="email"
            name="email"
            onChange={signInFormik.handleChange}
            value={signInFormik.values.email}
          />
          {signInFormik.errors.email && (
            <div className="error-message">{signInFormik.errors.email}</div>
          )}
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={signInFormik.handleChange}
            value={signInFormik.values.password}
          />
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
            <p>Register with your personal details to use all of site features</p>
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