const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 4005;
app.use(helmet());
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://localhost:4000/events/", event);
  axios.post("http://localhost:4001/events/", event);
  axios.post("http://localhost:4002/events/", event);
  axios.post("http://localhost:4003/events/", event);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Server up listening on port ${PORT}`);
});
