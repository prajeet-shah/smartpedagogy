const express = require("express");
const submissionRouter = express.Router();
const Auth = require("../middleware/auth");
const AssignmentSubmission = require("../schema/assignmentSubmission");

const Feedback = require("../schema/feedback");
const extractQnA = require("../utils/extractQnA");
const evaluateWithGemini = require("../utils/geminiEval");

submissionRouter.post("/submit-assignment", Auth, async (req, res) => {
  try {
    const { assignmentId, fileBase64, comments } = req.body;

    // Prevent duplicate
    const existing = await AssignmentSubmission.findOne({
      studentId: req.user._id,
      assignmentId,
    });
    if (existing) return res.status(409).json({ message: "Already submitted." });

    // Store submission
    const submission = await AssignmentSubmission.create({
      studentId: req.user._id,
      assignmentId,
      fileBase64,
      comments,
    });

    // Step 1: Decode & Extract QnA
    const qnaList = await extractQnA(fileBase64); // returns [{ question, answer }, ...]
    console.log(qnaList);
    // Step 2: Evaluate with Gemini
    const evaluations = await Promise.all(
      qnaList.map(async (item) => {
        const feedback = await evaluateWithGemini(item.question, item.answer);
        return {
          question: item.question,
          answer: item.answer,
          feedback,
        };
      })
    );

    // Step 3: Store feedback
    await Feedback.create({
      submissionId: submission._id,
      evaluations,
    });

    return res.status(201).json({ message: "Assignment submitted and evaluated successfully." });
  } catch (err) {
    console.error("Error in /submit-assignment:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});


module.exports = submissionRouter;