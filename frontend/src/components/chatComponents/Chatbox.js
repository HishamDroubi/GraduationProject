import { MDBCard, MDBCardBody, MDBListGroup } from "mdbreact";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatDetails,
  reset,
  sendMessage,
} from "../../features/chat/chatDetailsSlice";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
const Chatbox = () => {
  const { receiver } = useParams();
  const dispatch = useDispatch();
  const { isSuccess, isError, isLoading, chat, message } = useSelector(
    (state) => state.chatDetails
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const getChatDetails = async () => {
      await dispatch(fetchChatDetails(receiver));
      dispatch(reset());
    };
    getChatDetails();
  }, [isError, dispatch, message, receiver]);
  const [text, setText] = useState();
  const messageHandler = async () => {
    if (!text || text === "") {
      toast.error("empty message");
      return;
    }
    const dataForm = {
      receiverName: receiver,
      value: text,
    };
    await dispatch(sendMessage(dataForm));
    setText("");
  };
  if (isLoading || !chat) {
    return <Loader />;
  }
  return (
    <>
      <div className="scrollable-chat">
        <MDBListGroup className="list-unstyled pl-3 pr-3">
          <PerfectScrollbar className="scrollable-chat">
            {chat.map((message) => (
              <li
                className="chat-message d-flex justify-content-between mb-1"
                key={message._id}
                style={{
                  flexDirection:
                    user.userName === message.sender.userName ||
                    !message.sender.userName
                      ? "row-reverse"
                      : "",
                }}
              >
                <MDBCard
                  style={{
                    backgroundColor:
                      user.userName === message.sender.userName ||
                      !message.sender.userName
                        ? "#6495ED"
                        : "white",
                  }}
                >
                  <MDBCardBody>
                    <div>
                      <strong className="primary-font">
                        {message.sender.userName
                          ? message.sender.userName
                          : user.userName}
                      </strong>
                    </div>
                    <p className="mb-0">{message.value}</p>
                  </MDBCardBody>
                </MDBCard>
              </li>
            ))}
          </PerfectScrollbar>
        </MDBListGroup>
      </div>
      <div className="form-group basic-textarea">
        <textarea
          className="form-control pl-2 my-0"
          id="exampleFormControlTextarea2"
          rows="3"
          placeholder="Type your message here..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Button
          variant="info"
          onClick={messageHandler}
          className="float-right mt-4"
          style={{ float: "right" }}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default Chatbox;
