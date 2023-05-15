const express = require("express");
const router = express.Router();
const chatRoom = require("../models/chatRoom.model");
const Message = require("../models/Message.Model");

//Create a chatroom route

router.post("/chatroom", (req, res, next) => {
  const { participants } = req.body;
  chatRoom
    .findOne({ participants: { $all: participants } })
    .then((value) => {
      if (value) {
        res.json(value);
      } else {
        chatRoom.create({ participants }).then((value) => {
          res.json(value);
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

//get all messages

router.get("/chatroom/");

module.exports = router;
