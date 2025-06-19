const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    file: {
      type: String, // base64 string
      required: [true, "Assignment file is required"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming you have a User model
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
