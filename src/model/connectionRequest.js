const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
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