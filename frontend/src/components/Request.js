import React from 'react'
import { Button, Col, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Check } from 'react-bootstrap-icons';
const Request = (props) => {
  return (
    <>
    <td>1</td>
    <td>
        {props.request.requester.userName}
    </td>
    <td>
      <Check style={{backgroundColor: '#e0e0e0', color: '#4BB543'}} onClick={props.requestAcceptance} value={props.request._id + "/true"} />
        
        <Button className="btn btn-outline-danger" onClick={props.requestAcceptance} value={props.request._id + "/false"}>
          Decline
        </Button>
    </td>
    </>
  )
}

export default Request