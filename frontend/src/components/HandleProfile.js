import React, { useEffect } from "react";
import Rank from "../components/Rank";
import {
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
import { reset } from "../features/profile/profileSlice";
import { useNavigate } from "react-router-dom";
const HandleProfile = (props) => {
  const userName = props.userName;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boxStyle = {
    border: "1px solid #b9b9b9",
    position: "relative",
    padding: "1em 1em 0 1em",
  };

  const { isError, isLoading, isSuccess, message, userProfile } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate("/");
    }
    const fetchProfile = async () => {
      await dispatch(getUserProfile(userName));
      dispatch(reset());
    };
    fetchProfile();
  }, [dispatch, userName, isError, message, navigate]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        userProfile && (
          <Card style={boxStyle}>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col md="7">
                    <br />
                    <Row>
                      <Rank rank={userProfile.codeforces.rank} />
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
                    <Image src={userProfile.codeforces.titlePhoto} />
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
