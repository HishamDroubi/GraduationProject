let mongoose = require("mongoose");
const level = require("./level");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
  UpdatedAt: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    default: "normal",
  },
});

userSchema.pre("save", function (next) {
  this.UpdatedAt = Date.now();
  next();
});

let User = mongoose.model("User", userSchema, "users");

module.exports = User;
