import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { fetchLevel, reset } from "../features/level/levelDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
const LevelDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { level, isLoading, isError, message } = useSelector(
    (state) => state.levelDetails
  );
  useEffect(() => {
    dispatch(fetchLevel(id));
    if (isError) {
      toast.error(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, id]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <ListGroup>
      {level &&
        level.problems &&
        level.solvedProblems &&
        level.problems.map((problem) => (
          <a href={problem.url} key={problem._id} target="_blank" rel="noreferrer noopener">
            <ListGroup.Item
              id={problem._id}
              style={{
                backgroundColor:
                  level.solvedProblems.find((p) => p._id === problem._id) &&
                  "green",
              }}
            >
              {problem.contest}
              {problem.index}
              {problem.name}
              {problem.rating}
            </ListGroup.Item>
          </a>
        ))}
    </ListGroup>
  );
};

export default LevelDetails;
