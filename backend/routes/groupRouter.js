let express = require("express");
let asyncHandler = require("express-async-handler");
let mongoose = require("mongoose");

let Request = require("../models/request");
let User = require("../models/user");
let Group = require("../models/group");
const { protect } = require("../middleware/authMiddleware");
const Invitation = require("../models/invitation");
const { FetchError } = require("node-fetch");
const { request } = require("http");

let groupRouter = express.Router();

//APIS
//get All Groups
groupRouter.get(
  "/getAll",
  protect,
  asyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Group.countDocuments({});
    const groups = await Group.find({})
      .populate("coach")
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    res.status(200).json({ groups, page, pages: Math.ceil(count / pageSize) });
  })
);

//get Group
groupRouter.get(
  "/:id",
  protect,
  asyncHandler(
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        res.status(401).json("Group id is not valid");
      }
      const group = await Group.findById(id)
        .populate("coach")
        .populate("participants")
        .populate("attachments")
        .populate({
          path: "requests",
          model: "Request",
          populate: {
            path: "requester",
            model: "User",
          },
        });
      if (!group) {
        res.status(401);
        throw new Error("Group not found");
      } else {
        res.status(200).json(group);
      }
    })
  )
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
    let addRequest = true;
    requests.forEach((request) => {
      if (id.equals(request["requester"]["id"])) {
        addRequest = false;
        res.status(401);
        throw new Error("You Already Request To Join This Group");
      }
    });
    if (addRequest === true) {
      let newRequest = new Request({
        group: groupId,
        requester: id,
      });
      let requestResult = await newRequest.save();
      requestResult.populate("requester");
      requests.push(requestResult);

      WantedGroup["requests"] = requests;
      await WantedGroup.save();
      res.status(200).json(requestResult);
    }
  })
);

//Respond To Group Request
groupRouter.post(
  "/respondToRequest",
  protect,
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

    let WantedGroup = await Group.findById(groupId)
      .populate({
        path: "requests",
        model: "Request",
        populate: {
          path: "requester",
          model: "User",
        },
      })
      .populate("coach");
    if (!WantedGroup.coach._id.equals(req.currentUser._id)) {
      res.status(401);
      throw new Error("Not authorized, not the coach of the group");
    } else {
      let requests = WantedGroup["requests"];

      //Filtering Requests to remove the Specific Request
      requests = requests.filter((request) => {
        return !userId.equals(request["requester"]["_id"]);
      });
      WantedGroup["requests"] = requests;
      if (acceptance) WantedGroup["participants"].push(userId);

      await WantedGroup.save();
      let response = await Request.findById(requestId).populate("requester");

      await Request.deleteOne({
        _id: requestId,
      });
      console.log(response);
      res.status(200).json({
        ...response.requester.toObject(),
        acceptance: acceptance,
        _id: response._id,
      });
    }
  })
);

//delete request
groupRouter.delete(
  "/deleteRequest",
  protect,
  asyncHandler(async (req, res) => {
    let requestId = req.body.requestId;

    let fetchedRequest = await Request.findById(requestId);

    //first you have to delete the request from the group requests array
    let groupId = fetchedRequest["group"];

    let fetchedGroup = await Group.findById(groupId);

    let requests = fetchedGroup["requests"];

    requests = requests.filter((request) => {
      return request["_id"] != requestId;
    });

    fetchedGroup["requests"] = requests;

    let saveResponse = await fetchedGroup.save();

    //now you can delete the request object itself
    let deleteResponse = await Request.deleteOne({ _id: requestId });

    res.send(JSON.stringify(deleteResponse));
  })
);

//invite to group
groupRouter.post(
  "/invite",
  protect,
  asyncHandler(async (req, res) => {
    let groupId = req.body.groupId;
    let userId = req.body.userId;
    if (!mongoose.isValidObjectId(groupId)) {
      res.status(403);
      throw new Error("groupId Is not valid");
    }
    if (!mongoose.isValidObjectId(userId)) {
      res.status(403);
      throw new Error("userId Is not valid");
    }
    const WantedGroup = await Group.findById(groupId);
    if (!WantedGroup || WantedGroup === null) {
      res.status(401);
      throw new Error("Group not found");
    }
    let fetchedUser = await User.findById(userId);
    if (!fetchedUser || fetchedUser === null) {
      res.status(401);
      throw new Error("User not found");
    }
    const userIsMember = await WantedGroup.participants.find((memeber) =>
      memeber._id.equals(userId)
    );
    if (userIsMember) {
      res.status(401);
      throw new Error("User already joined the group");
    }
    //check if the invitation exist
    const invitationExist = await Invitation.find({
      group: groupId,
      invitedUser: userId,
    });
    if (invitationExist) {
      res.status(401);
      throw new Error("User already invited to this group");
    }
    let newInvitation = new Invitation({
      group: groupId,
      invitedUser: userId,
    });

    let invitationResult = await newInvitation.save();

    let invitations = fetchedUser["invitations"];

    invitations.push(invitationResult);

    fetchedUser["invitations"] = invitations;
    let response = await fetchedUser.save();
    res.status(200).json(response);
  })
);

groupRouter.post(
  "/respondToInvite",
  protect,
  asyncHandler(async (req, res) => {
    let invitationId = req.body.invitationId;
    let acceptance = req.body.acceptance;

    if (!mongoose.isValidObjectId(invitationId)) {
      res.status(403);
      throw new Error("invitationId Is not valid");
    }

    if (toString.call(acceptance) !== "[object Boolean]") {
      res.status(403);
      throw new Error("acceptance shoulde be a boolean value");
    }

    let fetchedInvitation = await Invitation.findById(invitationId);
    console.log(fetchedInvitation);
    let userId = fetchedInvitation["invitedUser"];
    console.log(userId);
    let fetchedUser = await User.findById(userId);
    let invitations = fetchedUser["invitations"];

    invitations = invitations.filter((invitation) => {
      return invitationId != invitation["invitedUser"];
    });

    fetchedUser["invitations"] = invitations;

    let ResultString = "Rejected successfully";

    //if the user accept add it to the partcipents of the group
    if (acceptance) {
      let fetchedGroup = await Group.findById(fetchedInvitation["group"]);
      let participants = fetchedGroup["participants"];
      participants.push(userId);
      fetchedGroup["participants"] = participants;
      await fetchedGroup.save();
      ResultString = "Accepted Successfully";
    }

    //deleting the Invitation from UserObject
    let responseFromSave = await fetchedUser.save();

    //deleting the Invitation from DB
    let responseFromDelete = await Invitation.deleteOne({ _id: invitationId });

    res.send(JSON.stringify("ResultString"));
  })
);

//delete invite
groupRouter.delete(
  "/deleteInvitation",
  protect,
  asyncHandler(async (req, res) => {
    let invitationId = req.body.invitationId;

    let fetchedInvite = await Invitation.findById(invitationId);

    //first you have to delete the invite from the User invitations array
    let invitedUserId = fetchedInvite["invitedUser"];

    let fetchedUser = await User.findById(invitedUserId);

    let invitations = fetchedUser["invitations"];

    invitations = invitations.filter((invitation) => {
      return invitation["_id"] != invitationId;
    });

    fetchedUser["invitations"] = invitations;

    let saveResponse = await fetchedUser.save();

    //now you can delete the invitation object itself
    let deleteResponse = await Invitation.deleteOne({ _id: invitationId });

    res.send(JSON.stringify(deleteResponse));
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
  "/getAsPartcipent/:userName",
  asyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    let { userName } = req.params;
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    let allGroups = await Group.find().populate("coach");

    allGroups = allGroups.filter((group) => {
      let participants = group.participants;
      return participants.includes(user._id.toString());
    });
    const count = allGroups.length;
    let groups = [];
    for (
      let i = (page - 1) * pageSize;
      i < Math.min(count, page * pageSize);
      i++
    ) {
      groups.push(allGroups[i]);
    }
    res.status(200).json({ groups, page, pages: Math.ceil(count / pageSize) });
  })
);

groupRouter.delete(
  "/deleteGroup",
  protect,
  asyncHandler(async (req, res) => {
    let groupId = req.body.groupId;
    let deleteResult = await Group.deleteOne({ _id: groupId });
    let deleteCount = deleteResult["deletedCount"];
    if (deleteCount == 0) throw new Error("This Group is not existed");
    res.send(deleteResult);
  })
);

groupRouter.delete(
  "/removeUser",
  protect,
  asyncHandler(async (req, res) => {
    let userId = req.body.userId;
    let groupId = req.body.groupId;

    let result = "result";

    let fetchedGroup = await Group.findById(groupId);

    //if the removed User is the coach then the froup should be deleted
    if (userId == fetchedGroup["coach"]) {
      let deleteResult = await Group.deleteOne({ _id: groupId });
      result = deleteResult;
    } else {
      let participants = fetchedGroup["participants"];

      let filteredParticipants = participants.filter((partcipent) => {
        return partcipent["_id"] != userId;
      });

      fetchedGroup["participants"] = filteredParticipants;
      let saveResult = await fetchedGroup.save();
      result = saveResult;
    }
    res.send(result);
  })
);

module.exports = groupRouter;
