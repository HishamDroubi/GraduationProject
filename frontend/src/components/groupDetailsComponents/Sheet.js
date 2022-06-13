import React from "react";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CreateAttachmentForm from "./CreateAttachmentForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile, getAllBlog, uploadFile } from "../../features/group/groupDetailsSlice";
import { toast } from "react-toastify";
import AttachmentItem from "./AttachmentItem";
import { useEffect } from "react";
import BlogItem from './BlogItem'
const Sheet = ({ group, user }) => {
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const {blogs} = useSelector(state => state.groupDetails)
  console.log("this is blogs: ", blogs)
 
  const onDeleteAttachment = async (e) => {
    const attachmentId = e.target.value;
    await dispatch(deleteFile(attachmentId));
  };

  useEffect(() => {
    const getBlogs = async() => {
      console.log('this is id group in sheet', id)
      const data = {groupId: id};
      await dispatch(getAllBlog(data));
    }
    getBlogs();
  }, [dispatch, id])
  return (
    <>
      {group.coach.email === user.email && <CreateAttachmentForm />}
      
            {blogs.map((b) => (
              <BlogItem blog={b}/>
            ))}
         
    </>
  );
};

export default Sheet;
