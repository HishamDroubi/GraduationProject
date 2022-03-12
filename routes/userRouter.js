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
userRouter.delete("/deleteUser", (req, res) => {
  let userId = req.body.userId;

  User.deleteOne({ _id: userId }).then((result) => {
    res.send(JSON.stringify("user deleted successfully"));
  });
});

//change handle
userRouter.put("/changeHandle", (req, res) => {
  try {
    let userId = session.currentUser.id;
    let handle = req.body.handle;

    //chaeck if the new handle is existed on codeforces
    let codeforcesUser = fetch(
      "https://codeforces.com/api/user.info?handles=" + handle
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(data);
        if (data["status"] == "FAILED")
          throw new Error("Coddeforces Handle does not exist");
        let user = User.findById(userId).then((result) => {
          result.handle = handle;
          result.save().then(() => {
            res.send(JSON.stringify("handle has changed successfully"));
          });
        });
      })
      .catch((err) => {
        res.send(err.message);
      });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = userRouter;
