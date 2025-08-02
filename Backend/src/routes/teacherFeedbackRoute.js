const express = require("express");
const mongoose = require("mongoose");
const Assignment = require("../schema/assignment");
const Feedback = require("../schema/feedback");
const AssignmentSubmission = require("../schema/assignmentSubmission");
const User = require("../schema/user");
const teacherFeedbackInsightsRouter = express.Router();

teacherFeedbackInsightsRouter.get(
  "/feedback-insights/:teacherId",
  async (req, res) => {
    try {
      const { teacherId } = req.params;
      console.log(teacherId);
      if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid teacher ID" });
      }

      const teacher = await User.findById(teacherId);
      console.log(teacher);
      if (!teacher || teacher.role !== "Teacher") {
        return res
          .status(404)
          .json({
            success: false,
            message: "Teacher not found or invalid role",
          });
      }

      const assignments = await Assignment.find({ createdBy: teacherId });
      const insights = [];

      for (const assignment of assignments) {
        const submissions = await AssignmentSubmission.find({
          assignmentId: assignment._id,
        }).populate("studentId", "name email");

        const details = [];

        for (const sub of submissions) {
          const feedback = await Feedback.findOne({ submissionId: sub._id });

          if (feedback && feedback.evaluations.length > 0) {
            let total = {
              accuracy: 0,
              completeness: 0,
              creativity: 0,
              reasoning: 0,
              writingQuality: 0,
              instructionFollowing: 0,
            };
            const count = feedback.evaluations.length;

            feedback.evaluations.forEach((evalItem) => {
              total.accuracy += evalItem.feedback.accuracy || 0;
              total.completeness += evalItem.feedback.completeness || 0;
              total.creativity += evalItem.feedback.creativity || 0;
              total.reasoning += evalItem.feedback.reasoning || 0;
              total.writingQuality += evalItem.feedback.writingQuality || 0;
              total.instructionFollowing +=
                evalItem.feedback.instructionFollowing || 0;
            });

            const average = {
              accuracy: (total.accuracy / count).toFixed(2) + "%",
              completeness: (total.completeness / count).toFixed(2) + "%",
              creativity: (total.creativity / count).toFixed(2) + "%",
              reasoning: (total.reasoning / count).toFixed(2) + "%",
              writingQuality: (total.writingQuality / count).toFixed(2) + "%",
              instructionFollowing:
                (total.instructionFollowing / count).toFixed(2) + "%",
            };

            const overall = (
              (total.accuracy +
                total.completeness +
                total.creativity +
                total.reasoning +
                total.writingQuality +
                total.instructionFollowing) /
              (count * 6)
            ).toFixed(2);

            details.push({
              studentId: sub.studentId._id,
              studentName: sub.studentId.name,
              studentEmail: sub.studentId.email,
              submittedAt: sub.createdAt,
              fileBase64: sub.fileBase64,
              overallScore: overall + "%",
              scores: average,
              comments: sub.comments,
              overallFeedback:
                feedback.overallFeedback || "No overall feedback",
            });
          }
        }

        let totalAvg = {
          accuracy: 0,
          completeness: 0,
          creativity: 0,
          reasoning: 0,
          writingQuality: 0,
          instructionFollowing: 0,
        };

        const valid = details.filter((d) => d.overallScore !== null);
        valid.forEach((v) => {
          Object.keys(totalAvg).forEach((key) => {
            totalAvg[key] += parseFloat(v.scores[key].replace("%", ""));
          });
        });

        const avgScores = {};
        Object.keys(totalAvg).forEach((key) => {
          avgScores[key] =
            valid.length > 0
              ? (totalAvg[key] / valid.length).toFixed(2) + "%"
              : null;
        });

        insights.push({
          id: assignment._id,
          title: assignment.title,
          description: assignment.description,
          dueDate: assignment.dueDate,
          createdAt: assignment.createdAt,
          submissionsCount: details.length,
          avgScores,
          submissions: details,
        });
      }

      res
        .status(200)
        .json({ success: true, data: { teacherId, assignments: insights } });
    } catch (err) {
      console.error("Error in teacher feedback insights:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

module.exports = teacherFeedbackInsightsRouter;
