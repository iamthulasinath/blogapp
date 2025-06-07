import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCardItem from "../components/PostCardItem";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("forYou");
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/posts/")
      .then((res) => setAllPosts(res.data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, [navigate, token, userId]);

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5000/api/posts/my-posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMyPosts(res.data))
      .catch((err) => console.error("Failed to fetch my posts:", err));
  }, [token]);

  const postsToDisplay = activeTab === "forYou" ? allPosts : myPosts;

  return (
    <div className="home-container">
      <Header />

      <div className="navigation-options">
        <button
          className={activeTab === "forYou" ? "active" : ""}
          onClick={() => setActiveTab("forYou")}
        >
          For You
        </button>
        <button
          className={activeTab === "myPosts" ? "active" : ""}
          onClick={() => setActiveTab("myPosts")}
        >
          My Posts
        </button>
      </div>

      <div className="posts-list">
        {postsToDisplay.length > 0 ? (
          postsToDisplay.map((post) => (
            <PostCardItem key={post._id} post={post} userId={userId} />
          ))
        ) : (
          <p className="no-posts">No posts found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
