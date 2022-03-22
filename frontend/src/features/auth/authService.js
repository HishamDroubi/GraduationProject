import axios from "axios";
const API_URL = "/auth/";
const login = async (userData) => {
  const response = await axios.post(API_URL + "signIn", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async () => {
  localStorage.removeItem("user");
};
const authService = {
  login,
  logout,
};
export default authService;
