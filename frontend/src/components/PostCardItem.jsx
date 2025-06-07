import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostCardItem.css";

const PostCardItem = ({ post, userId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${post._id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="post-card-item">
      <div className="post-author-top">
        <img
          src={post.user?.profilePic || "/default-profile.png"}
          alt="Author"
          className="post-author-pic"
        />
        <div className="post-author-info">
          <span className="post-author-name">
            {post.user?.name || "Unknown"}
          </span>
          <span className="post-date">{formatDate(post.createdAt)}</span>
        </div>
        {post.user?._id === userId && (
          <div className="three-dots-wrapper">
            <BsThreeDotsVertical
              onClick={() => setMenuOpen((prev) => !prev)}
              className="three-dots-icon"
            />
            {menuOpen && (
              <div className="popup-menu">
                <button onClick={handleEdit}>Edit Post</button>
                <button onClick={handleDelete}>Delete Post</button>
              </div>
            )}
          </div>
        )}
      </div>

      <h3 className="post-title">{post.title}</h3>

      {post.imageUrl && (
        <img
          src={`http://localhost:5000${post.imageUrl}`}
          alt={post.title}
          className="post-card-image"
        />
      )}

      <p className="post-snippet">
        {post.content.length > 150
          ? `${post.content.slice(0, 150)}...`
          : post.content}
      </p>

      <Link to={`/post/${post._id}`} className="read-more-btn">
        Read More
      </Link>
    </div>
  );
};

export default PostCardItem;
