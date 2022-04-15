import React from "react";
import { useEffect } from "react";
import {
  getGroupDetails,
  requestDecision,
  requestGroup,
  reset,
  resetAll,
} from "../features/group/groupDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
const GroupDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { group, isError, isSuccess, message, isLoading, updateGroup } =
    useSelector((state) => state.groupDetails);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Group not found") {
        navigate("/groups");
      }
    }
    const fetchGroup = async () => {
      await dispatch(getGroupDetails(id));
      dispatch(reset());
    };
    fetchGroup();
  }, [dispatch, isError, message, id, navigate, updateGroup]);

  const requestToJoin = async () => {
    await dispatch(requestGroup(group._id));
    dispatch(reset());
  };
  const requestAcceptance = async (e) => {
    const val = e.target.value.split("/");
    await dispatch(
      requestDecision({
        requestId: val[0],
        acceptance: val[1] === "true" ? true : false,
      })
    );
    dispatch(resetAll());
  };
  if (
    isLoading ||
    !group ||
    !group.coach ||
    !group.participants ||
    !user ||
    !group.requests
  ) {
    return <Loader />;
  }
  return (
    <div>
      {!group.participants.find((p) => p.userName === user.userName) &&
        !group.requests.find(
          (request) => request.requester.userName === user.userName
        ) && <button onClick={requestToJoin}>Join Group</button>}

      {group.requests.find(
        (request) => request.requester.userName === user.userName
      ) && <Button variant="danger">Cancel</Button>}

      {user.userName === group.coach.userName && <h1>Participants</h1>}

      {user.userName === group.coach.userName &&
        group.participants.map((participant) => (
          <li key={participant._id}>{participant.userName}</li>
        ))}

      {user.userName === group.coach.userName && <h1>Resquests</h1>}

      {user.userName === group.coach.userName &&
        group.requests.map((request) => (
          <li key={request.requester.userName}>
            {request.requester.userName}
            <Button onClick={requestAcceptance} value={request._id + "/true"}>
              Accept
            </Button>
            <Button onClick={requestAcceptance} value={request._id + "/false"}>
              Decline
            </Button>
          </li>
        ))}
    </div>
  );
};

export default GroupDetails;