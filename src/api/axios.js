import axios from "axios";

const api = axios.create({
  baseURL: "https://sakthiveltouristbackend.onrender.com",
});

export default api;