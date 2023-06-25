let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let replySchema = new Schema({

    content: {
        type: String,
    },
  who: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

let Reply = mongoose.model("Reply", replySchema, "replys");
module.exports = Reply;
