const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const blogRouter = express.Router();
let asyncHandler = require("express-async-handler");
const Blog = require("../models/blog");
const Group = require("../models/group");
const Attachment = require("../models/attachment");
const Comment = require("../models/comment");
const { model } = require("mongoose");
const User = require("../models/user");
const Reply = require("../models/Reply");
blogRouter.post(
  "/create",
  asyncHandler(async (req, res) => {

    const { texts, attachments, groupId, heading } = req.body;
    console.log(req.body);
    const blog = new Blog({
      texts: texts,
      attachments: attachments,
      group: groupId,
      heading: heading
    });

    const response = await blog.save();
    const datad = await Blog.find();

    console.log(datad);

    console.log(response);
    res.status(200).json(response);
  })
);

blogRouter.get("/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const response = await Blog.findById(id).populate({
    path: "attachments",
    populate: {
      path: "attachment",
      model: "Attachment",
    },
  }).populate({
    path: 'comments',
    model: 'Comment'
  }).populate({
    path: 'comments',

    populate: {
      path: 'who',
      model: 'User',
    },
    populate: {
      path: "replys",
      model: "Reply"
    }

  })


  res.status(200).json(response);
})
);

blogRouter.delete("/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate({
    path: "attachments",
    populate: {
      path: "attachment",
      model: "Attachment",
    },
  })
  console.log(blog.attachments)
  const ress = await blog.attachments.map(async (e) => {
    return await Attachment.deleteOne({ _id: e.attachment._id })
  })
  const response = await Blog.deleteOne({ _id: id })
  res.status(200).json(response);
})
);

blogRouter.post("/:id/comment", asyncHandler(async (req, res) => {

  const user = await User.findOne({ email: req.body.user.email });
  let comment = new Comment({
    content: req.body.content,
    who: user._id
  })
  console.log(req.body.content);
  await comment.save()
  const { id } = req.params;
  const blog = await Blog.findById(id);
  blog.comments.push(comment._id);

  blog.save();
  comment = await Comment.findById({_id:comment._id}).populate({
    path: 'who',
    model: 'User',
  }).populate({
    path: "replys",
    model: "Reply"
  })
    .populate({
      path: "replys",
      populate: {
        path: 'who',
        model: 'User'
      }
    })
  res.status(200).json(comment);
})
);

blogRouter.post("/:blogId/:commentId/reply", asyncHandler(async (req, res) => {

  const user = await User.findOne({ email: req.body.user.email });
  let reply = new Reply({
    content: req.body.content,
    who: user._id
  })

  await reply.save()


  const { blogId, commentId } = req.params;

  const comment = await Comment.findOne({ _id: commentId }); console.log(comment); 
  comment.replys.push(reply);

  comment.save();

  reply = await Reply.findById({_id: reply._id}).populate({
    path:'who',
    model: 'User'
  })
  res.status(200).json(reply);
})
);
blogRouter.get("/group/:groupId", asyncHandler(async (req, res) => {
  const { groupId } = req.params
  console.log('-------------------', groupId);
  const response = await Blog.find({ group: groupId }).populate({
    path: "attachments",
    populate: {
      path: "attachment",
      model: "Attachment",
    },

  }).populate({
    path: "group",
    populate: {
      path: "coach",
      model: "User"
    }
  }).populate({
    path: 'comments',
    populate: {
      path: 'who',
      model: 'User',
    }
  }).populate({
    path: 'comments',

    populate: {
      path: 'who',
      model: 'User',
    },
    populate: {
      path: "replys",
      model: "Reply"
    },
    populate: {
      path: "replys",
      populate: {
        path: 'who',
        model: 'User'
      }
    }

  })

  console.log(response);
  res.status(200).json(response);
})
);
module.exports = blogRouter;