// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/auth";

function Protected({ children }) {
  const { token } = useAuth();
  if (!token) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Not authenticated</h2>
        <p className="mt-2">Please <Link to="/login" className="text-blue-600">log in</Link>.</p>
      </div>
    );
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="font-bold">Family Finance Tracker</Link>
          <div>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            <Link to="/login" className="mr-2">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<div>Welcome! Please Login or Signup.</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
        </Routes>
      </main>
    </AuthProvider>
  );
}
