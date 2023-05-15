const { Schema, model } = require("mongoose");
require("./User.model");

let chatRoomSchema = new Schema({
  participants: [
    {
      ref: "user",
      type: Schema.Types.ObjectId,
    },
  ],
});

let chatRoomModel = model("chatroom", chatRoomSchema);
module.exports = chatRoomModel;
