const express = require("express");
const submissionRouter = express.Router();
const Auth = require("../middleware/auth");
const AssignmentSubmission = require("../schema/assignmentSubmission");

submissionRouter.post("/submit-assignment", Auth, async (req, res) => {
  try {
    const { assignmentId, fileBase64, comments } = req.body;

    // Validate input
    if (!assignmentId || !fileBase64) {
      return res.status(400).json({ message: "Assignment ID and file are required." });
    }

    // Check if this student already submitted this assignment
    const existingSubmission = await AssignmentSubmission.findOne({
      studentId: req.user._id,
      assignmentId: assignmentId,
    });

    if (existingSubmission) {
      return res.status(409).json({ message: "Assignment already submitted." });
    }

    // Create and save new submission
    const newSubmission = new AssignmentSubmission({
      studentId: req.user._id,
      assignmentId,
      fileBase64,
      comments,
    });

    await newSubmission.save();

    res.status(201).json({ message: "Assignment submitted successfully." });
  } catch (error) {
    console.error("Error in /submit-assignment:", error.message);
    res.status(500).json({ message: "Server error while submitting assignment." });
  }
});

module.exports = submissionRouter;