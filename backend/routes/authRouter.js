let express = require("express");
let bcrypt = require("bcrypt");
let fetch = require("node-fetch");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const serverConstants = require("../serverConstants.js");

let User = require("../models/user");

//define authRouter
let authRouter = express.Router();

//User SignUp
authRouter.post(
  "/signUp",
  asyncHandler(async (req, res) => {
    let { userName, email, password, handle, phone } = req.body;
    if (!userName || !email || !password || !handle) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    console.log(userName, email, password, handle, phone);
    let result = await fetch(
      "https://codeforces.com/api/user.info?handles=" + handle
    );

    let codeforcesUser = await result.json();

    console.log(codeforcesUser);
    if (codeforcesUser["status"] == "FAILED") {
      res.status(400);
      throw new Error("Codeforces handle is not correct");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }
    //hashing password before store it in DB

    let hashedPassword = await bcrypt.hashSync(
      password,
      serverConstants.bcryptRounds
    );

    //Create User Object
    let newUser = new User({
      userName: userName,
      email: email,
      handle: handle,
      phone: phone,
      password: hashedPassword,
      level: "622345c1373a2b782b593f62",
      role: "normal",
    });

    console.log(codeforcesUser);
    // Save in DB
    let response = await newUser.save();

    res.status(200).json({
      userName: response.userName,
      token: generateToken(response._id),
      role: response.role,
      email: response.email,
      handle: response.handle,
    });
  })
);

authRouter.post(
  "/signIn",
  asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    let fitchedUser = await User.findOne({ email: email });
    if (fitchedUser == undefined) {
      res.status(400);
      throw new Error("The Email Or The Password Is Incorrect");
    }
    let fitchedPassword = fitchedUser["password"];

    let login = await bcrypt.compareSync(password, fitchedPassword);
    if (login) {
      res.status(200).json({
        userName: fitchedUser.userName,
        token: generateToken(fitchedUser._id),
        role: fitchedUser.role,
        email: fitchedUser.email,
        handle: fitchedUser.handle,
      });
    } else {
      res.status(400);
      throw new Error("The Email Or The Password Is Incorrect");
    }
  })
);

//change password
authRouter.put("/changePassword", protect, async (req, res) => {
  let { curPass, newPass, rePass } = req.body;

  if (newPass != rePass) {
    res.status(400);
    throw new Error("new Password does not match the RePassword");
  }
  let userId = req.currentUser["_id"];

  let fitchedUser = await User.findById(userId);
  fitchedUser.password = await bcrypt.hashSync(
    newPass,
    serverConstants.bcryptRounds
  );

  let response = await fitchedUser.save();
  res.status(200).json(response);
});

const generateToken = (id) => {
  return jwt.sign({ id }, "abc123", {
    expiresIn: "30d",
  });
};
module.exports = authRouter;
