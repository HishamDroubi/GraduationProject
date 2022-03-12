let express = require("express");
let bcrypt = require("bcrypt");
let body_parser = require("body-parser");
let session = require("express-session");
let fetch = require("node-fetch");

let User = require("../models/user");
const Level = require("../models/level");
const { level } = require("npmlog");

//define authRouter and use json as request
let levelRouter = express.Router();
levelRouter.use(body_parser.json());

//create level
levelRouter.post("/create", (req, res) => {
  let { number, topic, description } = req.body;

  let newLevel = new Level({
    number: number,
    topic: topic,
    description: description,
  });

  newLevel.save().then((result) => {
    res.send(JSON.stringify(result));
  });
});

//delete level
levelRouter.delete("/delete", (req, res) => {
  let { levelId } = req.body;

  Level.deleteOne({ _id: levelId }).then((result) => {
    res.send(JSON.stringify(result));
  });
});

//add problem to level
levelRouter.put("/addProblem", async (req, res) => {
  let { problemId, levelId } = req.body;

  let wantedLevel = await Level.findById(levelId);

  let problems = wantedLevel.problems;

  problems.push(problemId);

  let result = await wantedLevel.save();

  console.log(result);
});

//get All Solved Problems for A User
levelRouter.get("/solvedProblems", async (req, res) => {
  let handle = session.currentUser.handle;
  let levelId = req.body.levelId;

  let level = await Level.findById(levelId).populate("problems");
  let levelProblems = level.problems;
  //console.log(levelProblems);

  let data = await fetch(
    "https://codeforces.com/api/user.status?handle=" + handle
  ).then((result) => {
    return result.json();
  });

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
  console.log(actualProblems);
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
