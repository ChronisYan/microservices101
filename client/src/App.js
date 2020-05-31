import React from "react";
import "./App.css";
import CreatePost from "./PostCreate";
import PostList from "./PostList";

function App() {
  return (
    <div className="App">
      <h1>Blog App!</h1>
      <CreatePost />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
