let express = require("express");
let bcrypt = require("bcrypt");
let body_parser = require("body-parser");
let session = require("express-session");
let fetch = require("node-fetch");
let asyncHandler = require("express-async-handler");

let User = require("../models/user");
const Level = require("../models/level");
const Problem = require("../models/problem");

//define authRouter and use json as request
let problemRouter = express.Router();
problemRouter.use(body_parser.json());

//create problem
problemRouter.post(
  "/create",
  asyncHandler(async (req, res) => {
    let { contest, index } = req.body;

    let result = await fetch("https://codeforces.com/api/problemset.problems");

    let data = await result.json();
    let problems = data.result.problems;

    let searchResult = problems.find((problem) => {
      return problem.contestId == contest && problem.index == index;
    });
    console.log(searchResult);
    if (searchResult === undefined) {
      res.status(400);
      throw new Error("No Such Problem");
    } else {
      let newProblem = new Problem({
        contest: contest,
        index: index,
        name: searchResult.name,
        rating: searchResult.rating,
        url: `https://codeforces.com/problemset/problem/${contest}/${index}`,
      });

      let response = await newProblem.save();
      res.status(200).json(response);
    }
  })
);

//delete problem
problemRouter.delete(
  "/delete",
  asyncHandler(async (req, res) => {
    let { problemId } = req.body;

    let response = await Problem.deleteOne({ _id: problemId });
    res.send(JSON.stringify(response));
  })
);

module.exports = problemRouter;
