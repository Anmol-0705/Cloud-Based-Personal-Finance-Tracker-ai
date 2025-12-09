import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate("/dashboard");
    } catch (e) {
      setErr("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {err && <p className="text-red-600">{err}</p>}
      <form onSubmit={submit}>
        <input className="w-full border p-2 mb-3" placeholder="Email"
          value={username} onChange={e => setUsername(e.target.value)} />

        <input className="w-full border p-2 mb-3" type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} />

        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
