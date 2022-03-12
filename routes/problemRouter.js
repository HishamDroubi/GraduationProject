let express = require("express");
let bcrypt = require("bcrypt");
let body_parser = require("body-parser");
let session = require("express-session");
let fetch = require("node-fetch");

let User = require("../models/user");
const Level = require("../models/level");
const Problem = require("../models/problem");

//define authRouter and use json as request
let problemRouter = express.Router();
problemRouter.use(body_parser.json());

//create problem
problemRouter.post("/create", (req, res) => {
  let { contest, index } = req.body;

  let problems = fetch("https://codeforces.com/api/problemset.problems")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let problems = data.result.problems;

      let searchResult = problems.find((problem) => {
        return problem.contestId == contest && problem.index == index;
      });

      if (searchResult == undefined) throw new Error("No Such Problem");
      else {
        let newProblem = new Problem({
          contest: contest,
          index: index,
        });

        newProblem.save().then((result) => {
          res.send(JSON.stringify(result));
        });
      }
    });
});

//delete problem
problemRouter.delete("/delete", (req, res) => {
  let { problemId } = req.body;

  Problem.deleteOne({ _id: problemId }).then((result) => {
    res.send(JSON.stringify(result));
  });
});

module.exports = problemRouter;
