import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("");
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
      await login({ username, password });
    } catch (error) {
      setErr(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Log in
        </h1>

        {err && (
          <div className="mb-4 text-sm text-red-600">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Email or username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
