// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { LayoutDashboard, Wallet, Users, Settings } from "lucide-react";

// function NavLink({ to, icon: Icon, children }) {
//   const loc = useLocation();
//   const active = loc.pathname === to;
//   return (
//     <Link to={to} className={`flex items-center gap-3 px-3 py-2 rounded ${active ? "bg-gray-800 text-white" : "text-gray-200 hover:bg-gray-700"}`}>
//       <Icon className="w-5 h-5" />
//       <span>{children}</span>
//     </Link>
//   );
// }

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-gray-900 min-h-screen p-5">
//       <div className="mb-6 text-white font-bold text-xl">FFT</div>
//       <nav className="flex flex-col gap-2">
//         <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
//         <NavLink to="/transactions" icon={Wallet}>Transactions</NavLink>
//         <NavLink to="/family" icon={Users}>Family</NavLink>
//         <NavLink to="/settings" icon={Settings}>Settings</NavLink>
//       </nav>
//     </aside>
//   );
// }



// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

function Item({ to, children }) {
  return (
    <NavLink to={to}
      className={({isActive}) =>
        "block px-3 py-2 rounded-md text-sm " + (isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100")
      }>
      {children}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 border-b">
        <div className="text-xl font-semibold text-indigo-600">Family Finance</div>
      </div>
      <nav className="p-4 space-y-1">
        <Item to="/dashboard">Dashboard</Item>
        <Item to="/transactions">Transactions</Item>
        <Item to="/family">Family</Item>
        <Item to="/settings">Settings</Item>
      </nav>
    </aside>
  );
}
