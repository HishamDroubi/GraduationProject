import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProblemSolved, reset } from "../features/profile/profileSlice";
import Loader from "./Loader";
import Message from "./Message";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Card } from "react-bootstrap";
import ProblemSubmission from "./ProblemSubmission";
import { toast } from "react-toastify";

const ProblemsProfile = (props) => {
  const userName = props.userName;
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess, message, problemSolved } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getProblemSolved(userName));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, userName, message, isError]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        problemSolved &&
        problemSolved.map((p) => (
          <ProblemSubmission userName={userName} key={p._id} problem={p} />
        ))
      )}
    </>
  );
};

export default ProblemsProfile;
