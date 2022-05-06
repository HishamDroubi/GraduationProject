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
  }).sort({ createdAt: -1 });
  //console.log(messages);
  return messages;
};

//define messageRouter
let messageRouter = express.Router();

messageRouter.post(
  "/create",
  protect,
  asyncHandler(async (req, res) => {
    let value = req.body.value;
    let senderId = req.currentUser._id;
    let receiverId = req.body.receiverId;

    let key = serverConstants.hash_key;

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

    let key = serverConstants.hash_key;
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

    let messages = await getMessages(firstUser, secondUser);

    let key = serverConstants.hash_key;

    messages.forEach((message) => {
      // Decrypt
      let bytes = CryptoJS.AES.decrypt(message["value"], key);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      message["value"] = originalText;
    });

    res.json(messages);
  })
);

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
      console.log(messages);
      if (messages.length > 0) contacts.push(user);
      counter++;
      if (counter == users.length) {
        res.json(contacts);
      }
    });
  })
);

module.exports = messageRouter;
