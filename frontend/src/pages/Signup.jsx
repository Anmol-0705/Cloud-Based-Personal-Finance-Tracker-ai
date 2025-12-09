import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await signup({ email, name, password });
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Signup</h2>
      <form onSubmit={submit}>
        <input className="w-full border p-2 mb-3" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />

        <input className="w-full border p-2 mb-3" placeholder="Name"
          value={name} onChange={e => setName(e.target.value)} />

        <input className="w-full border p-2 mb-3" type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} />

        <button className="w-full bg-green-600 text-white p-2 rounded">Create Account</button>
      </form>
    </div>
  );
}
