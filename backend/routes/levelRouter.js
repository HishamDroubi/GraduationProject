let express = require("express");
let bcrypt = require("bcrypt");
let body_parser = require("body-parser");
let session = require("express-session");
let fetch = require("node-fetch");
const asyncHandler = require("express-async-handler");

let User = require("../models/user");
const Level = require("../models/level");
const { default: mongoose } = require("mongoose");

//define authRouter and use json as request
let levelRouter = express.Router();
levelRouter.use(body_parser.json());

//create level
levelRouter.post("/create", async (req, res) => {
  let { number, topic, description } = req.body;

  let newLevel = new Level({
    number: number,
    topic: topic,
    description: description,
  });

  let response = await newLevel.save();
  res.send(JSON.stringify(response));
});

//delete level
levelRouter.delete("/delete", async (req, res) => {
  let { levelId } = req.body;

  let response = await Level.deleteOne({ _id: levelId });
  res.send(JSON.stringify(response));
});

//add problem to level
levelRouter.put("/addProblem", async (req, res) => {
  let { problemId, levelId } = req.body;

  let wantedLevel = await Level.findById(levelId);

  let problems = wantedLevel.problems;

  problems.push(problemId);

  let response = await wantedLevel.save();

  res.send(JSON.stringify(response));
});

//get Specifiv Level
levelRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    let levelId = req.body.levelId;
    let level = "";
    if (!mongoose.isValidObjectId(levelId))
      throw new Error("levelId Is not valid");
    if (levelId == "") {
      level = await Level.find({}).populate("problems");
    } else {
      level = await Level.findById(levelId).populate("problems");

      if (level == "") {
        res.status(404);
        throw new Error("level is not found");
      }
    }
    res.status(200);
    res.send(level);
  })
);

//get All Solved Problems for A User
levelRouter.get("/solvedProblems", async (req, res) => {
  let handle = session.currentUser.handle;
  let levelId = req.body.levelId;

  let level = await Level.findById(levelId).populate("problems");
  let levelProblems = level.problems;

  let result = await fetch(
    "https://codeforces.com/api/user.status?handle=" + handle
  );

  let data = await result.json();

  let submissions = data.result;

  let acceptedSubmissions = submissions.filter((submission) => {
    return submission.verdict == "OK";
  });

  let actualProblems = acceptedSubmissions.map((submission) => {
    return {
      contestId: submission.problem.contestId,
      index: submission.problem.index,
    };
  });
  let solvedProblems = levelProblems.filter((problemInLevel) => {
    let actualProblem = {
      contestId: problemInLevel["contest"],
      index: problemInLevel["index"],
    };

    let search = actualProblems.find((problem) => {
      console.log(problem);
      return (
        problem.contestId == actualProblem.contestId &&
        problem.index == actualProblem.index
      );
    });

    return search;
  });

  res.send(JSON.stringify(solvedProblems));
});

module.exports = levelRouter;
