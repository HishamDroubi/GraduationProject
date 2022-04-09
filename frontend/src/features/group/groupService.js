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
  const response = await axios.get("/group", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};
const groupService = {
  createGroup,
  fetchGroups,
};

export default groupService;
