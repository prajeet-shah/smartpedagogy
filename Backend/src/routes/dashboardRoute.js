const express = require("express");
const dashboardRouter = express.Router();

const Feedback = require("../schema/feedback");
const Auth = require("../middleware/auth");
const AssignmentSubmission = require("../schema/assignmentSubmission");

dashboardRouter.get("/student-performance", Auth, async (req, res) => {
  try {
    const studentId = req.user._id;

    // Step 1: Get all submissions by this student
    const submissions = await AssignmentSubmission.find({ studentId });
    const submissionIds = submissions.map((sub) => sub._id);

    // Step 2: Find all feedbacks related to those submissions
    const feedbacks = await Feedback.find({
      submissionId: { $in: submissionIds },
    });

    if (feedbacks.length === 0) {
      return res
        .status(200)
        .json({ message: "No feedback found", average: null });
    }

    const totals = {
      accuracy: 0,
      completeness: 0,
      creativity: 0,
      reasoning: 0,
      writingQuality: 0,
      instructionFollowing: 0,
      averageScore: 0,
    };

    let evaluationCount = 0;

    // Step 3: Aggregate all individual evaluations
    feedbacks.forEach((feedbackDoc) => {
      feedbackDoc.evaluations.forEach((evaluation) => {
        const fb = evaluation.feedback;
        totals.accuracy += fb.accuracy || 0;
        totals.completeness += fb.completeness || 0;
        totals.creativity += fb.creativity || 0;
        totals.reasoning += fb.reasoning || 0;
        totals.writingQuality += fb.writingQuality || 0;
        totals.instructionFollowing += fb.instructionFollowing || 0;
        totals.averageScore += fb.averageScore || 0;
        evaluationCount++;
      });
    });

    // Step 4: Compute average from totals
    const average = Object.fromEntries(
      Object.entries(totals).map(([key, value]) => [
        key,
        Math.round((value / evaluationCount) * 10) / 10,
      ])
    );

    res.status(200).json({ average });
  } catch (err) {
    console.error("Error fetching dashboard overview:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = dashboardRouter;
