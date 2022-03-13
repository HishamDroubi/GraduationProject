let express = require("express");
let body_parser = require("body-parser");
let fetch = require("node-fetch");

let User = require("../models/user");
let Group = require("../models/group");
let Request = require("../models/request");
const session = require("express-session");
const req = require("express/lib/request");

let userRouter = express.Router();

userRouter.use(body_parser.urlencoded({ extended: false }));
userRouter.use(body_parser.json());

//Delete User =>Admin
userRouter.delete("/deleteUser", async (req, res) => {
  let userId = req.body.userId;

  let response = await User.deleteOne({ _id: userId });
  res.send(JSON.stringify("user deleted successfully " + response));
});

//change handle
userRouter.put("/changeHandle", async (req, res) => {
  try {
    let userId = session.currentUser.id;
    let handle = req.body.handle;

    //chaeck if the new handle is existed on codeforces
    let result = await fetch(
      "https://codeforces.com/api/user.info?handles=" + handle
    );

    let codeforcesUser = await result.json();

    if (codeforcesUser["status"] == "FAILED")
      throw new Error("Coddeforces Handle does not exist");

    let user = await User.findById(userId);
    user.handle = handle;
    let response = await result.save();
    res.send(JSON.stringify("handle has changed successfully " + response));
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = userRouter;
