const express = require("express");
const server = express();
const cors = require("cors");
const connectDB = require("./src/config/database");
const authRouter = require("./src/routes/authRoute");
const cookieParser = require("cookie-parser");
const profileRouter = require("./src/routes/profileRoute");
const assignmentRouter = require("./src/routes/assignmentRoute");
const submissionRouter = require("./src/routes/submissionRoute");
const dashboardRouter = require("./src/routes/dashboardRoute");
const feedbackRouter = require("./src/routes/feedbackRoute");
const classroomRouter = require("./src/routes/classroomRoute");
const teacherFeedbackInsightsRouter = require("./src/routes/teacherFeedbackRoute");
require("dotenv").config();

//const ALLOW_ORIGINS = "https://smartpedagogy.vercel.app/";

const ALLOW_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") || [
  "https://smartpedagogy.vercel.app/",
];
server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOW_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

server.use(cookieParser());
server.use(express.json({ limit: "10mb" }));

server.use("/", authRouter);
server.use("/", profileRouter);
server.use("/", assignmentRouter);
server.use("/", submissionRouter);
server.use("/", dashboardRouter);
server.use("/", feedbackRouter);
server.use("/", classroomRouter);
server.use("/", teacherFeedbackInsightsRouter);

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
