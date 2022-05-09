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
  getMessage,
  createChat,
  joinRoom,
} from "../features/chat/chatsSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import "../stylesheet/message.css";
import { useState } from "react";
import { socketInstance } from "../socket";
import { selectedChatCompare } from "../features/chat/chatsSlice";
const ChatPage = () => {
  const dispatch = useDispatch();
  const { receiver } = useParams();
  const {
    isError,
    isLoading,
    isSuccess,
    chat,
    message,
    chatDetails,
    allChats,
  } = useSelector((state) => state.chats);
  const { user } = useSelector((state) => state.auth);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    setSocketConnected(true);
    socketInstance.io.emit("setup", user);
    socketInstance.io.on("typing", () => setIsTyping(true));
    socketInstance.io.on("stop typing", () => setIsTyping(false));
  }, [user]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const creatChat = async () => {
      await dispatch(fetchChats());
      if (receiver) {
        await dispatch(createChat(receiver));
        await dispatch(fetchChatDetails(receiver));
        dispatch(joinRoom());
      }
    };
    creatChat();
  }, [dispatch, receiver, isError, message]);
  useEffect(() => {
    socketInstance.io.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //TODO notification ?
      } else {
        dispatch(getMessage(newMessageRecieved));
      }
    });
  }, [dispatch]);
  const [text, setText] = useState("");
  const onChangeText = (e) => {
    setText(e.target.value);
    if (socketConnected) {
      if (!typing) {
        setTyping(true);
        socketInstance.io.emit("typing", chat._id);
      }
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socketInstance.io.emit("stop typing", chat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  const messageHandler = async () => {
    if (text === "") {
      toast.error("empty message");
      return;
    }
    socketInstance.io.emit("stop typing", chat._id);
    const dataForm = {
      chatId: chat._id,
      value: text,
    };
    await dispatch(sendMessage(dataForm));
    setText("");
  };
  if (isLoading || !allChats || (receiver && (!chat || !chatDetails))) {
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
            <MyChats chats={allChats} />
          </MDBCol>
          {receiver && chat && chatDetails && (
            <MDBCol md="6" xl="8" className="pl-md-3 mt-4 mt-md-0 px-lg-auto">
              <Chatbox
                chat={chatDetails}
                messageHandler={messageHandler}
                text={text}
                onChangeText={onChangeText}
                selectedChat={receiver ? true : false}
                isTyping={isTyping}
              />
            </MDBCol>
          )}
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ChatPage;
