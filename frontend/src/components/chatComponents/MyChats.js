import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
const MyChats = ({ chats }) => {
  const navigate = useNavigate();
  const { receiver } = useParams();
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <h6 className="font-weight-bold mb-3 text-lg-left">Contacts</h6>

      <div className="white z-depth-1 p-3">
        <MDBListGroup className="friend-list list-group-light">
          {chats.map((chat) => (
            <MDBListGroupItem
              className="d-flex justify-content-between p-2"
              onClick={() =>
                navigate(
                  `/chat/${
                    chat.users[0].userName === user.userName
                      ? chat.users[1].userName
                      : chat.users[0].userName
                  }`
                )
              }
              key={chat._id}
              style={{
                cursor: "pointer",
              }}
              action
            >
              <div style={{ fontSize: "0.95rem" }}>
                <strong>
                  {chat.users[0].userName === user.userName
                    ? chat.users[1].userName
                    : chat.users[0].userName}
                </strong>
                <p className="text-muted">
                  {chat.latestMessage && chat.latestMessage.value.length > 40
                    ? chat.latestMessage.value.substring(0, 41) + "..."
                    : chat.latestMessage
                    ? chat.latestMessage.value
                    : ""}
                </p>
              </div>
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      </div>
    </>
  );
};

export default MyChats;
