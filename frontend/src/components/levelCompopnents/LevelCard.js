import React, { useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchLevel, reset } from "../../features/level/levelDetailsSlice";
import Loader from "../Loader";
const LevelCard = ({ level }) => {
  console.log(level);
  const solvedPercentage = level.solvedProblems.length / level.problems.length;
  return (
    <Card className="shadow">
      {/* <Card.Header className="bg-white text-muted fw-bold"></Card.Header> */}
      <Card.Header
        style={{
          background: `rgb(${level.number + 40}, 0, ${
            255 - level.number * 50
          })`,
        }}
        className="text-white d-flex justify-content-between"
      >
        <h5>{level.topic}</h5>
        <div className="text-muted">
          Level <strong className="text-light">{level.number}</strong>
        </div>
      </Card.Header>

      <Card.Body className="p-0">
        <Card.Text className="text-muted m-3">- {level.description}</Card.Text>
        <Col style={{ position: "relative", width: "auto", height: 50 }}>
          <div
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              right: "5px",
            }}
          >
            <CircularProgressbar
              value={Math.round(solvedPercentage * 100).toFixed(2)}
              text={Math.round(solvedPercentage * 100).toFixed(2)}
            />
          </div>
        </Col>
        <LinkContainer
          className="border-0 rounded-0 rounded-bottom"
          style={{ width: "100%" }}
          to={`/level/${level._id}`}
          key={level._id}
        >
          <Button
            href="/"
            variant=""
            className="btn btn-outline-light text-dark border-top"
          >
            Enter
          </Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default LevelCard;
