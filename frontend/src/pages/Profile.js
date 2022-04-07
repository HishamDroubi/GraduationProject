import React, {  useState } from "react";
import { useParams } from "react-router-dom";
import HandleProfile from "../components/HandleProfile";
import ProblemsProfile from "../components/ProblemsProfile";
import {
  Nav,
  Col,
  Button,
} from "react-bootstrap";
const Profile = (props) => {
  const { userName } = useParams();
  const [profileType, setProfileType] = useState("handle");
  const onClickHandler = (type) => {
    setProfileType(type);
  };
  return (
    <div>
      <Col>
        <Nav fill variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link
              onClick={() => onClickHandler("handle")}
              eventKey="link-0"
            >
              {userName}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => onClickHandler("problems")}
              eventKey="link-1"
            >
              Problems
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => onClickHandler("groups")}
              eventKey="link-2"
            >
              Groups
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {profileType === "handle" ? (
          <HandleProfile userName={userName} />
        ) : profileType === "problems" ? (
          <ProblemsProfile userName={userName} />
        ) : (
          <Button>dsadasd</Button>
        )}
      </Col>
    </div>
  );
};

export default Profile;
