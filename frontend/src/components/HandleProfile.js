import React, { useEffect } from "react";
import Rank from "../components/Rank";
import {
  getCodeforcesUserProfile,
  getUserProfile,
} from "../features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Image,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {reset} from "../features/profile/profileSlice"
const HandleProfile = (props) => {
  const userName = props.userName;
  const dispatch = useDispatch();

  const boxStyle = {
    border: "1px solid #b9b9b9",
    position: "relative",
    padding: "1em 1em 0 1em",
  };

  const {
    userProfileCodeforcesInfo,
    isError,
    isLoading,
    isSuccess,
    message,
    userProfile,
    profileType,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getCodeforcesUserProfile(userName));
    dispatch(getUserProfile(userName));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, userName, isError, message]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        userProfileCodeforcesInfo &&
        userProfile && (
          <Card style={boxStyle}>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col md="7">
                    <br />
                    <Row>
                      <Rank rank={userProfileCodeforcesInfo.rank} />
                    </Row>
                    <br />
                    <Row>
                      <h3>{userProfile.userName}</h3>
                    </Row>

                    <Row></Row>

                    <Row>
                      <h5> Level: {userProfile.level.number}</h5>
                    </Row>
                  </Col>

                  <Col md="2">
                    <Image src={userProfileCodeforcesInfo.titlePhoto} />
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        )
      )}
    </>
  );
};

export default HandleProfile;
