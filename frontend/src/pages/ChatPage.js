import React from "react";
import MyChats from "../components/chatComponents/MyChats";
import Chatbox from "../components/chatComponents/Chatbox";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChats,
  reset,
  fetchChatDetails,
  sendMessage,
} from "../features/chat/chatsSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import "../stylesheet/message.css";
import { useState } from "react";
const ChatPage = () => {
  const dispatch = useDispatch();
  const { receiver } = useParams();
  const { isError, isLoading, isSuccess, chats, message, chatDetails } =
    useSelector((state) => state.chats);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const getContacts = async () => {
      await dispatch(fetchChats());
      dispatch(reset());
    };
    getContacts();
  }, [dispatch, isError, message]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const getChatDetails = async () => {
      await dispatch(fetchChatDetails(receiver));
    };
    const interval = setInterval(() => getChatDetails(), 1500);
    return () => {
      clearInterval(interval);
    };
  }, [isError, dispatch, message, receiver]);
  const [text, setText] = useState("");
  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const messageHandler = async () => {
    if (text === "") {
      toast.error("empty message");
      return;
    }
    const dataForm = {
      receiverName: receiver,
      value: text,
    };
    console.log(dataForm);
    await dispatch(sendMessage(dataForm));
    setText("");
  };
  if (isLoading || !chats || !chatDetails) {
    return <Loader />;
  }
  return (
    <MDBCard className="grey lighten-3 chat-room">
      <MDBCardBody>
        <MDBRow className="px-lg-2 px-2">
          <MDBCol
            md="6"
            xl="4"
            className="px-0 mb-4 mb-md-0 scrollable-friends-list"
          >
            <MyChats chats={chats} />
          </MDBCol>
          <MDBCol md="6" xl="8" className="pl-md-3 mt-4 mt-md-0 px-lg-auto">
            <Chatbox
              chat={chatDetails}
              messageHandler={messageHandler}
              text={text}
              onChangeText={onChangeText}
              selectedChat={receiver?true:false}
            />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ChatPage;
