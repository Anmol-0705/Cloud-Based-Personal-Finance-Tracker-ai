import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Family from "./pages/Family";
import Settings from "./pages/Settings";

function Protected({ children }) {
  const { token, loading } = useAuth();
  if (loading) return <div className="p-6">Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>

      {/* AUTH PAGES */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* APP PAGES */}
      <Route
        element={
          <Protected>
            <AppLayout />
          </Protected>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/family" element={<Family />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />

    </Routes>
  );
}



// src/App.jsx
// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Transactions from "./pages/Transactions";
// import Topbar from "./components/Topbar";
// import SidebarResponsive from "./components/SidebarResponsive";
// import { useAuth } from "./hooks/useAuth";

// function Protected({ children }) {
//   const { token, loading } = useAuth();
//   if (loading) return <div className="p-6">Loading...</div>;
//   if (!token) return <Navigate to="/login" replace />;
//   return children;
// }

// function ProtectedLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Topbar onToggleSidebar={() => setSidebarOpen(true)} />
//       <div className="flex">
//         <SidebarResponsive open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//         <div className="flex-1 w-full p-4 md:p-6 max-w-7xl mx-auto">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Routes>
//       {/* Standalone auth pages */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Protected app (wrapped inside Topbar + Sidebar only when authenticated) */}
//       <Route
//         path="/dashboard"
//         element={
//           <Protected>
//             <ProtectedLayout>
//               <Dashboard />
//             </ProtectedLayout>
//           </Protected>
//         }
//       />
//       <Route
//         path="/transactions"
//         element={
//           <Protected>
//             <ProtectedLayout>
//               <Transactions />
//             </ProtectedLayout>
//           </Protected>
//         }
//       />

//       {/* default route */}
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//       <Route path="*" element={<Navigate to="/dashboard" replace />} />
//     </Routes>
//   );
// }
