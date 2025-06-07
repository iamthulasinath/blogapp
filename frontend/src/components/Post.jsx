import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Post.css";
import Header from "./Header";
import Footer from "./Footer";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        if (data.imageUrl) {
          setImagePreview(`http://localhost:5000${data.imageUrl}`);
        }
      } catch (err) {
        setMessage("Error loading post data");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      let response;
      if (id) {
        // Edit
        response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      } else {
        // Create
        response = await fetch("http://localhost:5000/api/posts/create", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      }

      const data = await response.json();

      if (response.ok) {
        setMessage(
          id
            ? "✅ Post updated successfully!"
            : "✅ Post uploaded successfully!"
        );
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(data.message || "❌ Failed to save post.");
      }
    } catch (err) {
      console.error("Save error:", err);
      setMessage("❌ Server error. Try again.");
    }
  };

  if (loading) return <p>Loading post data...</p>;

  return (
    <div className="post-page">
      <Header />
      <div className="post-container">
        <h2 className="post-heading">
          {id ? "Edit Blog Post" : "Write a New Blog Post"}
        </h2>
        <form className="post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">📌 Title</label>
            <input
              id="title"
              type="text"
              placeholder="Catchy blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">📝 Content</label>
            <textarea
              id="content"
              rows="10"
              placeholder="Start writing your post here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="image">📷 Image (optional)</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {imagePreview && (
            <div className="image-preview-wrapper">
              <img src={imagePreview} alt="Preview" className="image-preview" />
            </div>
          )}

          <button type="submit">
            {id ? "✏️ Update Post" : "🚀 Publish Post"}
          </button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
