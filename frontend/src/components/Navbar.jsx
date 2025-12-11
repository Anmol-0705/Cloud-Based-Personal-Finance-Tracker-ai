// import React from "react";
// import { Bell, User } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";

// export default function Navbar() {
//   const { logout } = useAuth();

//   return (
//     <header className="flex items-center justify-between bg-white px-6 py-3 border-b">
//       <div className="flex items-center gap-3">
//         <h1 className="text-lg font-semibold">Family Finance Tracker</h1>
//       </div>

//       <div className="flex items-center gap-4">
//         <button className="p-2 rounded hover:bg-gray-100"><Bell /></button>
//         <div className="flex items-center gap-2">
//           <User />
//           <button className="text-sm text-gray-700" onClick={() => logout()}>Logout</button>
//         </div>
//       </div>
//     </header>
//   );
// }



// src/components/Navbar.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b">
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="text-lg font-bold text-indigo-600">Family Finance</Link>
        <nav className="hidden md:flex gap-4 text-sm text-gray-600">
          <Link to="/dashboard" className="hover:text-gray-800">Dashboard</Link>
          <Link to="/transactions" className="hover:text-gray-800">Transactions</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-700">{user?.name || user?.email || "Guest"}</div>
        {user ? (
          <button onClick={logout} className="text-sm px-3 py-1 rounded-md bg-red-50 text-red-600 border border-red-100">Logout</button>
        ) : (
          <Link to="/login" className="text-sm text-indigo-600">Sign in</Link>
        )}
      </div>
    </header>
  );
}
