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

const ProblemsProfile = (props) => {
  const userName = props.userName;
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess, message, problemSolved } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    const codeforcesInfo = async () => {
      await dispatch(getProblemSolved(userName));
    };
    codeforcesInfo();
    return () => {
      dispatch(reset());
    };
  }, [dispatch, userName]);

  console.log(problemSolved);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        problemSolved.map((p) => (
          <ProblemSubmission userName={userName} key={p._id} problem={p} />
        ))
      )}
    </>
  );
};

export default ProblemsProfile;
