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

    let codeforcesUser = fetch(
      "https://codeforces.com/api/user.info?handles=" + handle
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(data);
        if (data["status"] == "FAILED")
          throw new Error("Coddeforces Handle is not correct");
      });

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
    res.send(JSON.stringify(error.message));
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

//change password
authRouter.put("/changePassword", (req, res) => {
  let { curPass, newPass, rePass } = req.body;

  if (newPass != rePass)
    res.send(JSON.stringify("new Password does not match the RePassword"));
  let userId = session.currentUser["_id"];

  User.findById(userId).then(async (result) => {
    result.password = await bcrypt.hashSync(newPass, 10);
    result.save().then(() => {
      res.send(JSON.stringify("password has changed successfully"));
    });
  });
});
module.exports = authRouter;
