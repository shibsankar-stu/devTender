const mongoose = require("mongoose");
const User = require("./user");

const connectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      require: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      require: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{Value} is incorrect status code`,
      },
    },
  },
  { timestamps: true }
);
const ConnectionRequestModel = mongoose.model("ConnectionRequestModel", connectionRequestSchema)

module.exports = ConnectionRequestModel