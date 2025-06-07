import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getEmailFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("userId", payload.id);
      return payload.email || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const email = getEmailFromToken();
    if (!email) return;
    axios
      .post("http://localhost:5000/api/users/profile", { email })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load user:", err));
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <h2 className="logo" onClick={() => navigate("/")}>
          Blogink<span className="dot">.</span>
        </h2>

        <div
          className="profile-icon"
          onClick={() => setShowPanel((prev) => !prev)}
          role="button"
          tabIndex={0}
          aria-label="Toggle Profile Panel"
        >
          <img
            src={user?.profilePic || "/default-profile.png"}
            alt={user ? `${user.name}'s profile` : "Default profile"}
            title={user ? `${user.name} (${user.email})` : "Profile"}
          />
        </div>
      </div>

      {/* Side Panel */}
      <div className={`side-panel ${showPanel ? "open" : ""}`}>
        <h3>My Profile</h3>
        {user ? (
          <div className="side-panel-user-info">
            <img
              src={user.profilePic || "/default-profile.png"}
              alt={`${user.name}'s profile`}
              className="side-panel-profile-pic"
            />
            <p className="side-panel-user-name">{user.name}</p>
            <p className="side-panel-user-email">{user.email}</p>
          </div>
        ) : (
          <p>Loading user info...</p>
        )}

        <ul>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </li>
        </ul>
      </div>

      {showPanel && (
        <div className="overlay" onClick={() => setShowPanel(false)}></div>
      )}
    </header>
  );
};

export default Header;
