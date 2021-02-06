const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  console.log("Moderation Service: Received event", req.body.type);
});

app.listen(4003, () =>
  console.log("moderation service started at port 4003...")
);
