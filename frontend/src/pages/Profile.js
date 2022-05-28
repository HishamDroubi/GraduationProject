import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HandleProfile from "../components/profileComponents/HandleProfile";
import ProblemsProfile from "../components/profileComponents/ProblemsProfile";
import { Nav, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupsProfile from "../components/profileComponents/GroupsProfile";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Profile = (props) => {
  const [value, setValue] = React.useState(0);
  const { userName } = useParams();
  return (
    <Box sx={{ width: "auto" }}>
      <BottomNavigation
        sx={{ width: "auto" }}
        style={{justifyContent: 'space-around'}}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <LinkContainer to="">
          <BottomNavigationAction label={userName} />
        </LinkContainer>

        <LinkContainer to="problems/page/1">
          <BottomNavigationAction label="problems" />
        </LinkContainer>

        <LinkContainer to="groups/page/1">
          <BottomNavigationAction label="group" />
        </LinkContainer>

      </BottomNavigation>

      <Routes>
        <Route path="/" element={<HandleProfile userName={userName} />} />
        <Route
          path="/problems/page/:pageNumber"
          element={<ProblemsProfile userName={userName} />}
        />
        <Route
          path="/groups/page/:pageNumber"
          element={<GroupsProfile userName={userName} />}
        />
      </Routes>
    </Box>
  );
};

export default Profile;
