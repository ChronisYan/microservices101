const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const axios = require("axios");

const PORT = 4002;
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const eventHandler = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = {
      id,
      title,
      comments: [],
    };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommendUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  eventHandler(type, data);
  res.send({});
});

app.listen(PORT, async () => {
  console.log(`Server is up listening on port ${PORT}`);

  const res = await axios.get("http://localhost:4005/events/");

  for (let event of res.data) {
    eventHandler(event.type, event.data);
  }
});
