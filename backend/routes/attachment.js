let express = require("express");
let bcrypt = require("bcrypt");
let body_parser = require("body-parser");
let session = require("express-session");
let fetch = require("node-fetch");

let User = require("../models/user");

//define attachmentRouter and use json as request
let attachmentRouter = express.Router();
attachmentRouter.use(body_parser.json());

module.exports = attachmentRouter;
