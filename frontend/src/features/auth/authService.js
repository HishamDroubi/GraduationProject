import axios from "axios";
const API_URL = "/auth/";
const login = async (userData) => {
  const response = await axios.post(API_URL + "signIn", userData);
  console.log(response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const authService = {
  login,
};
export default authService;
