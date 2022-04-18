import React from "react";
import { useEffect } from "react";
import {
  getGroupDetails,
  requestDecision,
  requestGroup,
  reset,
} from "../features/group/groupDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Participants from '../components/Participants'
const GroupDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { group, isError, isSuccess, message, isLoading } =
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
  }, [dispatch, isError, message, id, navigate]);

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
    dispatch(reset());
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
      
      {user.userName === group.coach.userName && <Participants participants={group.participants}/>}

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
