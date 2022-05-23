import React from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBTypography,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Button, Card, Col, ListGroupItem, Row } from "react-bootstrap";
import { IconName, MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { backgroundColor, color } from "../theme";
import {
  cancelRequest,
  deleteGroup,
  requestGroup,
} from "../features/group/groupSlice";
import { reset } from "../features/group/groupSlice";
const GroupCard = ({ group }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const requestToJoin = async () => {
    await dispatch(requestGroup(group._id));
    dispatch(reset());
  };
  const deleteRequest = async () => {
    const request = group.requests.find(
      (request) => request.requester.email === user.email
    );
    await dispatch(cancelRequest(request._id));
    dispatch(reset());
  };
  const ondeleteGroup = async (e) => {
    if (window.confirm("are you sure want to delete the group ?")) {
      await dispatch(deleteGroup(group._id));
      dispatch(reset());
    }
  };
  return (
    <MDBCard
      style={{
        width: "80%",
        marginBottom: 40,
        borderColor: "black",
        padding: 0,
      }}
    >
      <MDBCardHeader
        style={{
          width: "100%",
          backgroundColor: backgroundColor,
          color: color,
        }}
      >
        <Row>
          <Col md="3">{group.name}</Col>

          <LinkContainer to={`/profile/${group.coach.userName}`}>
            <Col md="4">{group.coach.userName}</Col>
          </LinkContainer>
          <Col md="3">{group.participants.length} member</Col>

          {user && user.role === "admin" && (
            <Col>
              <Button
                onClick={ondeleteGroup}
                style={{ backgroundColor: backgroundColor, color: color }}
              >
                <MdDeleteForever />
              </Button>
            </Col>
          )}
        </Row>
      </MDBCardHeader>
      <MDBCardBody style={{ backgroundColor: "white" }}>
        <MDBCardTitle style={{ color: backgroundColor }}>
          Binary Search
        </MDBCardTitle>
        <Row>
          <Col md="9">
            <MDBCardText style={{ color: backgroundColor }}>
              Talking about Binary search and its time complixty and when we use
              it and why
            </MDBCardText>
          </Col>
          <Col>
            {!group.participants.find((p) => p.userName === user.userName) &&
              !group.requests.find(
                (request) => request.requester.userName === user.userName
              ) && (
                <Button
                  onClick={requestToJoin}
                  style={{
                    marginLeft: 60,
                    backgroundColor: backgroundColor,
                    color: color,
                  }}
                >
                  Join
                </Button>
              )}
            {group.participants.find((p) => p.userName === user.userName) && (
              <LinkContainer to={`/group/${group._id}/sheet`}>
                <Button
                  style={{
                    marginLeft: 60,
                    backgroundColor: backgroundColor,
                    color: color,
                  }}
                >
                  Enter
                </Button>
              </LinkContainer>
            )}
            {group.requests.find(
              (request) => request.requester.userName === user.userName
            ) && (
              <Button
                onClick={deleteRequest}
                style={{
                  marginLeft: 60,
                  backgroundColor: backgroundColor,
                  color: color,
                }}
              >
                Cancel
              </Button>
            )}
          </Col>
        </Row>
      </MDBCardBody>
    </MDBCard>
  );
};

export default GroupCard;
