let mongoose = require("mongoose");
const User = require("./user");
const Request = require("./request");
let Schema = mongoose.Schema;

let groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  lastUpdateAt: {
    type: Date,
    default: Date.now(),
  },
});

groupSchema.pre("save", function (next) {
  this.UpdatedAt = Date.now();
  next();
});

let Group = mongoose.model("Group", groupSchema, "groups");
module.exports = Group;
