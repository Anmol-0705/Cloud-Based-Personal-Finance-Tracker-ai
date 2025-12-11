// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Transactions from "./pages/Transactions";
// import Family from "./pages/Family";
// import Settings from "./pages/Settings";
// import DashboardLayout from "./components/DashboardLayout";
// import { useAuth } from "./hooks/useAuth";

// function ProtectedRoute({ children }) {
//   const { token } = useAuth();
//   if (!token) return <Navigate to="/login" replace />;
//   return children;
// }

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <Dashboard />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <Dashboard />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/transactions"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <Transactions />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/family"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <Family />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/settings"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <Settings />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }



import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import DashboardLayout from "./components/DashboardLayout";
import { useAuth } from "./hooks/useAuth";

function Protected({ children }) {
  const { token, loading } = useAuth();
  if (loading) return <div className="p-6">Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<Protected><DashboardLayout><Dashboard /></DashboardLayout></Protected>} />
      <Route path="/dashboard" element={<Protected><DashboardLayout><Dashboard /></DashboardLayout></Protected>} />
      <Route path="/transactions" element={<Protected><DashboardLayout><Transactions /></DashboardLayout></Protected>} />
      {/* Add more protected routes as needed */}
    </Routes>
  );
}
