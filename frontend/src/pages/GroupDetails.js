import React from "react";
import { useEffect, useState } from "react";
import {
  fetchGroupInvitations,
  getGroupDetails,
  requestDecision,
  reset,
} from "../features/group/groupDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Participants from "../components/groupDetailsComponents/Participants";
import Requests from "../components/groupDetailsComponents/Requests";
import { LinkContainer } from "react-router-bootstrap";
import Sheet from "../components/groupDetailsComponents/Sheet";
import Invitations from "../components/groupDetailsComponents/Invitations";
import SideBar from "../components/Utils/SideBar";
const GroupDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const activeLink = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const { id } = useParams();
  const { group, isError, message, isLoading } = useSelector(
    (state) => state.groupDetails
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Group not found") {
        navigate("/groups/page/1");
      }
    }
    const fetchGroup = async () => {
      await dispatch(getGroupDetails(id));
      await dispatch(fetchGroupInvitations(id));
      dispatch(reset());
    };
    fetchGroup();
  }, [dispatch, isError, message, id, navigate]);

  const requestAcceptance = async (requestId, acceptance) => {
    await dispatch(
      requestDecision({
        requestId,
        acceptance,
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
    <div className="flex w-full" >
      
      <SideBar group={group}  />
      <div className="w-5/6">
      <Nav fill variant="tabs" activeKey={activeLink}>
        <Nav.Item>
          <LinkContainer to="sheet">
            <Nav.Link eventKey="sheet" className="font-serif">Sheet</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        {group.coach.userName === user.userName && (
          <Nav.Item>
            <LinkContainer to="request">
              <Nav.Link eventKey="request">Requests</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        )}
        {group.coach.userName === user.userName && (
          <Nav.Item>
            <LinkContainer to="invitation">
              <Nav.Link eventKey="invitation">Invitations</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        )}
        <Nav.Item>
          <LinkContainer to="participants">
            <Nav.Link eventKey="participants">Participants</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>

      <Routes>
        <Route
          path="request"
          element={
            <Requests
              requestAcceptance={requestAcceptance}
              requests={group.requests}
              groupId={group._id}
            />
          }
        />
        <Route
          path="invitation"
          element={<Invitations groupId={group._id} />}
        />
        <Route
          path="participants"
          element={
            <Participants
              participants={group.participants}
              coach={group.coach}
            />
          }
        />
        <Route
          path="sheet"
          element={
            <Sheet attachments={group.attachments} group={group} user={user} />
          }
        />
      </Routes>
      </div>
      
    </div>
  );
};

export default GroupDetails;
