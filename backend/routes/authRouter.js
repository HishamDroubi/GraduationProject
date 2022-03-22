let express = require("express");
let bcrypt = require("bcrypt");
let body_parser = require("body-parser");
let session = require("express-session");
let fetch = require("node-fetch");

let User = require("../models/user");

//define authRouter and use json as request
let authRouter = express.Router();
authRouter.use(body_parser.json());

//User SignUp
authRouter.post("/signUp", async (req, res) => {
  try {
    let { userName, email, password, handle, phone } = req.body;
    let result = await fetch(
      "https://codeforces.com/api/user.info?handles=" + handle
    );
    // console.log(result);
    let codeforcesUser = result.json();

    if (codeforcesUser["status"] == "FAILED")
      throw new Error("Coddeforces Handle is not correct");

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
    res.send(JSON.stringify("successfully SignUp " + response));
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

authRouter.post("/signIn", async (req, res) => {
  try {
    let { email, password } = req.body;
    let fitchedUser = await User.findOne({ email: email });
    if (fitchedUser == undefined) {
      throw new Error("The Email Or The Password Is Incorrect");
    }
    let fitchedPassword = fitchedUser["password"];

    let login = await bcrypt.compareSync(password, fitchedPassword);
    if (login) {
      session.currentUser = fitchedUser;
      const token = await bcrypt.hashSync(fitchedUser._id.toString(), 10);
      res.send(JSON.stringify(token));
    } else {
      throw new Error("The Email Or The Password Is Incorrect");
    }
  } catch (err) {
    res.send(JSON.stringify(err.message));
  }
});

//change password
authRouter.put("/changePassword", async (req, res) => {
  let { curPass, newPass, rePass } = req.body;

  if (newPass != rePass)
    res.send(JSON.stringify("new Password does not match the RePassword"));

  let userId = session.currentUser["_id"];

  let fitchedUser = await User.findById(userId);
  fitchedUser.password = await bcrypt.hashSync(newPass, 10);

  let response = await fitchedUser.save();
  res.send(JSON.stringify("password has changed successfully ") + response);
});
module.exports = authRouter;
