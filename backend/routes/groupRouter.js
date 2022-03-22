let express = require("express");
let body_parser = require("body-parser");
const session = require("express-session");

let Request = require("../models/request");
let User = require("../models/user");
let Group = require("../models/group");

let groupRouter = new express.Router();

groupRouter.use(body_parser.urlencoded({ extended: false }));
groupRouter.use(body_parser.json());

//APIS

//create group
groupRouter.post("/create", async (req, res) => {
  let { name } = req.body;
  let coach = session.currentUser["_id"];

  let newGroup = new Group({
    name: name,
    coach: coach,
    participants: [coach],
  });
  let result = await newGroup.save();
  res.send(JSON.stringify("group created ") + result);
});

//delete group
groupRouter.delete("/delete", async (req, res) => {
  let groupId = req.body.groupId;
  let response = await Group.deleteOne({ _id: groupId });
  res.send(JSON.stringify(response));
});

//Send Group Request
groupRouter.post("/sendRequest", async (req, res) => {
  let id = session.currentUser["_id"];
  let groupId = req.body.groupId;

  //fetch the group with populate the requests and the Users
  let WantedGroup = await Group.findById(groupId).populate({
    path: "requests",
    model: "Request",
    populate: {
      path: "requester",
      model: "User",
    },
  });

  let requests = WantedGroup["requests"];
  requests.forEach((request) => {
    if (id.equals(request["requester"]["id"]))
      throw Error("You Already Request To Join This Group");
  });
  let newRequest = new Request({
    group: groupId,
    requester: id,
  });
  let requestResult = await newRequest.save();
  requests.push(requestResult);

  WantedGroup["requests"] = requests;
  let response = WantedGroup.save();
  res.send(JSON.stringify("Request Has Been Sent " + response));
});

//Respond To Group Request
groupRouter.post("/respondToRequest", async (req, res) => {
  let requestId = req.body.requestId;
  let acceptance = req.body.acceptance;

  let requestResult = await Request.findById(requestId);
  let groupId = requestResult["group"];
  let userId = requestResult["requester"];

  let WantedGroup = await Group.findById(groupId).populate({
    path: "requests",
    model: "Request",
    populate: {
      path: "requester",
      model: "User",
    },
  });

  let requests = WantedGroup["requests"];

  //Filtering Requests to remove the Specific Request
  requests = requests.filter((request) => {
    return userId != request["requester"]["_id"];
  });

  if (acceptance) WantedGroup["participants"].push(userId);

  let responseFromSave = await WantedGroup.save();

  let responseFromDelete = await Request.deleteOne({ _id: requestId });
  if (acceptance)
    res.send(JSON.stringify("User Added to group " + responseFromDelete));
  else res.send(JSON.stringify("User Rejected " + responseFromDelete));
});

//get All Groups as a coach
groupRouter.get("/getAsCoach", async (req, res) => {
  let userId = session.currentUser._id;

  let groups = await Group.find({ coach: userId });

  res.send(JSON.stringify(groups));
});

//get All Groups as partcipent
groupRouter.get("/getAsPartcipent", async (req, res) => {
  let userId = session.currentUser._id;

  let groups = await Group.find();

  groups = groups.filter((group) => {
    let participants = group.participants;
    return participants.includes(userId);
  });

  res.send(JSON.stringify(groups));
});

module.exports = groupRouter;