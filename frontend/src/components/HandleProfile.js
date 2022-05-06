import React, { useEffect } from "react";
import Rank from "../components/Rank";
import {
  getProblemSolved,
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
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boxStyle = {
    border: "1px solid #b9b9b9",
    position: "relative",
    padding: "1em 1em 0 1em",
  };

  const { isError, isLoading, isSuccess, message, userProfile, problemSolved } =
    useSelector((state) => state.profile);

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
      {isLoading || !userProfile ? (
        <Loader />
      ) : (
        <div className="row mt-3">
          <div className="col-md-4 col-sm-12">
            <div className="text-center">
              <img
                src={userProfile.codeforces.titlePhoto}
                alt="Profile"
                className="img-thumbnail img-fluid"
              />
            </div>
          </div>

          <div className="col">
            <div className="list-group list-group-striped">
              <div className="list-group-item">
                <div className="row">
                  <div className="col-4">Username:</div>
                  <div className="col">{userProfile.userName}</div>
                </div>
              </div>

              <div className="list-group-item">
                <div className="row">
                  <div className="col-4">Level:</div>
                  <div className="col">{userProfile.level.number}</div>
                </div>
              </div>

              <div className="list-group-item">
                <div className="row">
                  <div className="col-4">codeforces rate:</div>
                  <div className="col">
                    {userProfile.codeforces.rating} (
                    {userProfile.codeforces.rank})
                  </div>
                </div>
              </div>

              <div className="list-group-item">
                <div className="row">
                  <div className="col-4"># solved propblem:</div>
                  <div className="col">{problemSolved.length}</div>
                </div>
              </div>

              <div className="list-group-item">
                <div className="row">
                  <div className="col-4">codeforces handle:</div>
                  <div className="col">{userProfile.codeforces.handle}</div>
                </div>
              </div>

              <div className="list-group-item">
                <div className="row">
                  <div className="col-4"># of friends</div>
                  <div className="col">5</div>
                </div>
              </div>

              <div className="list-group-item">
                <div className="row">
                  {user.userName !== userName && (
                    <div className="col">
                      <Button
                        onClick={() =>
                          navigate(`/${user.userName}/chat/${userName}`)
                        }
                      >
                        new message
                      </Button>
                    </div>
                  )}

                  {user.userName === userName && (
                    <div className="col">
                      <Button>your messages</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HandleProfile;
