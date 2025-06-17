const express = require("express");
const server = express();
const cors = require("cors");
const connectDB = require("./src/config/database");
const authRouter = require("./src/routes/authRoute");
const cookieParser = require("cookie-parser");
const profileRouter = require("./src/routes/profileRoute");

server.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);

server.use(cookieParser());
server.use(express.json());
server.use("/", authRouter);
server.use("/", profileRouter);

server.use("/", (req, res) => {
  res.send("server is running...");
});

connectDB()
  .then(() => {
    console.log("database is connected successfully");
    server.listen(7777, () => {
      console.log("server is listening at port 7777");
    });
  })
  .catch((err) => {
    console.log("database is not connected successfully");
    console.error(err);
  });
