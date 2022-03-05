let express = require("express");
let bcrypt = require("bcrypt");
let body_parser = require("body-parser");
let session = require("express-session");

let User = require("../models/user");

//define authRouter and use json as request
let authRouter = express.Router();
authRouter.use(body_parser.json());

//User SignUp
authRouter.post("/signUp", async (req, res) => {
  try {
    let { userName, email, password, handle, phone } = req.body;

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
    newUser
      .save()
      .then((result) => {
        res.send(JSON.stringify("successfully SignUp"));
      })
      .catch((err) => {
        res.send(JSON.stringify(err.message));
      });
  } catch (error) {
    res.send(error.message);
  }
});

authRouter.post("/signIn", async (req, res) => {
  try {
    let { email, password } = req.body;

    let fitchedUser = User.findOne({ email: email })
      .then(async (result) => {
        if (result == undefined) {
          throw new Error("The Email Or The Password Is Incorrect");
        }
        let fitchedPassword = result["password"];

        let login = await bcrypt.compareSync(password, fitchedPassword);
        if (login) {
          session.currentUser = result;
          res.send(JSON.stringify("successfully loged in"));
        } else {
          throw new Error("The Email Or The Password Is Incorrect");
        }
      })
      .catch((err) => {
        res.send(JSON.stringify(err.message));
      });
  } catch (err) {
    res.send(JSON.stringify(err.message));
  }
});

module.exports = authRouter;
