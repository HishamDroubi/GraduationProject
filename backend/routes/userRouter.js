let express = require("express");
let body_parser = require("body-parser");
let fetch = require("node-fetch");
let asyncHandler = require("express-async-handler");
let mongoose = require("mongoose");

let User = require("../models/user");
let Group = require("../models/group");
let Request = require("../models/request");
const { protect } = require("../middleware/authMiddleware");

let userRouter = express.Router();

userRouter.use(body_parser.urlencoded({ extended: false }));
userRouter.use(body_parser.json());

//Delete User =>Admin
userRouter.delete(
  "/deleteUser",
  asyncHandler(async (req, res) => {
    let userId = req.body.userId;
    console.log(userId);

    if (!mongoose.isValidObjectId(userId)) {
      res.status(403);
      throw new Error("userId Is not valid");
    }

    let response = await User.deleteOne({ _id: userId });
    res.send(JSON.stringify(response));
  })
);

//change handle
userRouter.put(
  "/changeHandle",
  protect,
  asyncHandler(async (req, res) => {
    let userId = req.currentUser.id;
    let handle = req.body.handle;

    if (!mongoose.isValidObjectId(userId)) {
      res.status(403);
      throw new Error("userId Is not valid");
    }

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
  })
);

module.exports = userRouter;
