import React, { useState } from "react";
import { Box, Text, Stack } from "@chakra-ui/layout";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, reset } from "../../features/chat/chatsSlice";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBAvatar,
  MDBBadge,
  MDBIcon,
  MDBBtn,
  MDBScrollbar,
} from "mdbreact";
const MyChats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isLoading, isSuccess, chats, message } = useSelector(
    (state) => state.chats
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const getContacts = async () => {
      await dispatch(fetchChats());
    };
    getContacts();
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);
  if (isLoading || !chats || !isSuccess) {
    return <Loader />;
  }
  return (
    <>
      <h6 className="font-weight-bold mb-3 text-lg-left">Member</h6>

      <div className="white z-depth-1 p-3">
        <MDBListGroup className="friend-list">
          {chats.map((chat) => (
            <MDBListGroupItem
              className="d-flex justify-content-between p-2 border-light"
              onClick={() => navigate(`/chat/${chat.user.userName}`)}
              key={chat.latestMessage._id}
            >
              <div style={{ fontSize: "0.95rem" }}>
                <strong>{chat.user.userName}</strong>
                <p className="text-muted">
                  {chat.latestMessage.value.length > 40
                    ? chat.latestMessage.value.substring(0, 41) + "..."
                    : chat.latestMessage.value}
                </p>
              </div>
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      </div>
    </>
    // <ListGroup defaultActiveKey={receiver}>
    //   {chats.map((chat) => (
    //     <ListGroup.Item
    //       as="li"
    //       className="d-flex justify-content-between align-items-start"
    //       key={chat.latestMessage._id}
    //       href={chat.user.userName}
    //       onClick={() => navigate(`/chat/${chat.user.userName}`)}
    //     >
    //       <div className="ms-2 me-auto">
    //         <div className="fw-bold">{chat.user.userName}</div>
    //         {chat.latestMessage.value}
    //       </div>
    //     </ListGroup.Item>
    //   ))}
    // </ListGroup>
  );
};

export default MyChats;
