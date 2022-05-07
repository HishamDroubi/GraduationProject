import React from "react";
import { useEffect, useState } from "react";
import {
  getGroupDetails,
  requestDecision,
  reset,
} from "../features/group/groupDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Nav, Col, Row, Card } from "react-bootstrap";
import Participants from '../components/Participants'
import Requests from '../components/Requests'
import { LinkContainer } from "react-router-bootstrap";
import Sheet from "../components/Sheet";
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
        navigate("/groups/page/1");
      }
    }
    const fetchGroup = async () => {
      await dispatch(getGroupDetails(id));
      dispatch(reset());
    };
    fetchGroup();
  }, [dispatch, isError, message, id, navigate]);

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
    <div style={{ marginLeft: '0px' }}>
      {group && <Nav fill variant="tabs" defaultActiveKey="/home">
        
        {group && group.coach.userName === user.userName && <Nav.Item>
          <LinkContainer to="request">
            <Nav.Link>requests</Nav.Link>
          </LinkContainer>
        </Nav.Item>
}
     {group && group.coach.userName === user.userName && <Nav.Item>
          <LinkContainer to="participants">
            <Nav.Link>participants  </Nav.Link>
          </LinkContainer>
        </Nav.Item>
}
        <Nav.Item>
          <LinkContainer to="sheet">
            <Nav.Link>sheet</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>}


      {group &&
        <Routes>
          <Route path="/request" element={<Requests requestAcceptance={requestAcceptance} requests={group.requests} />} />
          <Route path="/participants" element={<Participants participants={group.participants} />} />
          <Route path="/sheet" element={<Sheet />} />
        </Routes>
      }
    </div>
  );
};

export default GroupDetails;
