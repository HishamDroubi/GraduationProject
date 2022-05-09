import { MDBCard, MDBCardBody, MDBListGroup } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import { Button } from "react-bootstrap";

import ScrollableFeed from "react-scrollable-feed";
const Chatbox = ({
  chat,
  messageHandler,
  text,
  onChangeText,
  selectedChat,
}) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="scrollable-chat">
        <MDBListGroup className="list-unstyled pl-3 pr-3">
          <ScrollableFeed className="scrollable-chat">
            {chat.map((message) => (
              <li
                className="chat-message d-flex justify-content-between mb-1"
                key={message._id}
                style={{
                  flexDirection:
                    user.userName === message.sender.userName
                      ? "row-reverse"
                      : "",
                }}
              >
                <MDBCard
                  style={{
                    backgroundColor:
                      user.userName === message.sender.userName
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
          </ScrollableFeed>
        </MDBListGroup>
      </div>
      <div className="form-group basic-textarea">
        <textarea
          className="form-control pl-2 my-0"
          id="exampleFormControlTextarea2"
          rows="3"
          placeholder="Type your message here..."
          onChange={(e) => onChangeText(e)}
          value={text}
        />
        <Button
          variant="info"
          onClick={messageHandler}
          className="float-right mt-4"
          style={{ float: "right" }}
          disabled={!selectedChat}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default Chatbox;
