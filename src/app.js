const express = require("express");
const connectDB = require("./config/connectDB");
const User = require("./model/user");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await User.findOne({ email: userEmail });
    if (user === "undefined" || user === null || user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user === "undefined" || user === null || user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.patch("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (user === "undefined" || user === null || user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find();
    res.send(feed);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.post("/singUp", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Singup Successful");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

connectDB().then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });
});
