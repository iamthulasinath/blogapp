import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onClickSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrMsg("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        navigate("/", { state: { email } });
      } else {
        setErrMsg(data.message || "Login failed.");
      }
    } catch (error) {
      setErrMsg("Server error. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="app-title-container">
        <h2>
          Blogink<span className="dot">.</span>
        </h2>
        <p className="subtitle">Your voice, your space.</p>
        <div className="gradient-container">
          <p className="slogan">Tell your story with us.</p>
        </div>
      </div>

      <form className="form-container" onSubmit={onClickSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="error-msg">{errMsg}</p>
        <button type="submit">Login</button>
        <p className="register-text">
          New user? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
