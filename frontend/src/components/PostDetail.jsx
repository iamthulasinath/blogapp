import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css";
import Header from "./Header";
import { IoIosArrowBack } from "react-icons/io";
import Footer from "./Footer";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch(console.error);
  }, [id]);

  if (!post) return <p>Loading post...</p>;

  return (
    <>
      <Header />
      <div>
        <IoIosArrowBack />
      </div>
      <div className="post-detail-container">
        <h1>{post.title}</h1>
        <p className="post-detail-meta">
          Posted by <strong>{post.user?.name}</strong> on{" "}
          {new Date(post.createdAt).toLocaleString()}
        </p>
        {post.imageUrl && (
          <img src={`http://localhost:5000${post.imageUrl}`} alt={post.title} />
        )}
        <p className="post-detail-content">{post.content}</p>
      </div>
      <Footer />;
    </>
  );
};

export default PostDetail;
