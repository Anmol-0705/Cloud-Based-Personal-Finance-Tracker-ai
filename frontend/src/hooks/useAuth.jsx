import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    localStorage.getItem("fft_user")
      ? JSON.parse(localStorage.getItem("fft_user"))
      : null
  );

  function login() {
    const fakeUser = { name: "Demo User" };
    localStorage.setItem("fft_user", JSON.stringify(fakeUser));
    setUser(fakeUser);
    navigate("/dashboard");
  }

  function logout() {
    localStorage.removeItem("fft_user");
    setUser(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
