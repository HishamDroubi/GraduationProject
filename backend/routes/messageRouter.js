let express = require("express");
let bcrypt = require("bcrypt");
let body_parser = require("body-parser");
let mongoose = require("mongoose");
let asyncHandler = require("express-async-handler");
let CryptoJS = require("crypto-js");

const Message = require("../models/message");
const { protect } = require("../middleware/authMiddleware");

//define messageRouter
let messageRouter = express.Router();

messageRouter.post(
  "/create",
  protect,
  asyncHandler(async (req, res) => {
    let value = req.body.value;
    let senderId = req.currentUser._id;
    let receiverId = req.body.receiverId;

    let key = "CP-PTUK";

    // Encrypt
    let ciphertext = CryptoJS.AES.encrypt(value, key).toString();

    let newMessage = new Message({
      value: ciphertext,
      sender: senderId,
      receiver: receiverId,
    });

    let saveRespone = await newMessage.save();
    res.json(saveRespone);
  })
);

messageRouter.get(
  "/singleMessage",
  protect,
  asyncHandler(async (req, res) => {
    let messageId = req.body.messageId;
    let fetchedMessage = await Message.findById(messageId);
    let value = fetchedMessage["value"];

    let key = "CP-PTUK";
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(value, key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    fetchedMessage["value"] = originalText;

    res.json(fetchedMessage);
  })
);

messageRouter.get(
  "/chat",
  protect,
  asyncHandler(async (req, res) => {
    let firstUser = req.currentUser._id;
    let secondUser = req.body.otherUser;

    let key = "CP-PTUK";

    let messages = await Message.find({
      $or: [
        {
          $and: [{ sender: firstUser }, { receiver: secondUser }],
        },
        {
          $and: [{ sender: secondUser }, { receiver: firstUser }],
        },
      ],
    }).sort({ createdAt: -1 });

    messages.forEach((message) => {
      // Decrypt
      let bytes = CryptoJS.AES.decrypt(message["value"], key);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      message["value"] = originalText;
    });

    res.json(messages);
  })
);

module.exports = messageRouter;
