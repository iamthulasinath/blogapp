import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

const profileImages = {
  Male: [
    "https://res.cloudinary.com/dl4mtiiec/image/upload/v1749113348/2289_SkVNQSBGQU1PIDEwMjgtMTIy_p2zsbf.jpg",
    "https://res.cloudinary.com/dl4mtiiec/image/upload/v1749199554/mp1_t80dcm.png",
    "https://res.cloudinary.com/dl4mtiiec/image/upload/v1749199556/Serene_Walk_on_a_Rainy_Path_1_imya1r.png",
  ],
  Female: [
    "https://res.cloudinary.com/dl4mtiiec/image/upload/v1749199554/fp1_ikiqxu.png",
    "https://res.cloudinary.com/dl4mtiiec/image/upload/v1749199554/fp2_xbf8zj.png",
  ],
  Others: [
    "https://res.cloudinary.com/dl4mtiiec/image/upload/v1749199556/296fe121-5dfa-43f4-98b5-db50019738a7_d4dmdr.jpg",
  ],
};

const getRandomProfilePic = (gender) => {
  const pics = profileImages[gender];
  return pics[Math.floor(Math.random() * pics.length)];
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "Male",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      ...formData,
      profilePic: getRandomProfilePic(formData.gender),
    };

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error("Registration failed", err);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="app-title-container">
        <h2>
          Blogink<span className="dot">.</span>
        </h2>
        <p className="subtitle">Create your account</p>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Create a password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <select name="gender" onChange={handleChange} value={formData.gender}>
          <option>Male</option>
          <option>Female</option>
          <option>Others</option>
        </select>

        <p className="message">{message}</p>
        <button type="submit">Register</button>
        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
