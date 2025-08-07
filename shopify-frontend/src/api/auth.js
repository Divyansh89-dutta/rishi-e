import axios from "./axios";

// Login user
export const loginUser = async (credentials) => {
  const res = await axios.post("/auth/login", credentials);
  return res.data;
};

// Register user
export const registerUser = async (data) => {
  const res = await axios.post("/auth/register", data);
  return res.data;
};

// Get logged-in user profile (if using protected route)
export const getUserProfile = async () => {
  const res = await axios.get("/auth/profile");
  return res.data;
};

// Logout user (optional endpoint)
export const logoutUser = async () => {
  const res = await axios.post("/auth/logout");
  return res.data;
};
