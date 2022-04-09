import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>CP-PTUK</Navbar.Brand>
          </LinkContainer>

          {user && (<LinkContainer to={`/profile/${user.userName}`}>
            <Navbar.Brand >{user.userName}</Navbar.Brand>
          </LinkContainer>)}

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            {user ? (
              <Nav className="ms-auto">
                <LinkContainer to="/">
                  <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                </LinkContainer>

              </Nav>
            ) : (
              <Nav className="ms-auto">
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
            {user && user.role === "admin" && (
              <Nav className="ms-auto">
                <LinkContainer to="/level/create">
                  <Nav.Link>New Level</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
            <Nav className="ms-auto">
                <LinkContainer to="/groups">
                  <Nav.Link>Groups</Nav.Link>
                </LinkContainer>
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
