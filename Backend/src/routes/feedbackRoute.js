const express = require("express");
const feedbackRouter = express.Router();
const Feedback = require("../schema/feedback");
const Assignment = require("../schema/assignment");
const AssignmentSubmission = require("../schema/assignmentSubmission");
const Auth = require("../middleware/auth");

feedbackRouter.get("/student-feedbacks", Auth, async (req, res) => {
  try {
    const studentId = req.user._id;

    const submissions = await AssignmentSubmission.find({ studentId });
    const submissionIds = submissions.map((s) => s._id);

    const feedbacks = await Feedback.find({
      submissionId: { $in: submissionIds },
    });

    const result = await Promise.all(
      feedbacks.map(async (fb) => {
        const submission = submissions.find(
          (s) => s._id.toString() === fb.submissionId.toString()
        );
        const assignment = await Assignment.findById(submission.assignmentId);

        return {
          assignmentTitle: assignment.title,
          assignmentId: assignment._id,
          evaluations: fb.evaluations,
          overallFeedback: fb.overallFeedback,
          submittedAt: submission.createdAt,
        };
      })
    );

    res.status(200).json({ feedbacks: result });
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = feedbackRouter;
