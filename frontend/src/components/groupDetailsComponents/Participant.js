import React from "react";
import { Card, Col, ListGroupItem, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Participant = (props) => {
  return (
    <>
      <td>{props.index + 1}</td>
      <td>
        <Link to={`/profile/${props.participant.userName}`}>
          {props.participant.userName}
        </Link>
      </td>
    </>
  );
};

export default Participant;
