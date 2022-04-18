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
import {backgroundColor, color} from '../theme'
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
      console.log(data);
    }
    user && getInfo();
  }, [user])
  return (
    <header>
      <Navbar expand="lg" style={{backgroundColor: backgroundColor}}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand > <p style={{color: color}}>CP-PTUK</p></Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >

            <Nav className="ms-auto">

            {user && (
                <LinkContainer to={'/profile/' + user.userName}  >
                  <Nav.Link>
                    <img  src={userCodeforces ? userCodeforces.titlePhoto : 'https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA='} alt=""
                      style={{ width: '25px', height: '25px', borderRadius: '50%', }} />
                  </Nav.Link>
                </LinkContainer>
              )}

              {user && (
                <LinkContainer to="/">
                  <Nav.Link onClick={onLogout}><GoSignOut style={{color: color}}/></Nav.Link>
                </LinkContainer>

              )}

              {!user && (

                <LinkContainer to="/login">
                  <Nav.Link><GoSignIn style={{color: color}}/></Nav.Link>
                </LinkContainer>
              )}

              {!user && (
                <LinkContainer to="/register">
                  <Nav.Link><p style={{color: color, fontSize: '4',}}>Register</p></Nav.Link>
                </LinkContainer>

              )}

             

              <LinkContainer to="/groups">
                <Nav.Link><MdOutlineGroups style={{color: color}} /></Nav.Link>
              </LinkContainer>

            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
