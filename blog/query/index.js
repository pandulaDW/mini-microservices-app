const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (_, res) => {
  res.json(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("Query Service: Received event", type);

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

  res.json({});
});

app.listen(4002, () => console.log("query service listening on 4002..."));
