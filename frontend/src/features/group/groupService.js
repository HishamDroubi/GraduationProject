import axios from "axios";
const createGroup = async (groupData, token) => {
  console.log(groupData)
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
  console.log(data);
  return data;
};
const getGroupDetails = async (groupId, token) => {
  const { data } = await axios.get(`/group/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
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

const deleteParticipant = async (data, token) => {
  const response = await axios.delete(
    `/group/${data.groupId}/removeParticipants/${data.participantId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const cancelRequest = async (requestId, token) => {
  const { data } = await axios.delete(`/group/deleteRequest/${requestId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
const deleteGroup = async (groupId, token) => {
  const { data } = await axios.delete(`/group/deleteGroup/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};
const uploadFile = async (FileAndID, token) => {
  const { groupId } = FileAndID;
  const { formData } = FileAndID;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(
    `/group/addAttachment/${groupId}`,
    formData,
    config
  );
  console.log(data);
  return data;
};
const deleteFile = async (attachmentId, token) => {
  const { data } = await axios.delete(
    `/group/deleteAttachment/${attachmentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
///data = keyword , groupId
const InviteUsersSearch = async (dataSearch, token) => {
  const { data } = await axios.get(
    `/group/invitation/${dataSearch.groupId}/${dataSearch.keyword}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
  return data;
};

const fetchGroupInvitations = async (groupId, token) => {
  const { data } = await axios.get(`/group/invitation/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};

const inviteUser = async (userIdAndGroupId, token) => {
  const { data } = await axios.post(
    "/group/invite",
    { ...userIdAndGroupId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

const cancelInvitation = async (invitationId, token) => {
  const { data } = await axios.delete(
    `/group/deleteInvitation/${invitationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
  return data;
};

const createBlog = async (data, token) => {
  const response = await axios.post(`/blog/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('im in ss--', response.data);
  return response.data;
};

const getAllBlog = async (data, token) => {
  console.log(data);
  const response = await axios.get(`/blog/group/${data.groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('------------------------------------', response.data);
  return response.data;
};

const deleteBlog = async (data, token) => {
  console.log(data);
  const response = await axios.delete(`/blog/${data.blogId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('------------------------------------', response.data);
  return response.data;
};

const addComment = async (data, token) => {
  const response = await axios.post(`/blog/${data.id}/comment`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('im in addComment', response.data);
  return response.data;
};

const addReply = async (data, token) => {
  const response = await axios.post(`/blog/${data.blogId}/${data.commentId}/reply`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('im in addComment', response.data);
  return response.data;
};

const groupService = {
  getAllBlog,
  createBlog,
  createGroup,
  fetchGroups,
  getGroupDetails,
  requestJoinGroup,
  requestAcceptance,
  cancelRequest,
  deleteGroup,
  uploadFile,
  deleteFile,
  deleteParticipant,
  InviteUsersSearch,
  fetchGroupInvitations,
  inviteUser,
  cancelInvitation,
  deleteBlog,
  addComment,
  addReply
};

export default groupService;
