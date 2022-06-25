import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MDBListGroup, MDBListGroupItem, MDBInput } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import profileService from "../../features/profile/profileService";
import { deleteNotification } from "../../features/chat/chatsSlice";
import ChatContentItem from "./ChatContentItem";
const MyChats = ({
  chats,
  findUsers,
  searchedContacts,
  showFindContacts,
  targetChat,
}) => {
  const navigate = useNavigate();
  const { receiver } = useParams();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userCodeforces, setUserCodeforces] = useState({});
  useEffect(() => {
    
    const getInfo = async () => {
      const data = await profileService.getCodeforcesUserProfile(user.userName);
      console.log(data);
      setUserCodeforces(data);
    };
    user && getInfo();
    
  }, [user]);
  const deleteHandler = async (notificationMessage) => {
    await dispatch(deleteNotification(notificationMessage._id));
  };console.log(userCodeforces)
  return (
    <>
      <h6 className="font-weight-bold mb-3 text-lg-left">Contacts</h6>
      <MDBInput
        type="text"
        placeholder="Add a contact"
        onChange={(e) => findUsers(e)}
      />
      {searchedContacts && showFindContacts && (
        <MDBListGroup>
          {searchedContacts.map((contact) => (
            <MDBListGroupItem
              key={contact._id}
              onClick={() => navigate(`/chat/${contact.userName}`)}
              type="button"
              style={{
                position: "relative",
                zIndex: 999999999,
              }}
            >
            
                    {contact.userName}
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      )}
      <ScrollableFeed>
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
                  backgroundColor:
                    targetChat && targetChat._id === chat._id && "#72B6F2",
                }}
                action
              >
                <ChatContentItem targetChat={targetChat} chat={chat}/>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        </div>
      </ScrollableFeed>
    </>
  );
};

export default MyChats;
