let express = require("express");
let asyncHandler = require("express-async-handler");

let Request = require("../models/request");
let User = require("../models/user");
let Group = require("../models/group");
const { protect } = require("../middleware/authMiddleware");

let groupRouter = express.Router();

//APIS
//get all groups
groupRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const groups = await Group.find({})
      .populate("coach")
      .populate("participants")
      .populate("requests");
    res.status(200).json(groups);
  })
);
//create group
groupRouter.post(
  "/create",
  protect,
  asyncHandler(async (req, res) => {
    let { name } = req.body;
    if (!name) {
      res.status(401);
      throw new Error("Plesae add a name");
    }
    
    let coach = req.currentUser["_id"];
    let newGroup = new Group({
      name: name,
      coach: coach,
      participants: [coach],
    });
    let result = await newGroup.save();
    res.status(200).json(result);
  })
);

//delete group
groupRouter.delete(
  "/delete",
  asyncHandler(async (req, res) => {
    let groupId = req.body.groupId;
    if (!mongoose.isValidObjectId(groupId)) {
      res.status(403);
      throw new Error("groupId Is not valid");
    }
    let response = await Group.deleteOne({ _id: groupId });
    res.send(JSON.stringify(response));
  })
);

//Send Group Request
groupRouter.post(
  "/sendRequest",
  protect,
  asyncHandler(async (req, res) => {
    let id = req.currentUser["_id"];
    let groupId = req.body.groupId;

    if (!mongoose.isValidObjectId(groupId)) {
      res.status(403);
      throw new Error("groupId Is not valid");
    }

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
  })
);

//Respond To Group Request
groupRouter.post(
  "/respondToRequest",
  asyncHandler(async (req, res) => {
    let requestId = req.body.requestId;
    let acceptance = req.body.acceptance;

    if (toString.call(acceptance) !== "[object Boolean]") {
      res.status(403);
      throw new Error("acceptance shoulde be a boolean value");
    }

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
  })
);

//get All Groups as a coach
groupRouter.get(
  "/getAsCoach",
  protect,
  asyncHandler(async (req, res) => {
    let userId = req.currentUser._id;

    let groups = await Group.find({ coach: userId });

    res.send(JSON.stringify(groups));
  })
);

//get All Groups as partcipent
groupRouter.get(
  "/getAsPartcipent",
  protect,
  asyncHandler(async (req, res) => {
    let userId = req.currentUser._id;

    let groups = await Group.find();

    groups = groups.filter((group) => {
      let participants = group.participants;
      return participants.includes(userId);
    });

    res.send(JSON.stringify(groups));
  })
);

module.exports = groupRouter;
