let express = require("express");
let asyncHandler = require("express-async-handler");
let CryptoJS = require("crypto-js");
const Chat = require("../models/chat");
const Message = require("../models/message");
const User = require("../models/user");
const { protect } = require("../middleware/authMiddleware");
<<<<<<< HEAD
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
  })
    .sort({ createdAt: -1 })
    .populate("sender");
  return messages;
};
=======
const { hash_key } = require("../serverConstants.js");
>>>>>>> origin

//define messageRouter
let messageRouter = express.Router();

<<<<<<< HEAD
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

=======
// get all messsages for the selected chat
>>>>>>> origin
messageRouter.get(
  "/:userName",
  protect,
  asyncHandler(async (req, res) => {
<<<<<<< HEAD
    let firstUser = req.currentUser._id;
    let secondUser = req.body.otherUser;

    let messages = await getMessages(firstUser, secondUser);

    let key = serverConstants.hash_key;

=======
    const { userName } = req.params;
    const otherUser = await User.findOne({ userName });
    const existChat = await Chat.findOne({
      $and: [
        { users: { $elemMatch: { $eq: req.currentUser._id } } },
        { users: { $elemMatch: { $eq: otherUser._id } } },
      ],
    });
    if (!existChat) {
      res.status(400);
      throw new Error("chat not found");
    }
    let messages = await Message.find({ chat: existChat._id })
      .populate("sender")
      .populate("value");
>>>>>>> origin
    messages.forEach((message) => {
      // Decrypt
      let bytes = CryptoJS.AES.decrypt(message["value"], hash_key);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      message["value"] = originalText;
    });
    res.status(200).json(messages);
  })
);

messageRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    console.log(req.body);
    let { value, chatId } = req.body;

    if (!value || !chatId) {
      res.status(400);
      throw new Error("Invalid data passed");
    }
    try {
      const val = value;
      value = CryptoJS.AES.encrypt(value, hash_key).toString();
      let newMessage = {
        sender: req.currentUser._id,
        value,
        chat: chatId,
      };

      let message = await Message.create(newMessage);
     // console.log("messsage", message);
      message = await message.populate("sender");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
      });
      await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
      message["value"] = val;
      res.status(200).json(message);
    } catch (e) {
      console.log(e);
    }
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
      if (messages.length > 0) contacts.push(user);
      counter++;
      if (counter == users.length) {
        res.json(contacts);
      }
    });
  })
);

module.exports = messageRouter;
