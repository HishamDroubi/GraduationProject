import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useEffect } from "react";
import profileService from "../features/profile/profileService";
import { useState } from "react";
import { backgroundColor, color } from "../theme";
import { useNavigate } from "react-router-dom";
import { resetGroup } from "../features/group/groupSlice";
import { resetProfile } from "../features/profile/profileSlice";
import { faBell, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBListGroup, MDBListGroupItem, MDBBadge } from "mdb-react-ui-kit";
import "../stylesheet/notification.css";
import { deleteNotification } from "../features/chat/chatsSlice";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notificationList, setNotificationList] = useState(false);
  const { notifications } = useSelector((state) => state.chats);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    dispatch(resetGroup());
    dispatch(resetProfile());
  };

  const [userCodeforces, setUserCodeforces] = useState({});
  useEffect(() => {
    const getInfo = async () => {
      const data = await profileService.getCodeforcesUserProfile(user.userName);
      setUserCodeforces(data);
    };
    user && getInfo();
  }, [user]);
  const deleteHandler = async (notificationMessage) => {
    await dispatch(deleteNotification(notificationMessage._id));
  };
  return (
    <header>
      <Navbar
        expand="lg"
        style={{ paddingBottom: "0", backgroundColor: backgroundColor }}
      >
        <Container>
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Navbar.Brand>
                <p style={{ color: color }}>CP-PTUK</p>
              </Navbar.Brand>
            </LinkContainer>

            <LinkContainer to="/groups/page/1">
              <Nav.Link style={{ color: "#FFFFFF80" }}>
                <strong style={{ color: "#FFFFFF80" }}>Group </strong>
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/">
              <Nav.Link style={{ color: "#FFFFFF80" }}>
                <strong style={{ color: "#FFFFFF80" }}>Level </strong>
              </Nav.Link>
            </LinkContainer>
          </Nav>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ms-auto">
              {user && (
                <>
                  <FontAwesomeIcon
                    icon={faBell}
                    size="lg"
                    id="bell"
                    type="button"
                    onClick={() => setNotificationList(!notificationList)}
                  />
                  {notifications.length > 0 && (
                    <MDBBadge
                      color="danger"
                      notification
                      pill
                      style={{
                        position: "relative",
                        height: "20px",
                        right: "12px",
                      }}
                    >
                      {notifications.length}
                    </MDBBadge>
                  )}
                </>
              )}
              {notificationList && (
                <MDBListGroup
                  style={{
                    position: "absolute",
                    top: "60px",
                    right: "220px",
                    zIndex: 1,
                  }}
                >
                  {notifications.map((notification) => (
                    <MDBListGroupItem key={notification._id}>
                      <div
                        type="button"
                        style={{
                          display: "inline",
                        }}
                        onClick={() =>
                          navigate(`/chat/${notification.sender.userName}`)
                        }
                      >
                        {notification.sender.userName} sent a message
                      </div>

                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        style={{
                          position: "relative",
                          right: "-5px",
                          top: "1px",
                        }}
                        size="lg"
                        type="button"
                        onClick={() => deleteHandler(notification)}
                      />
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              )}
              {user && (
                <LinkContainer to={"/profile/" + user.userName}>
                  <Nav.Link>
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
                    <strong style={{ color: "#FFFFFF80" }}>
                      {user.userName}
                    </strong>
                  </Nav.Link>
                </LinkContainer>
              )}

              {user && (
                <LinkContainer to="/">
                  <Nav.Link onClick={onLogout}>
                    <strong style={{ color: "#FFFFFF80" }}>Loguot</strong>
                  </Nav.Link>
                </LinkContainer>
              )}

              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <strong style={{ color: "#FFFFFF80" }}>Login</strong>
                  </Nav.Link>
                </LinkContainer>
              )}

              {!user && (
                <LinkContainer to="/register">
                  <Nav.Link>
                    <strong style={{ color: "#FFFFFF80" }}>Register</strong>
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* <LinkContainer to="/groups/page/1">
                <Notifications/>
              </LinkContainer> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
