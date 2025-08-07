// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("shopify-user"));
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    setUser(res.data.user);
    localStorage.setItem("shopify-user", JSON.stringify(res.data.user));
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await axios.post("/auth/register", { name, email, password });
    setUser(res.data.user);
    localStorage.setItem("shopify-user", JSON.stringify(res.data.user));
    return res.data;
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null);
    localStorage.removeItem("shopify-user");
  };

  const googleLogin = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const res = await axios.post(
      "/auth/google-login",
      {
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
        googleId: decoded.sub,
      },
      { withCredentials: true }
    );

    setUser(res.data.user);
    localStorage.setItem("shopify-user", JSON.stringify(res.data.user));
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, googleLogin, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
