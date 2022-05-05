let mongoose = require("mongoose");
let express = require("express");
const { errorHandler } = require("./middleware/error");

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
const path = require("path");
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
//server.use("/uploads", express.static(path.join(__dirname, "/uploads")));
server.use('/uploads', express.static('uploads'));
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
