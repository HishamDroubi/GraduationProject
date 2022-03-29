import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { getLevel, reset } from "../features/level/levelSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
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
          <LinkContainer to={`/level/${level._id}`} key={level._id}>
            <ListGroup.Item >
              {level.topic}
            </ListGroup.Item>
          </LinkContainer>
        ))}
    </ListGroup>
  );
};

export default Level;
