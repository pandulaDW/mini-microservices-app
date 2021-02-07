const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (event) => {
  const { type, data } = event;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postID, status } = data;
    posts[postID]["comments"].push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, postID } = data;
    const index = posts[postID]["comments"].findIndex(
      (comment) => comment.id === id
    );
    posts[postID]["comments"][index] = data;
  }
};

app.get("/posts", (_, res) => {
  res.json(posts);
});

app.post("/events", (req, res) => {
  handleEvent(req.body);
  res.json({});
});

app.listen(4002, async () => {
  console.log("query service listening on 4002...");
  const res = await axios.get("http://localhost:4005/events");

  res.data.forEach((event) => {
    console.log("Processing events: ", event.type);
    handleEvent(event);
  });
});
