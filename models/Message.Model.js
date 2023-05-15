const { Schema, model } = require("mongoose");
require("./User.model");
require("./chatRoom.model");

let messageSchema = new Schema(
  {
    sender: {
      ref: "user",
      type: Schema.Types.ObjectId,
    },
    message: String,
    chatRoomId: {
      ref: "chatroom",
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

let MessageModel = model("message", messageSchema);

module.exports = MessageModel;
