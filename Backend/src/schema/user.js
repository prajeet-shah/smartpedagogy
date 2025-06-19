const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["Teacher", "Student"],
        message: "{VALUE} is not a valid role",
      },
      required: true,
    },
    subject: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          // 'this' refers to the document
          if (this.role === "Teacher") {
            return value != null && value.length > 0;
          }
          return true; // if not a Teacher, subject is not required
        },
        message: "Subject is required for users with the role 'Teacher'",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
