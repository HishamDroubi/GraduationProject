import axios from "axios";
const fetchChats = async (token) => {
  const { data } = await axios.get(`/message/contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};
const fetchChatDetails = async (secondUser, token) => {
  const { data } = await axios.get(`/message/chat/${secondUser}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};

const sendMessage = async (dataForm, token) => {
  const { data } = await axios.post(
    "/message/create",
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
const chatService = {
  fetchChats,
  fetchChatDetails,
  sendMessage,
};

export default chatService;
