import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileService from "../../features/profile/profileService";

const ChatContentItem = ({ chat, targetChat }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userCodeforces, setUserCodeforces] = useState({});
  useEffect(() => {
    const getInfo = async () => {
      const data = await profileService.getCodeforcesUserProfile(
        chat[0].userName
      );
      console.log(data);
      setUserCodeforces(data);
    };
    user && getInfo();
  });
  return (
    <>
      <div style={{ fontSize: "0.95rem" }}>
        <img
          src={
            userCodeforces
              ? userCodeforces.titlePhoto
              : "https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA="
          }
          alt=""
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "50%",
          }}
        />
        <strong>
          {chat.users[0].userName === user.userName
            ? chat.users[1].userName
            : chat.users[0].userName}
        </strong>
        <p
          style={{
            color:
              targetChat && targetChat._id === chat._id ? "#262626" : "#737373",
          }}
        >
          {chat.latestMessage &&
          chat.latestMessage.sender.userName !== user.userName
            ? chat.latestMessage.sender.userName + ": "
            : chat.latestMessage
            ? "You: "
            : "Send Message!"}
          {chat.latestMessage && chat.latestMessage.value.length > 40
            ? chat.latestMessage.value.substring(0, 41) + "..."
            : chat.latestMessage
            ? chat.latestMessage.value
            : ""}
        </p>
      </div>
    </>
  );
};

export default ChatContentItem;
