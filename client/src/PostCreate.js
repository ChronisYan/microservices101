import React, { useState } from "react";
import axios from "axios";
import "./PostCreate.css";

export default () => {
  const [title, setTitle] = useState("");
  const postSubmit = async (event) => {
    event.preventDefault();

    await axios.post("http://localhost:4000/posts/", {
      title,
    });

    setTitle("");
  };
  return (
    <div className="PostCreate">
      <form onSubmit={postSubmit}>
        <label htmlFor="title" className="PostCreate-label">
          Title:
        </label>
        <input
          className="PostCreate-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          id="title"
          placeholder="Enter title..."
        />
        <input className="PostCreate-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};
