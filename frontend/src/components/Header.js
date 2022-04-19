import React from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { MdOutlineGroups } from "react-icons/md";
import { GoSignOut, GoSignIn } from "react-icons/go";
import { useEffect } from "react";
import profileService from "../features/profile/profileService";
import { useState } from "react";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const [userCodeforces, setUserCodeforces] = useState({});
  useEffect(() => {
    const getInfo = async () => {
      const data = await profileService.getCodeforcesUserProfile(user.userName);
      setUserCodeforces(data);
    };
    user && getInfo();
  }, [user]);
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>CP-PTUK</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ms-auto">
              {user && (
                <LinkContainer to={"/profile/" + user.userName}>
                  <Nav.Link>
                    {user.userName}
                    <img
                      src={
                        userCodeforces
                          ? userCodeforces.titlePhoto
                          : "https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA="
                      }
                      alt=""
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                      }}
                    />
                  </Nav.Link>
                </LinkContainer>
              )}

              {user && (
                <LinkContainer to="/">
                  <Nav.Link onClick={onLogout}>
                    <GoSignOut />
                  </Nav.Link>
                </LinkContainer>
              )}

              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <GoSignIn />
                  </Nav.Link>
                </LinkContainer>
              )}

              {!user && (
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/groups/page/1">
                <Nav.Link>
                  <MdOutlineGroups />
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
