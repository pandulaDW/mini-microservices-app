const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (_, res) => {
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received event", req.body);
  res.send("");
});

app.listen(4000, () => {
  console.log("post service started at port 4000...");
});
