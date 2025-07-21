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
      return res
        .status(400)
        .json({ message: "Assignment ID and file are required." });
    }

    // Check for duplicate submission
    const existing = await AssignmentSubmission.findOne({
      studentId: req.user._id,
      assignmentId,
    });
    if (existing) {
      return res.status(409).json({ message: "Assignment already submitted." });
    }

    // Save assignment submission
    const submission = await AssignmentSubmission.create({
      studentId: req.user._id,
      assignmentId,
      fileBase64,
      comments,
    });

    // Extract teacher's expected questions
    const assignment = await Assignment.findById(assignmentId);
    const teacherQuestions = await extractTeacherQuestions(assignment);
    console.log("Teacher questions:", teacherQuestions);

    // Extract student Q&A from uploaded file
    const studentQnA = await extractQnA(fileBase64);
    console.log("Student Q&A:", studentQnA);

    // Calculate completeness
    const completenessScore =
      Number(calculateCompleteness(teacherQuestions, studentQnA)) || 0;
    console.log("Completeness score:", completenessScore);

    // Evaluate each Q&A with Gemini
    const evaluations = [];

    for (const item of studentQnA) {
      const aiFeedback = await evaluateWithGemini(item.question, item.answer);

      evaluations.push({
        question: item.question,
        answer: item.answer,
        feedback: {
          ...aiFeedback,
          completeness: completenessScore, // Override AI's completeness
        },
        overallFeedback: aiFeedback.overallComment || "No overall feedback.",
      });

      // Optional delay to avoid Gemini rate-limiting
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // Save feedback to DB
    await Feedback.create({
      submissionId: submission._id,
      evaluations,
    });

    return res
      .status(201)
      .json({ message: "Assignment submitted and evaluated successfully." });
  } catch (err) {
    console.error("Error in /submit-assignment:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = submissionRouter;
