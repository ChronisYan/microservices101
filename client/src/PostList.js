import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostList.css";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPost = Object.values(posts).map((post) => {
    return (
      <div className="PostCard" key={post.id}>
        <div className="PostCard-body">
          <h3>{post.title}</h3>
          <hr />
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return <div className="PostList">{renderedPost}</div>;
};
