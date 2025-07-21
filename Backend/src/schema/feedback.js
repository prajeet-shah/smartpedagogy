const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssignmentSubmission",
      required: true,
    },
    evaluations: [
      {
        question: String,
        answer: String,
        feedback: {
          accuracy: Number,
          completeness: Number,
          creativity: Number,
          reasoning: Number,
          writingQuality: Number,
          instructionFollowing: Number,
          overallComment: String,
        },
      },
    ],
    overallFeedback: {
      type: String,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
