let mongoose = require("mongoose");
let Schema = mongoose.Schema;
<<<<<<< HEAD

let messageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    value: {
      type: String,
      required: true,
    },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);
=======
<<<<<<< HEAD
const Problem = require("./problem");
const User = require("./user");

let messageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
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

messageSchema.pre("save", function (next) {
  this.UpdatedAt = Date.now();
  next();
});

=======

let messageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    value: {
      type: String,
      required: true,
    },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);
>>>>>>> origin
>>>>>>> mahmoud
let Message = mongoose.model("Message", messageSchema, "messages");
module.exports = Message;
