const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

const commentsByPostID = {};

app.get("/posts/:id/comments", (req, res) => {
  res.json(commentsByPostID[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentID = randomBytes(4).toString("hex");
  const postID = req.params.id;
  const { content } = req.body;

  if (!(postID in commentsByPostID)) {
    commentsByPostID[postID] = [];
  }

  const newComment = { id: commentID, content, status: "pending" };
  commentsByPostID[postID].push(newComment);
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { ...newComment, postID },
  });
  res.status(201).json(newComment);
});

app.post("/events", async (req, res) => {
  console.log("Comment Service: Received event", req.body);
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postID, id } = data;
    const index = commentsByPostID[postID].findIndex(
      (comment) => comment.id === id
    );
    commentsByPostID[postID][index] = data;
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data,
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("comment service started at port 4001...");
});
