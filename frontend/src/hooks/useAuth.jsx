// import { useState, useEffect } from "react";
// import api, { setAuthToken } from "../api/api";

// export function useAuthProvider() {
//   const [token, setToken] = useState(localStorage.getItem("fft_token") || null);

//   useEffect(() => {
//     setAuthToken(token);
//   }, [token]);

//   async function login({ username, password }) {
//     const body = new URLSearchParams();
//     body.append("username", username);
//     body.append("password", password);

//     const res = await fetch(`${import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000"}/auth/token`, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: body.toString(),
//     });

//     if (!res.ok) {
//       const err = await res.json().catch(() => ({}));
//       throw new Error(err.detail || "Login failed");
//     }
//     const data = await res.json();
//     setToken(data.access_token);
//     setAuthToken(data.access_token);
//     return data;
//   }

//   async function signup({ email, name, password }) {
//     const res = await api.post("/auth/signup", { email, name, password });
//     return res.data;
//   }

//   function logout() {
//     setToken(null);
//     setAuthToken(null);
//   }

//   return { token, login, signup, logout };
// }

// // convenience hook to use inside components
// import React from "react";
// const AuthContext = React.createContext(null);

// export function AuthProvider({ children }) {
//   const auth = useAuthProvider();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const ctx = React.useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// }



import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("fft_token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthToken(token);
    // if token exists, try fetch profile
    if (token) {
      (async () => {
        try {
          setLoading(true);
          const res = await api.get("/users/me");
          setUser(res.data);
        } catch {
          setUser(null);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setUser(null);
    }
  }, [token]);

  async function login({ username, password }) {
    // backend expects form-encoded OAuth style
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);

    const res = await api.post("/auth/token", body.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const t = res.data.access_token;
    setToken(t);
    setAuthToken(t);
    return res.data;
  }

  async function signup(payload) {
    const res = await api.post("/auth/signup", payload);
    return res.data;
  }

  function logout() {
    setToken(null);
    setAuthToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
