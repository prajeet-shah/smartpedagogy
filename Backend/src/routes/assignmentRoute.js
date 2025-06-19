const express = require("express");
const Assignment = require("../schema/assignment");
const Auth = require("../middleware/auth");
const assignmentRouter = express.Router();

// POST /api/assignments — Create an assignment
assignmentRouter.post("/add-assignment", Auth, async (req, res) => {
  try {
    const { title, description, file, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAssignment = new Assignment({
      title,
      description,
      file,
      dueDate,
      createdBy: req.user._id,
    });

    await newAssignment.save();
    res
      .status(201)
      .json({ message: "Assignment created", assignment: newAssignment });
  } catch (err) {
    console.error("Create Assignment Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/assignments — Get all assignments
assignmentRouter.get("/all-assignment", Auth, async (req, res) => {
  try {
    const id = req.user._id;
    const assignments = await Assignment.find({ createdBy: id }).populate(
      "createdBy",
      "name email role"
    );
    res.status(200).json(assignments);
  } catch (err) {
    console.error("Fetch Assignments Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/assignments/:id — Get a specific assignment
assignmentRouter.get("assignment/:id", Auth, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    res.status(200).json(assignment);
  } catch (err) {
    console.error("Fetch Assignment Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/assignments/:id — Delete assignment
assignmentRouter.delete("delete-assignment/:id", Auth, async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    res.status(200).json({ message: "Assignment deleted" });
  } catch (err) {
    console.error("Delete Assignment Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = assignmentRouter;
