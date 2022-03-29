import axios from "axios";
const API_URL = "/level/";
const create = async (levelData) => {
  const response = await axios.post(API_URL + "create", levelData);
  return response.data;
};
const getLevel = async (levelId, token) => {
  const response = await axios.get(API_URL, {
    params: {
      levelId,
    },
  });
  if (levelId) {
    const solvedProblems = await axios.get(API_URL + "solvedProblems", {
      params: {
        levelId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.data.solvedProblems = solvedProblems.data;
  }
  console.log(response.data);
  return response.data;
};
const levelService = {
  create,
  getLevel,
};
export default levelService;
