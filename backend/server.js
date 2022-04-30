let mongoose = require("mongoose");
let express = require("express");
const { errorHandler } = require("./middleware/error");
const { test } = require("./middleware/test");
//models
let User = require("./models/user");
let Problem = require("./models/problem");
let Group = require("./models/group");
let Level = require("./models/level");
let Request = require("./models/request");
let logger = require("./logger.js");
const CryptoJS = require("crypto-js");
//create the server
let server = express();

//Routers
let userRouter = require("./routes/userRouter.js");
let authRouter = require("./routes/authRouter.js");
let groupRouter = require("./routes/groupRouter.js");
let levelRouter = require("./routes/levelRouter.js");
let problemRouter = require("./routes/problemRouter.js");
let messageRouter = require("./routes/messageRouter.js");
const Message = require("./models/message");

//medllewaress
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use("/user", userRouter);
server.use("/auth", authRouter);

server.all("*", (req, res, next) => {
  let objToLog = {
    Path: req.path,
    Method: req.method,
    Body: req.body,
    timestamp: Date.now(),
  };
  logger.info(objToLog);
  return next();
});

server.use("/group", groupRouter);
server.use("/level", levelRouter);
server.use("/problem", problemRouter);
server.use("/message", messageRouter);
server.use(errorHandler);

//start server
const port = 3004;
server.listen(port, () => {
  logger.info("server is lestining on port " + port);
});

//User and Password For MongoDB
let username = "hisham";
let password = "hisham1234";

//connect to mongoDB
const dbUrI =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@cluster0.fhqit.mongodb.net/GraduationProject?retryWrites=true&w=majority";

//for testing
//mongodb+srv://hisham:hisham1234@cluster0.fhqit.mongodb.net/GraduationProject?retryWrites=true&w=majority

mongoose.connect(dbUrI).then(() => {
  console.log("successfully connected");
  logger.info("successfully connected");
});

// let key = "CP-PTUK";

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt("my message", key).toString();

// console.log(ciphertext);

// // Decrypt
// var bytes = CryptoJS.AES.decrypt(ciphertext, key);
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log(originalText); // 'my message'

let fun = async () => {
  let newMessage = new Message({
    value: "U2FsdGVkX19raKORcQiHiinfDJJFRH1pK4Za7CnC3MY=",
    sender: "622b4880e970d427177c8fdb",
    receiver: "622b48e2e970d427177c8fdf",
  });

  //await newMessage.save();

  //let fetchedMessage = await Message.findById("626db155cb29dce384f97a69");
  // console.log(fetchedMessage);
};
fun();
