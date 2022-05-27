import React from "react";
import { Button, Card, Col, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteParticipants } from "../../features/group/groupDetailsSlice";

const Participant = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { group, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.groupDetails
  );

  const data = {
    groupId: group._id,
    participantId: props.participant._id,
  };
  const deleteParticipant = async () => {
    await dispatch(deleteParticipants(data));
  };
  return (
    <>
      <td>{props.index + 1}</td>
      <td>
        <Link to={`/profile/${props.participant.userName}`}>
          {props.participant.userName}
        </Link>
      </td>
      {user.userName === props.coach.userName && (
        <td>
          <Button
            onClick={() => deleteParticipant()}
            variant="danger"
            style={{
              visibility: props.index === 0 && "hidden",
            }}
          >
            Delete
          </Button>
        </td>
      )}
    </>
  );
};

export default Participant;
