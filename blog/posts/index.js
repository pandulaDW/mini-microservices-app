const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (_, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  res.status(201).json(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
