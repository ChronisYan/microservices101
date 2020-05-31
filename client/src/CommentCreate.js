import React, { useState } from "react";
import axios from "axios";
import "./CommentCreate.css";

export default ({ postId }) => {
  const [content, setContent] = useState("");

  const commentSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <div className="CommentCreate">
      <form onSubmit={commentSubmit}>
        <label className="commentCreate-label" htmlFor="comment">
          Comment:
        </label>
        <input
          className="commentCreate-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          name="comment"
          id="comment"
          placeholder="Type comment..."
        />
        <input className="commentCreate-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};
