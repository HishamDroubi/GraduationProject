import axios from "axios";
const API_URL = "/level/";
const create = async (levelData) => {
  const response = await axios.post(API_URL + "create", levelData);
  return response.data;
};
const getLevel = async (levelId = "") => {
  const response = await axios.get(API_URL, levelId);
  console.log("Level = ", response.data);
  return response.data;
};
const levelService = {
  create,
  getLevel,
};
export default levelService;
