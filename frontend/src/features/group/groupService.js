import axios from "axios";
const createGroup = async (groupData, token) => {
  const response = await axios.post("/group/create", groupData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const fetchGroups = async (pageNumber, token) => {
  const { data } = await axios.get(`/group/getAll?pageNumber=${pageNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
const getGroupDetails = async (groupId, token) => {
  const { data } = await axios.get(`/group/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const requestJoinGroup = async (groupId, token) => {
  const { data } = await axios.post(
    "/group/sendRequest",
    { groupId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

const requestAcceptance = async (data, token) => {
  const response = await axios.post("/group/respondToRequest", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const cancelRequest = async (requestId, token) => {
  const { data } = await axios.delete(
    `/group/deleteRequest/${requestId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
  return data;
};
const groupService = {
  createGroup,
  fetchGroups,
  getGroupDetails,
  requestJoinGroup,
  requestAcceptance,
  cancelRequest,
};

export default groupService;
