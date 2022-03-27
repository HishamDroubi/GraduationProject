import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { getLevel, reset } from "../features/level/levelSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const Level = () => {
  const dispatch = useDispatch();
  const { level, isLoading, isError, message } = useSelector(
    (state) => state.level
  );
  useEffect(() => {
    dispatch(getLevel());
    if (isError) {
      toast.error(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <ListGroup>
      {level &&
        level.map((level) => (
          <ListGroup.Item key={level._id}>{level.topic}</ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default Level;
