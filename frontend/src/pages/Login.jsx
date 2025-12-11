

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// export default function Login() {
//   const { login } = useAuth();
//   const [username, setUsername] = useState("john@example.com");
//   const [password, setPassword] = useState("password");
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setErr("");
//     setLoading(true);
//     try {
//       await login({ username, password });
//       navigate("/dashboard");
//     } catch (error) {
//       // show a friendly message
//       setErr(error.message || "Login failed. Check backend or network.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sign in</h2>

//         {err && <div className="text-sm text-red-600 mb-3">{err}</div>}

//         <form onSubmit={submit} className="space-y-4">
//           <div>
//             <label className="text-sm font-medium text-gray-700">Email</label>
//             <input
//               className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="you@example.com"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
//           >
//             {loading ? "Signing in..." : "Login"}
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-gray-600">
//           Don't have an account? <a className="text-blue-600" href="/signup">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// }
// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login({ username, password });
      nav("/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.detail || error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold">F</div>
            <h1 className="mt-4 text-2xl font-semibold text-gray-800">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Sign in to manage family finances</p>
          </div>

          {err && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 p-2 rounded">
              {err}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email or username</label>
              <input value={username} onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com" autoComplete="username" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="●●●●●●" autoComplete="current-password" />
            </div>

            <button type="submit" disabled={loading}
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-60">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account? <a className="text-indigo-600 font-medium" href="/signup">Create one</a>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-gray-400">
          Built with Tailwind · Demo UI
        </div>
      </div>
    </div>
  );
}
