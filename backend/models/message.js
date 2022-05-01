let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const Problem = require("./problem");

let messageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
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

let Message = mongoose.model("Message", messageSchema, "messages");
module.exports = Message;