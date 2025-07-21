// 📁 routes/submissionRoute.js

const express = require("express");
const submissionRouter = express.Router();
const Auth = require("../middleware/auth");
const AssignmentSubmission = require("../schema/assignmentSubmission");
const { calculateCompleteness } = require("../utils/matchCompleteness");
const extractTeacherQuestions = require("../utils/extractTeacherQuestions");
const Feedback = require("../schema/feedback");
const extractQnA = require("../utils/extractQnA");
const evaluateWithGemini = require("../utils/geminiEval");
const Assignment = require("../schema/assignment");

submissionRouter.post("/submit-assignment", Auth, async (req, res) => {
  try {
    const { assignmentId, fileBase64, comments } = req.body;

    if (!assignmentId || !fileBase64) {
      return res.status(400).json({
        message: "Assignment ID and file are required.",
      });
    }

    const existing = await AssignmentSubmission.findOne({
      studentId: req.user._id,
      assignmentId,
    });

    if (existing) {
      return res.status(409).json({
        message: "Assignment already submitted.",
      });
    }

    // Save the assignment submission
    const submission = await AssignmentSubmission.create({
      studentId: req.user._id,
      assignmentId,
      fileBase64,
      comments,
    });

    // Extract teacher and student questions
    const assignment = await Assignment.findById(assignmentId);
    const teacherQuestions = await extractTeacherQuestions(assignment);
    const studentQnA = await extractQnA(fileBase64);

    const completenessScore =
      Number(calculateCompleteness(teacherQuestions, studentQnA)) || 0;

    const evaluations = [];

    for (const item of studentQnA) {
      const aiFeedback = await evaluateWithGemini(item.question, item.answer);

      evaluations.push({
        question: item.question,
        answer: item.answer,
        feedback: {
          ...aiFeedback,
          completeness: completenessScore,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Delay to avoid rate limits
    }

    // Combine all individual feedback into a summary
    const overallFeedback = evaluations
      .map((ev) => `• ${ev.feedback.overallComment}`)
      .join(" ");

    await Feedback.create({
      submissionId: submission._id,
      evaluations,
      overallFeedback,
    });

    return res.status(201).json({
      message: "Assignment submitted and evaluated successfully.",
    });
  } catch (err) {
    console.error("Error in /submit-assignment:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = submissionRouter;
