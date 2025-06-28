const express = require("express");
const profileRouter = express.Router();
const { adminAuth } = require("../middleWare/auth");
const User = require("../model/user");
profileRouter.get("/view", adminAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

profileRouter.patch("/edit", adminAuth, async (req, res) => {
  try {
    const user = req.user;
    const { firstName, lastName, age, bio, skills, image } = req.body;
    const updatedUser = {
      firstName,
      lastName,
      age,
      bio,
      skills,
      image,
    };
    const updated = await User.findByIdAndUpdate(user._id, updatedUser, {
      new: true,
    });
    res.json({
      message: "Profile updated successfully",
      user: updated,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = { profileRouter };
