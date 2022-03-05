let express = require("express");
let body_parser = require("body-parser");

let User = require("../models/user");
let Group = require("../models/group");

//create a User Router
let userRouter = express.Router();

userRouter.use(body_parser.urlencoded({ extended: false }));
userRouter.use(body_parser.json());

//get All Users  Or By UserId or By GroupId
userRouter.get("/getUser", (req, res) => {
  try {
    let userId = req.query.userId;
    let groupId = req.query.groupId;

    if (userId != undefined) {
      let user = User.findById(userId).then((result) => {
        res.send(JSON.stringify(result));
      });
    } else if (groupId != undefined) {
      let group = Group.findById(groupId)
        .select("participants")
        .populate("participants")
        .then((result) => {
          let participants = result["participants"];
          res.send(JSON.stringify(participants));
        });
    } else {
      let users = User.find().then((result) => {
        res.send(JSON.stringify(result));
      });
    }
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

module.exports = userRouter;
