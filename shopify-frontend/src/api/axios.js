import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // this matches the vite proxy
  withCredentials: true, // must be enabled to send cookies/sessions
});

export default instance;
