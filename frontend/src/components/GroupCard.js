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
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from "react-router-dom";
import { backgroundColor, color } from '../theme';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getGroupDetails, requestGroup } from '../features/group/groupDetailsSlice';
import Loader from './Loader';
import { reset } from '../features/group/groupDetailsSlice';
const GroupCard = (props) => {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onCklickEnterHandler = (e) => {
    navigate("/group/" + props.group._id);
  }

  const onCklickJoinHandler = async (e) => {
    await dispatch(requestGroup(props.group._id));
    dispatch(reset());
  }

  console.log(props.group.requests)
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
          <Col md="3">{props.group.name}</Col>

          <LinkContainer to={`/profile/${props.group.coach.userName}`}>
            <Col md='4'>
              {props.group.coach.userName}
            </Col>
          </LinkContainer>
          <Col md='3'>
            {props.group.participants.length} member
          </Col>

          {user && user.role === "admin" && (
            <Col>
              <Button style={{ backgroundColor: backgroundColor, color: color }}>
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

          <Col >
            <Button
            
              onClick={ (user && props.group.participants && props.group.participants.find(p => user.userName === p.userName) || props.group.coach.userName === user.userName) ? onCklickEnterHandler : onCklickJoinHandler}
              style={{ marginLeft: 60, backgroundColor: backgroundColor, color: color }}>
              {(user && props.group.participants && props.group.participants.find(p => user.userName === p.userName) || props.group.coach.userName === user.userName) ? 'Enter' 
              : user && user.userName && props.group.requests && props.group.requests.find(r => user.userName === r.requester.userName) ? "cancel" : "join"}
            </Button>
          </Col>
        </Row>
      </MDBCardBody>
    </MDBCard>
  );
};

export default GroupCard;
