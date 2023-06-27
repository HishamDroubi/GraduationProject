import React, { useState } from "react";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import ButtonSubmit from "../../../Utils/ButtonSubmit";
import { addComment } from "../../../../features/group/groupDetailsSlice";
import { async } from "rxjs";
import axios from "axios";
import { getByEmail } from "../../../../features/auth/authSlice";
import { IconButton } from "@mui/material";
import { Send, SendDash } from "react-bootstrap-icons";
import { faCommenting } from "@fortawesome/free-solid-svg-icons";
import { Fab, Tooltip } from "@mui/material";
const Comments = ({ blog }) => {
  const [comments, setComments] = useState(blog.comments);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const onAddCommentHandler = async () => {
    console.log(user);
    const data = {
      id: blog._id,
      user: user,
      content: content,
    };
    console.log(data);
    const ret = await dispatch(addComment(data));
    console.log(comments);
    setComments((prev) => [...prev, ret.payload]);
    console.log(comments);
    setContent("");
  };
  return (
    <div className="w-full border">
      <div className="font-mono ml-2 mt-2 text-xl font-bold">Comments</div>
      <div className="flex p-2">
        <input
          type="text"
          value={content}
          id="first_name"
          class="bg-gray-50 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-900 block w-3/4 p-2.5"
          placeholder="add your comment"
          onChange={(e) => setContent(e.target.value)}
        />
        <Tooltip placement="top" title="add  comment">
          <IconButton onClick={onAddCommentHandler}>
            <Send />
          </IconButton>
        </Tooltip>
      </div>
      {comments.map((c) => (
        <Comment comment={c} blog={blog} />
      ))}
    </div>
  );
};

export default Comments;
