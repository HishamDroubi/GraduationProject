let express = require("express");
let body_parser = require("body-parser");
let fetch = require("node-fetch");
let asyncHandler = require("express-async-handler");
let mongoose = require("mongoose");
const axios = require("axios");
let User = require("../models/user");
let Group = require("../models/group");
let Request = require("../models/request");
const { protect } = require("../middleware/authMiddleware");
const Level = require("../models/level");

let userRouter = express.Router();

userRouter.get("/:userName", async (req, res) => {
  const { userName } = req.params;
  const data = await User.findOne({ userName: userName }).populate("level");

  if (!data) {
    return res.json({ message: "userName not Found" });
  } else {
    return res.json(data);
  }
});

userRouter.get("/codeforcesInfo/:userName", async (req, res) => {
  const { userName } = req.params;
  const data = await User.findOne({ userName: userName });

  if (!data) {
    res.status(400).json({ er: "errrorr " });
  }

  const handle = data.handle;
  const codeforcesInfo = await axios.get(
    "https://codeforces.com/api/user.info?handles=" + handle
  );

  if (!codeforcesInfo) {
    res.status(400);
    throw new Error("userName not Found");
  }
  res.status(200).json(codeforcesInfo.data.result[0]);
});

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
