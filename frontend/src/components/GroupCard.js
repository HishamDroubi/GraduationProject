import React from 'react'
import { MDBCard, MDBCardHeader, MDBCardBody, MDBTypography, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { Button, Card, Col, ListGroupItem, Row } from 'react-bootstrap';
import { IconName, MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
const GroupCard = (props) => {

  const { user } = useSelector((state) => state.auth);
  return (
    <MDBCard style={{ width: '80%', marginBottom: 40, borderColor: '#2c3e50', padding: 0 }}>
      <MDBCardHeader style={{ width: '100%', backgroundColor: '#2c3e50', color: 'white' }}>

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
              <Button>
                <MdDeleteForever />
              </Button>
            </Col>
          )}
        </Row>

      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle style={{ color: '#2c3e50' }}>Binary Search</MDBCardTitle>
        <Row>
          <Col md='9'>
            <MDBCardText style={{ color: '#2c3e50' }}>
              Talking about Binary search and its time complixty and when we use it and why
            </MDBCardText>
          </Col>

          <Col style={{ marginLeft: 60, }}>
            <MDBBtn href='#'>Join or Enter</MDBBtn>
          </Col>
        </Row>

      </MDBCardBody>
    </MDBCard>
  )
}

export default GroupCard