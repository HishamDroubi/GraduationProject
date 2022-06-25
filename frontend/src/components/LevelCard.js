import React, { useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchLevel, reset } from "../features/level/levelDetailsSlice";
import Loader from "./Loader";
const LevelCard = ({level}) => {
 
  return (
    <>
    {level ? (<Card style={{ width: "65%", marginBottom: "15px", marginLeft: "8.5%" }}>
      <Card.Header>
        <Row>
          <Col>Level {level.number}</Col>
          <Col style={{ position: "relative" }} md="3">
            <Link
              style={{ position: "absolute", top: "3px" }}
              to={`/level/${level._id}`}
              key={level._id}
            >
              <p>{level.topic}</p>
            </Link>
          </Col>
        </Row>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col>
            <Card.Text>{level.description}</Card.Text>
          </Col>
          <Col style={{position: 'relative', width: 'auto', height: 50,}}>
            <div style={{ width: 50, height: 50, position: 'absolute', right: '5px' }}>
              <CircularProgressbar
                value={level && ((level.solvedProblems.length) / (level.problems.length))}
                text={66}
              />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>) : (<p>loading</p>)}
  </>
  );
};

export default LevelCard;
