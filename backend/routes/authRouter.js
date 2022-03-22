let express = require("express");
let bcrypt = require("bcrypt");
let session = require("express-session");
let fetch = require("node-fetch");
let User = require("../models/user");
const asyncHandler = require("express-async-handler");
//define authRouter and use json as request
let authRouter = express.Router();


//User SignUp
authRouter.post(
  "/signUp",
  asyncHandler(async (req, res) => {
    let { userName, email, password, handle, phone } = req.body;
    let result = await fetch(
      "https://codeforces.com/api/user.info?handles=" + handle
    );
    // console.log(result);
    let codeforcesUser = result.json();

    if (codeforcesUser["status"] == "FAILED") {
      res.status(400);
      throw new Error("Coddeforces Handle is not correct");
    }
    //hashing password before store it in DB
    let hashedPassword = await bcrypt.hashSync(password, 10);

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

    // Save in DB
    let response = await newUser.save();
    res.status(200).json(response);
  })
);

authRouter.post(
  "/signIn",
  asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    let fitchedUser = await User.findOne({ email: email });
    if (fitchedUser == undefined) {
      res.status(400);
      throw new Error("The Email Or The Password Is Incorrect");
    }
    let fitchedPassword = fitchedUser["password"];

    let login = await bcrypt.compareSync(password, fitchedPassword);
    if (login) {
      session.currentUser = fitchedUser;
      const token = await bcrypt.hashSync(fitchedUser._id.toString(), 10);
      res.status(200).json(token);
    } else {
      res.status(400);
      throw new Error("The Email Or The Password Is Incorrect");
    }
  })
);

//change password
authRouter.put("/changePassword", async (req, res) => {
  let { curPass, newPass, rePass } = req.body;

  if (newPass != rePass) {
    res.status(400);
    throw new Error("new Password does not match the RePassword");
  }
  let userId = session.currentUser["_id"];

  let fitchedUser = await User.findById(userId);
  fitchedUser.password = await bcrypt.hashSync(newPass, 10);

  let response = await fitchedUser.save();
  res.status(200).json(response);
});
module.exports = authRouter;
