
// src/components/Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";

// function Item({ to, children }) {
//   return (
//     <NavLink to={to}
//       className={({isActive}) =>
//         "block px-3 py-2 rounded-md text-sm " + (isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100")
//       }>
//       {children}
//     </NavLink>
//   );
// }

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-white border-r hidden md:block">
//       <div className="p-4 border-b">
//         <div className="text-xl font-semibold text-indigo-600">Family Finance</div>
//       </div>
//       <nav className="p-4 space-y-1">
//         <Item to="/dashboard">Dashboard</Item>
//         <Item to="/transactions">Transactions</Item>
//         <Item to="/family">Family</Item>
//         <Item to="/settings">Settings</Item>
//       </nav>
//     </aside>
//   );
// }


import React from "react";
import { NavLink } from "react-router-dom";

function Item({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "block px-3 py-2 rounded-md text-sm " +
        (isActive
          ? "bg-indigo-600 text-white"
          : "text-gray-700 hover:bg-gray-100")
      }
    >
      {children}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-56 bg-white border-r min-h-screen hidden md:block">
      <div className="p-4 border-b">
        <div className="text-xl font-semibold text-indigo-600">
          Family Finance
        </div>
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

