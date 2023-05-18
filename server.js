const app = require("./app");
const { Server } = require("socket.io");
const MessageModel = require("./models/Message.Model");
const PORT = process.env.PORT || 5005;
let myServer = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
const io = new Server(myServer, {
  cors: {
    origin: "*",
  },
});
// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("join_chat", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    const {
      content: { sender, message },
      chatRoomId,
    } = data;
    let newMessage = {
      sender: sender._id,
      message: message,
      chatRoomId: chatRoomId,
    };

    MessageModel.create(newMessage).then(async () => {
      let allMessages = await MessageModel.find({
        chatRoomId: chatId,
      }).populate("sender");
      socket.to(data.chatId).emit("receive_message", allMessages);
    });
  });
});
