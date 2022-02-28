let mongoose = require("mongoose");
let User = require("./models/user");
let Problem = require("./models/problem");
let Group = require("./models/group");
let Reques = require("./models/request");

//User and Password
let username = "ibraheem";
let password = "ibraheem1234";

//connect to mongoDB
const dbUrI =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@cluster0.fhqit.mongodb.net/GraduationProject?retryWrites=true&w=majority";

mongoose.connect(dbUrI).then(() => {
  console.log("successfully connected");
});
