const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const blogRouter = express.Router();
let asyncHandler = require("express-async-handler");
const Blog = require("../models/blog");
const Group = require("../models/group")
blogRouter.post(
  "/create",
  asyncHandler(async (req, res) => {

    const { texts, attachments, groupId } = req.body;
    console.log(req.body);
    const blog = new Blog({
      texts: texts,
      attachments: attachments,
      group: groupId,
    });


    const response = await blog.save();
    
    res.status(200).json(response);
  })
);

blogRouter.get("/", asyncHandler(async(req, res) => {
    const response = await Blog.find().populate('attachments')
    res.status(200).json(response);
})
);

module.exports = blogRouter;