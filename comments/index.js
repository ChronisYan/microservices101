const express = require("express");
const { randomBytes } = require("crypto");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const PORT = process.env.PORT || 4001;
const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex"),
    { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "Pending" });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events/", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "Pending",
    },
  });

  res.status(201).send(comments);
});

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/events", async (req, res) => {
  console.log("Received Event: ", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, content, id, status } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => (comment.id = id));
    comment.status = status;

    await axios.post("http://localhost:4005/events/", {
      type: "CommendUpdated",
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log(`The server is up on port ${PORT}`);
});
