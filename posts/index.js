const express = require("express");
const { randomBytes } = require("crypto");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex"),
    { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events/", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("Received Event: ", req.body.type);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`The server is up on port ${PORT}`);
});
