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
const register = async (userData) => {
  const response = await axios.post(API_URL + "signUp", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const invitationAcceptance = async (invitationIdAndAcceptence, token) => {
  const { data } = await axios.post(
    "/group/respondToInvite",
    {
      ...invitationIdAndAcceptence,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
const authService = {
  login,
  logout,
  register,
  invitationAcceptance,
};
export default authService;
