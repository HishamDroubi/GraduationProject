import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFile,
  getAllBlog,
} from "../../features/group/groupDetailsSlice";
import { useEffect } from "react";
import BlogItem from "./Blogs/BlogItem";
const Sheet = ({ group, user }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { blogs } = useSelector((state) => state.groupDetails);
  console.log("this is blogs: ", blogs);

  

  useEffect(() => {
    const getBlogs = async () => {
      console.log("this is id group in sheet", id);
      const data = { groupId: id };
      await dispatch(getAllBlog(data));
    };
    getBlogs();
  }, [dispatch, id]);
  return (
    <>
      

      {blogs && blogs.map((b) => <BlogItem blog={b} key={b._id} />)}
    </>
  );
};

export default Sheet;
