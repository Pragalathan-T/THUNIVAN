import api from "./axios";

export const registerUser = (data) => {
  return api.post("/api/users/register", data);
};

export const loginUser = (data) => {
  return api.post("/api/users/login", data);
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};