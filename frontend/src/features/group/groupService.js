import axios from "axios";
const createGroup = async (groupData, token) => {
  const response = await axios.post("/group/create", groupData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const fetchGroups = async (token) => {
  const response = await axios.get("/group/getAll", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const getGroupDetails = async (groupId, token) => {
  const response = await axios.get(`/group/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};

const requestJoinGroup = async (groupId, token) => {
  const response = await axios.post(
    "/group/sendRequest",
    { groupId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const requestAcceptance = async (data, token) => {
  const response = await axios.post("/group/respondToRequest", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const groupService = {
  createGroup,
  fetchGroups,
  getGroupDetails,
  requestJoinGroup,
  requestAcceptance,
};

export default groupService;
