let express = require("express");
let bcrypt = require("bcrypt");
let body_parser = require("body-parser");
let mongoose = require("mongoose");
let asyncHandler = require("express-async-handler");
let CryptoJS = require("crypto-js");

const Message = require("../models/message");
const User = require("../models/user");
const { protect } = require("../middleware/authMiddleware");
const serverConstants = require("../serverConstants.js");

//define messageRouter
let messageRouter = express.Router();

messageRouter.post(
  "/create",
  protect,
  asyncHandler(async (req, res) => {
    let val = req.body.value;
    let senderId = req.currentUser._id;
    let { receiverName } = req.body;
    let receiver = await User.findOne({ userName: receiverName });
    let key = serverConstants.hash_key;
    // Encrypt
    let value = CryptoJS.AES.encrypt(val, key).toString();
    let newMessage = new Message({
      value,
      sender: senderId,
      receiver: receiver._id,
    });
    let saveRespone = await newMessage.save();

    var bytes = CryptoJS.AES.decrypt(saveRespone["value"], key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    saveRespone["value"] = originalText;
    res.status(200).json(saveRespone);
  })
);

messageRouter.get(
  "/singleMessage",
  protect,
  asyncHandler(async (req, res) => {
    let messageId = req.body.messageId;
    let fetchedMessage = await Message.findById(messageId);
    let value = fetchedMessage["value"];

    let key = serverConstants.hash_key;
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(value, key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    fetchedMessage["value"] = originalText;

    res.json(fetchedMessage);
  })
);

messageRouter.get(
  "/chat/:secondUser",
  protect,
  asyncHandler(async (req, res) => {
    let firstUser = req.currentUser._id;
    let { secondUser } = req.params;
    const otherUser = await User.find({ userName: secondUser });
    let messages = await getMessages(firstUser, otherUser);

    let key = serverConstants.hash_key;

    messages.forEach((message) => {
      // Decrypt
      let bytes = CryptoJS.AES.decrypt(message["value"], key);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      message["value"] = originalText;
    });

    res.status(200).json(messages);
  })
);

//helper function to find the messages between two users
let getMessages = async function (firstUser, secondUser) {
  let messages = await Message.find({
    /*
    the query should be like this 
      if you find a message with sender as first and reciever as second or vice versathen it is between them
      and then return this messages ordered by the message date
    */
    $or: [
      {
        $and: [{ sender: firstUser }, { receiver: secondUser }],
      },
      {
        $and: [{ sender: secondUser }, { receiver: firstUser }],
      },
    ],
  }).populate("sender");
  return messages;
};

messageRouter.get(
  "/contacts",
  protect,
  asyncHandler(async (req, res) => {
    let userId = req.currentUser._id;
    let users = await User.find();

    //filter the users to find which user the current user has a messages with him
    let contacts = [];
    let counter = 0;
    users.forEach(async (user) => {
      let messages = await getMessages(userId, user["_id"]);
      if (messages.length > 0) {
        let key = serverConstants.hash_key;
        // Decrypt
        var bytes = CryptoJS.AES.decrypt(
          messages[messages.length - 1]["value"],
          key
        );
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        messages[messages.length - 1]["value"] = originalText;
        contacts.push({
          user,
          latestMessage: messages[messages.length - 1],
        });
      }
      counter++;
      if (counter == users.length) {
        res.status(200).json(contacts);
      }
    });
  })
);

module.exports = messageRouter;
