import axios from "axios";
const getUserProfile = async (userName) => {
  const { data } = await axios.get(`/user/${userName}`);
  const { data: codeforcesData } = await axios.get(
    `/user/codeforcesInfo/${userName}`
  );
  data.codeforces = codeforcesData;
  return data;
};

const getCodeforcesUserProfile = async (userName) => {
  const { data } = await axios.get(`/user/codeforcesInfo/${userName}`);
  return data;
};

const getProblemSolved = async (userName, pageNumber) => {
  const { data } = await axios.get(
    `/user/problem/${userName}?pageNumber=${pageNumber}`
  );
  return data;
};

const profileService = {
  getUserProfile,
  getCodeforcesUserProfile,
  getProblemSolved,
};

export default profileService;
