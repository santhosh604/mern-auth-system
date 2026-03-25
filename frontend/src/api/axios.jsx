
import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-auth-backend-d3oa.onrender.com",
  withCredentials: true,
});

export default API;