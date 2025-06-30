const express = require("express");
const { adminAuth } = require("../middleWare/auth");
const requestRouter = express.Router();
const ConnectionRequestModel = require("../model/connectionRequest");
const User = require("../model/user");

requestRouter.post("/send/:status/:toUserId", adminAuth, async (req, res) => {
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;
  try {
    if (!fromUserId || !toUserId) {
      return res.status(400).json({ message: "invalid request" });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({
        message: "User Not Found",
        User,
      });
    }

    if (fromUserId.toString() === toUserId.toString()) {
      return res.status(400).json("Invalid user");
    }
    const requestByUser = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    let sendStatus = ["ignored", "interested"];
    if (!sendStatus.includes(status)) {
      return res.status(400).json("Invalid Status");
    }

    if (requestByUser) {
      return res.send("Connection Request Already Exists");
    }

    const connectionRequest = await new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });
    await connectionRequest.save();
    res
      .status(200)
      .json({ message: "send connection request success", connectionRequest });
  } catch (error) {
    res.send("Some Error");
  }
});

requestRouter.post("/review/:status/:requestedId", adminAuth, async (req, res) => {
    
    //validate the status
    //status == interested
    //validate the requestedId
    // toUserId == loged in user

    try {
      const status =req.params.status;
      const requestId = req.params.requestedId;
      const toUserId = req.user._id;
      if (!status || !requestId) {
        return res.status(400).json({ message: "Invalid request" });
      }

      const connectionRequest = await ConnectionRequestModel.findOne({_id: requestId, toUserId, status: "interested"});
      if (!connectionRequest) {
        return res.status(404).json({ message: "Connection Request Not Found" });
      }

      if (status === "accepted") {
        connectionRequest.status = "accepted";
        await connectionRequest.save();
        return res.status(200).json({
          message: "Connection Request Reviewed",
          connectionRequest: connectionRequest,
        })
      }
    
      if (status === "rejected") {
        connectionRequest.status = "rejected";
        await connectionRequest.save();
        return res.status(200).json({
          message: "Connection Request Reviewed",
          connectionRequest: connectionRequest,
        })
      }else{
        return res.status(400).json({ message: "Invalid Status" });
      }
    
    } catch (error) {
      console.error("Error in review request:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = {
  requestRouter,
};
