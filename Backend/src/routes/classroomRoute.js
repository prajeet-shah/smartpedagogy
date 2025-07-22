const express = require("express");
const classroomRouter = express.Router();
const Auth = require("../middleware/auth");
const Assignment = require("../schema/assignment");
const AssignmentSubmission = require("../schema/assignmentSubmission");
const User = require("../schema/user"); // Assuming you store student names here

// Get all submitted assignments for the teacher's created assignments
classroomRouter.get("/classroom-overview", Auth, async (req, res) => {
  try {
    const teacherId = req.user._id;

    // Step 1: Get all assignments created by the teacher
    const assignments = await Assignment.find({ createdBy: teacherId });

    const assignmentIds = assignments.map((a) => a._id);

    // Step 2: Find all submissions made to those assignments
    const submissions = await AssignmentSubmission.find({
      assignmentId: { $in: assignmentIds },
    })
      .populate("studentId", "name email") // Assuming name/email exists in user
      .populate("assignmentId", "title");

    const formatted = submissions.map((sub) => ({
      studentName: sub.studentId?.name || "N/A",
      assignmentTitle: sub.assignmentId?.title || "N/A",
      submittedAt: sub.createdAt,
      fileBase64: sub.fileBase64,
      comments: sub.comments || "",
    }));

    return res.status(200).json({ submissions: formatted });
  } catch (err) {
    console.error("Error in /classroom-overview:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = classroomRouter;
