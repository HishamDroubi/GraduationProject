import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HandleProfile from "../components/HandleProfile";
import ProblemsProfile from "../components/ProblemsProfile";
import { Nav, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupsProfile from "../components/GroupsProfile";
const Profile = (props) => {
  const { userName } = useParams();
  return (
    <div>
      <Col>
        <Nav fill variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <LinkContainer to="">
              <Nav.Link>{userName}</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="problems/page/1">
              <Nav.Link>Problems</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="groups/page/1">
              <Nav.Link>Groups</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </Col>
      <Routes>
        <Route path="/" element={<HandleProfile userName={userName} />} />
        <Route path="/problems/page/:pageNumber" element={<ProblemsProfile userName={userName}/>} />
        <Route path="/groups/page/:pageNumber" element={<GroupsProfile userName={userName}/>} />
      </Routes>
    </div>
  );
};

export default Profile;
