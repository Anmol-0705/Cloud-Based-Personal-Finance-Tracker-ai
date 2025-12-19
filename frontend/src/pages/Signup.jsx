import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api";

export default function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");

    if (!password) {
      setErr("Password is required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      nav("/login");
    } catch (e) {
      setErr(
        e?.response?.data?.detail ||
          e.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create account
        </h1>

        {err && (
          <div className="mb-4 text-sm text-red-600">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white rounded py-2"
          >
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
