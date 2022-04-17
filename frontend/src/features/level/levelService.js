import axios from "axios";
const API_URL = "/level/";
const create = async (levelData) => {
  const response = await axios.post(API_URL + "create", levelData);
  console.log(response.data)
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
const addProblem = async (problemData, token, levelId) => {
  const createProblem = await axios.post("/problem/create", problemData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const problemId = createProblem.data._id;
  await axios.put(
    API_URL + "addProblem",
    { problemId, levelId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return createProblem.data;
};
const levelService = {
  create,
  getLevel,
  addProblem,
};
export default levelService;
