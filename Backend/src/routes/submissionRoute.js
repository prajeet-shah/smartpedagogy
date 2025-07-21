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

    const existing = await AssignmentSubmission.findOne({
      studentId: req.user._id,
      assignmentId,
    });
    if (existing) {
      return res.status(409).json({ message: "Assignment already submitted." });
    }

    const submission = await AssignmentSubmission.create({
      studentId: req.user._id,
      assignmentId,
      fileBase64,
      comments,
    });

    const assignment = await Assignment.findById(
      assignmentId
    );
    //console.log(assignment);
    const teacherQuestions = await extractTeacherQuestions(assignment);
    console.log("teacher given questions");
    console.log(teacherQuestions);
    const studentQnA = await extractQnA(fileBase64);
    console.log("students provided questions")
    console.log(studentQnA);
    const completenessScore =
      Number(calculateCompleteness(teacherQuestions, studentQnA)) || 0;
    console.log(completenessScore);


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

  // optional: delay to avoid hitting rate limits
  await new Promise((resolve) => setTimeout(resolve, 1500)); // 500ms delay
}


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
