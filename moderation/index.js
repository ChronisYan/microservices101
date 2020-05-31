const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const axios = require("axios");

const PORT = 4003;
const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("Disney") ? "Rejected" : "Approved";

    await axios.post("http://localhost:4005/events/", {
      type: "CommentModerated",
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status,
      },
    });
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Server up listening on port ${PORT}`);
});
