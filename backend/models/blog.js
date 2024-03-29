let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let blogSchema = new Schema({
  attachments: [
    {
      attachment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attachment",
      },
      order: {
        type: Number,
      },
    },
  ],
  texts: [
    {
      content: {
        type: String,
      },
      order: {
        type: Number,
      },
    },
  ],
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  heading: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ]
});

let Blog = mongoose.model("Blog", blogSchema, "blogs");
module.exports = Blog;
