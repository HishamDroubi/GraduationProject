import React from "react";
import MyChats from "../components/chatComponents/MyChats";
import Chatbox from "../components/chatComponents/Chatbox";
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
import "../stylesheet/message.css"
const ChatPage = () => {
  return (
    <MDBCard className="grey lighten-3 chat-room">
      <MDBCardBody>
        <MDBRow className="px-lg-2 px-2">
          <MDBCol
            md="6"
            xl="4"
            className="px-0 mb-4 mb-md-0 scrollable-friends-list"
          >
            <MyChats />
          </MDBCol>
          <MDBCol md="6" xl="8" className="pl-md-3 mt-4 mt-md-0 px-lg-auto">
            <Chatbox />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ChatPage;
