// src/pages/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle email/password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");

    try {
      await googleLogin(credentialResponse);
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed");
    }
  };

  // Handle Google login failure
  const handleGoogleError = () => {
    setError("Google login failed");
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-20 border rounded shadow-sm bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Login to Shopify</h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div className="my-6 text-center text-gray-500">or</div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          scope="openid profile email"
        />
      </div>
    </div>
  );
}
