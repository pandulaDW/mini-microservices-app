const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  console.log("Moderation Service: Received event", req.body);
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("fuck") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: { ...data, status },
    });
  }

  res.send({});
});

app.listen(4003, () =>
  console.log("moderation service started at port 4003...")
);
