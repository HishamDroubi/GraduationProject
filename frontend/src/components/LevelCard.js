import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const LevelCard = ({ level }) => {
  return (
    <Card style={{ width: "65%", marginBottom: "15px", marginLeft: "8.5%" }}>
      <Card.Header>Level {level.number}</Card.Header>

      <Card.Body>
        <Card.Title>{level.topic}</Card.Title>
        <Row>
          <Col>
            <Card.Text>{level.description}</Card.Text>
          </Col>

          <Col>
            <LinkContainer  style={{ position: "absolute", right: "1%", bottom: "5px" }} to={`/level/${level._id}`} key={level._id}>
              <Button
                href="/"
                variant="primary"
              >
                Enter
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default LevelCard;
