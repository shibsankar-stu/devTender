const express = require("express")
const User = require("../model/user")
const { validateUserInput } = require("../utils/validatuon");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const authRouter = express.Router()
authRouter.post("/singUp", async (req, res) => {
  try {
    const { firstName, lastName, email, password, age, bio, gender } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,  
      email,
      age,
      bio,
      gender,
      password: hashedPassword,
    });
    validateUserInput(req);
    await user.save();
    res.send("User Singup Successful");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.get("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const userHashePassword = await bcrypt.compare(password, user.password);
      if (!userHashePassword) {
        throw new Error("Invalid password");
      } else {
        const token = jwt.sign({_id: user._id}, "shib@12345", { expiresIn: "7h" } );
        res.cookie("token", token)
        res.status(200).json({
          message: "Login Successful",
          user: user,
        });
      }
    } catch (error) {
      res.status(400).json(error.message);
    }
  });

authRouter.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.send("Logged Out");
})

module.exports = {
    authRouter,
}