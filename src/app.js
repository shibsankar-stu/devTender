const express = require("express");
const connectDB = require("./config/connectDB");
const User = require("./model/user");
const cookieParser = require("cookie-parser");
const {authRouter} = require("./routs/auth")
const {profileRouter} = require("./routs/profile");
const { requestRouter } = require("./routs/request");


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

//All Routes
app.use("/", authRouter)
app.use("/profile", profileRouter)
app.use("/request", requestRouter)


connectDB().then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });
});
