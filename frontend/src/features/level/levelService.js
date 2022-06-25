import axios from "axios";
const API_URL = "/level/";
const create = async (levelData) => {
  const response = await axios.post(API_URL + "create", levelData);
  console.log(response.data);
  return response.data;
};
const getLevel = async (levelId, token) => {
  let response = await axios.get(API_URL, {
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
  } else {
    let levelsWithSolvedProblems = [];
    for (let i = 0; i < response.data.length; i++) {
      const solvedProblemsData = await axios.get(API_URL + "solvedProblems", {
        params: {
          levelId: response.data[i]._id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      levelsWithSolvedProblems.push({
        ...response.data[i],
        solvedProblems: solvedProblemsData.data,
      });
    }
    response.data = levelsWithSolvedProblems;
  }
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
