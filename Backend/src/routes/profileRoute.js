const express = require("express");
const Auth = require("../middleware/auth");
const User = require("../schema/user");

const profileRouter = express.Router();

// GET /profile
profileRouter.get("/profile", Auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Profile View Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /profile/update
profileRouter.patch("/profile/update", Auth, async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = email;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Profile Update Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = profileRouter;
