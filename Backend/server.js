const express = require("express");

const server = express();

server.use("/", (req, res) => {
  res.send("server is running...");
});

server.listen(7777, () => {
  console.log("server is listening at port 7777");
});
