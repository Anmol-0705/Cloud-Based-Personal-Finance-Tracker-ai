
// src/components/Topbar.jsx
// import React from "react";
// import { Menu, LogOut } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// export default function Topbar({ onToggleSidebar }) {
//   const { user, logout } = useAuth();

//   return (
//     <header className="bg-white border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={onToggleSidebar}
//               aria-label="Toggle sidebar"
//               className="p-2 rounded-md hover:bg-gray-100 md:hidden"
//             >
//               <Menu className="w-5 h-5" />
//             </button>

//             <Link to="/dashboard" className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white flex items-center justify-center font-bold">
//                 F
//               </div>
//               <div className="hidden sm:block">
//                 <div className="text-sm font-semibold text-indigo-600">Family Finance</div>
//                 <div className="text-xs text-gray-500">Personal family finance tracker</div>
//               </div>
//             </Link>
//           </div>

//           <div className="flex items-center gap-3">
//             <nav className="hidden md:flex gap-4 text-sm text-gray-600">
//               <Link to="/dashboard" className="hover:text-gray-900">Dashboard</Link>
//               <Link to="/transactions" className="hover:text-gray-900">Transactions</Link>
//             </nav>

//             <div className="flex items-center gap-2">
//               <button className="text-sm px-3 py-1 rounded-md bg-gray-100 text-gray-700 hidden sm:inline">Invite</button>

//               <div className="flex items-center gap-2 border-l pl-3">
//                 <div className="text-sm text-gray-700">{user?.name || user?.email || "You"}</div>
//                 <button
//                   onClick={() => logout()}
//                   className="flex items-center gap-1 text-sm px-2 py-1 rounded-md bg-red-50 text-red-600 border border-red-100"
//                 >
//                   <LogOut className="w-4 h-4" /> Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


import { Menu } from "lucide-react";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";

export default function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="h-14 bg-white border-b flex items-center justify-between px-3">
        {/* Left: hamburger + brand */}
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold">
              F
            </div>
            <div className="leading-tight">
              <div className="font-semibold">Family Finance</div>
              <div className="text-xs text-gray-500">
                Personal family finance tracker
              </div>
            </div>
          </div>
        </div>

        {/* Right: user actions only */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">You</span>
          <button className="text-sm px-3 py-1.5 rounded-md border text-red-600 border-red-200 hover:bg-red-50">
            Logout
          </button>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      <MobileSidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
