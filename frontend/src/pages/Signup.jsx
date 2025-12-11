// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/api";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/auth/signup", { email, name, password });
//       navigate("/login");
//     } catch (error) {
//       setErr(error.response?.data?.detail || "Signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-md bg-white p-8 rounded shadow">
//         <h2 className="text-2xl font-semibold mb-4">Create account</h2>
//         {err && <div className="text-red-600 mb-2">{err}</div>}
//         <form onSubmit={submit} className="space-y-3">
//           <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//           <input className="w-full border p-2 rounded" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
//           <input className="w-full border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//           <button className="w-full bg-green-600 text-white p-2 rounded">Create account</button>
//         </form>
//         <p className="mt-4 text-sm">Already have an account? <a className="text-blue-600" href="/login">Sign in</a></p>
//       </div>
//     </div>
//   );
// }
// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState("");
  const [loading,setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      await api.post("/auth/signup", { name, email, password });
      nav("/login");
    } catch (e) {
      setErr(e?.response?.data?.detail || e.message || "Signup failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold">F</div>
            <h1 className="mt-4 text-2xl font-semibold text-gray-800">Create account</h1>
            <p className="mt-1 text-sm text-gray-500">Start tracking family spending</p>
          </div>

          {err && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 p-2 rounded">{err}</div>}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
            </div>

            <button type="submit" disabled={loading} className="w-full px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white">
              {loading ? "Creating…" : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-indigo-600">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
