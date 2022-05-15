import axios from "axios";
const fetchChats = async (token) => {
  const { data } = await axios.get(`/chat`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};
const fetchChatDetails = async (secondUser, token) => {
  const { data } = await axios.get(`/message/${secondUser}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};

const sendMessage = async (dataForm, token) => {
  const { data } = await axios.post(
    "/message",
    {
      ...dataForm,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
  return data;
};
const createChat = async (userName, token) => {
  const { data } = await axios.post(
    "/chat",
    {
      userName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
  return data;
};
const searchContacts = async (keyword, token) => {
  const { data } = await axios.get(`/chat/contact/${keyword}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};

const addNotification = async (messageId, token) => {
  const { data } = await axios.post(
    "/notification",
    {
      messageId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
  return data;
};

const fetchNotifications = async (token) => {
  const { data } = await axios.get("/notification", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};
const chatService = {
  fetchChats,
  fetchChatDetails,
  sendMessage,
  createChat,
  searchContacts,
  addNotification,
  fetchNotifications,
};

export default chatService;
