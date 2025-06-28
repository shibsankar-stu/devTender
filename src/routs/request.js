const express = require("express");
const { adminAuth } = require("../middleWare/auth");
const requestRouter = express.Router();
const ConnectionRequestModel = require("../model/connectionRequest");

requestRouter.post("/send/:status/:toUserId", adminAuth, async (req, res) => {
  const fromUserId = req.user;
  const toUserId = req.params.toUserId;
  const status = req.params.status;
  try {
    const connectionRequest = await new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });
    connectionRequest.save();
    res.send("send connection request success");
    
  } catch (error) {
    res.send("Some Error");
  }
});

module.exports = {
  requestRouter,
};
