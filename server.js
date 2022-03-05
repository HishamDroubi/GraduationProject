let mongoose = require("mongoose");
let express = require("express");

//models
let User = require("./models/user");
let Problem = require("./models/problem");
let Group = require("./models/group");
let request = require("./models/request");

//create the server
let server = express();

//Routers
let userRouter = require("./routes/userRouter.js");
let authRouter = require("./routes/authRouter.js");
const Level = require("./models/level");

//medllewaress
server.use("/user", userRouter);
server.use("/auth", authRouter);

//start server
const port = 3004;
server.listen(port);

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
});
