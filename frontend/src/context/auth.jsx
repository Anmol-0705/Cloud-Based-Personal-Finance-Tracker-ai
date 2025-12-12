import React, { createContext, useContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("fft_token") || null);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const login = async ({ username, password }) => {
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);

    const res = await fetch("http://127.0.0.1:8000/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!res.ok) throw new Error("Invalid login");

    const data = await res.json();
    setToken(data.access_token);
    localStorage.setItem("fft_token", data.access_token);

    return data;
  };

  const signup = async ({ email, name, password }) => {
    const res = await api.post("/auth/signup", { email, name, password });
    return res.data;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("fft_token");
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
