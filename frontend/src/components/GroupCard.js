import React from 'react'
import { MDBCard, MDBCardHeader, MDBCardBody, MDBTypography, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { Button, Card, Col, ListGroupItem, Row } from 'react-bootstrap';
import { IconName, MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { backgroundColor, color } from '../theme';
const GroupCard = (props) => {

  const onCklickHandler = (e) => {
    props.history.push(`/${props.group._id}`)
  }
  const { user } = useSelector((state) => state.auth);
  return (
    <MDBCard style={{ width: '80%', marginBottom: 40, borderColor: 'black', padding: 0 }}>
      <MDBCardHeader style={{ width: '100%', backgroundColor: backgroundColor, color: color }}>

        <Row>

          <Col md='3'>
            {props.group.name}
          </Col>

          <LinkContainer to={`/profile/${props.group.coach.userName}`}>
          <Col md='4'>
          {props.group.coach.userName}
          </Col>
          </LinkContainer>
          <Col md='3'>
           {props.group.participants.length} member
          </Col>

          {user && user.role === 'admin' && (
            <Col>
              <Button style={{backgroundColor: backgroundColor, color: color}}>
                <MdDeleteForever />
              </Button>
            </Col>
          )}
        </Row>

      </MDBCardHeader>
      <MDBCardBody style={{ backgroundColor: 'white' }}>
        <MDBCardTitle style={{ color: backgroundColor }}>Binary Search</MDBCardTitle>
        <Row>
          <Col md='9'>
            <MDBCardText style={{ color: backgroundColor }}>
              Talking about Binary search and its time complixty and when we use it and why
            </MDBCardText>
          </Col>

          <Col >
            <Button onClick={onCklickHandler} style={{ marginLeft: 60, backgroundColor: backgroundColor, color: color }} href={`/groups/${props.group._id}`}>Join or Enter</Button>
          </Col>
        </Row>

      </MDBCardBody>
    </MDBCard>
  )
}

export default GroupCard