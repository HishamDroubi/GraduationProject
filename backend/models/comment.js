let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let commentSchema = new Schema({

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
    replys: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reply",
        }
    ]
});

let Comment = mongoose.model("Comment", commentSchema, "comments");
module.exports = Comment;
