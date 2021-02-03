const express = require("express");
const { randomBytes } = require("crypto");

const app = express();

// body parser
app.use(express.json());

const commentsByPostID = {};

app.get("/posts/:id/comments", (req, res) => {
  res.json(commentsByPostID[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentID = randomBytes(4).toString("hex");
  const postID = req.params.id;
  const { content } = req.body;

  if (!(postID in commentsByPostID)) {
    commentsByPostID[postID] = [];
  }

  const newComment = { id: commentID, content };
  commentsByPostID[postID].push(newComment);
  res.status(201).json(newComment);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
