let express = require("express");
let body_parser = require("body-parser");
const session = require("express-session");

let Request = require("../models/request");
let User = require("../models/user");
let Group = require("../models/group");
const { resourceUsage } = require("process");

let groupRouter = new express.Router();

groupRouter.use(body_parser.urlencoded({ extended: false }));
groupRouter.use(body_parser.json());

//APIS

//create group
groupRouter.post("/create", (req, res) => {
  let { name } = req.body;
  let coach = session.currentUser["_id"];

  let newGroup = new Group({
    name: name,
    coach: coach,
    participants: [coach],
  });
  newGroup.save();
  res.send(JSON.stringify("group created"));
});

//delete group
groupRouter.delete("/delete", (req, res) => {
  let groupId = req.body.groupId;
  Group.deleteOne({ _id: groupId }).then((result) => {
    res.send(JSON.stringify(result));
  });
});

//Send Group Request
groupRouter.post("/sendRequest", (req, res) => {
  let id = session.currentUser["_id"];
  let groupId = req.body.groupId;

  //fetch the group with populate the requests and the Users
  let WantedGroup = Group.findById(groupId)
    .populate({
      path: "requests",
      model: "Request",
      populate: {
        path: "requester",
        model: "User",
      },
    })
    .then((groupResult) => {
      let requests = groupResult["requests"];
      requests.forEach((request) => {
        if (id.equals(request["requester"]["id"]))
          throw Error("You Already Request To Join This Group");
      });
      let newRequest = new Request({
        group: groupId,
        requester: id,
      });
      newRequest.save().then((requestResult) => {
        requests.push(requestResult);
        //console.log(requests);
        groupResult["requests"] = requests;
        groupResult.save();
        res.send(JSON.stringify("Request Has Been Sent"));
      });
    });
});

//Respond To Group Request
groupRouter.post("/respondToRequest", (req, res) => {
  let requestId = req.body.requestId;
  let acceptance = req.body.acceptance;

  Request.findById(requestId).then((requestResult) => {
    let groupId = requestResult["group"];
    let userId = requestResult["requester"];

    let WantedGroup = Group.findById(groupId)
      .populate({
        path: "requests",
        model: "Request",
        populate: {
          path: "requester",
          model: "User",
        },
      })
      .then((groupResult) => {
        let requests = groupResult["requests"];

        //Filtering Requests to remove the Specific Request
        requests = requests.filter((request) => {
          return userId != request["requester"]["_id"];
        });

        if (acceptance) groupResult["participants"].push(userId);

        groupResult.save();
      });
  });

  Request.deleteOne({ _id: requestId }).then(() => {
    if (acceptance) res.send(JSON.stringify("User Added to group"));
    else res.send(JSON.stringify("User Rejected"));
  });
});

//get All Groups as a coach
groupRouter.get("/getAsCoach", (req, res) => {
  let userId = session.currentUser._id;

  let groups = Group.find({ coach: userId }).then((result) => {
    res.send(JSON.stringify(result));
  });
});

//get All Groups as partcipent
groupRouter.get("/getAsPartcipent", (req, res) => {
  let userId = session.currentUser._id;

  let groups = Group.find().then((result) => {
    result = result.filter((group) => {
      let participants = group.participants;
      return participants.includes(userId);
    });
    res.send(JSON.stringify(result));
  });
});

module.exports = groupRouter;
