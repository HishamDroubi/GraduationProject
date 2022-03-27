import axios from "axios";
const API_URL = "/level/";
const create = async (levelData) => {
  const response = await axios.post(API_URL + "create", levelData);
  return response.data;
};
const levelService = {
  create,
};
export default levelService;
