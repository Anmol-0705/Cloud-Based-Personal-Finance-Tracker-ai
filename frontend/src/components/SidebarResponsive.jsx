// src/components/SidebarResponsive.jsx
import React from "react";
import { NavLink } from "react-router-dom";

function LinkItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "block px-3 py-2 rounded-md text-sm " +
        (isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-50")
      }
    >
      {children}
    </NavLink>
  );
}

export default function SidebarResponsive({ open, onClose }) {
  // desktop sidebar
  return (
    <>
      <aside className="hidden md:block w-72 bg-white border-r">
        <div className="p-4 border-b">
          <div className="text-lg font-semibold text-indigo-600">Family Finance</div>
        </div>
        <nav className="p-4 space-y-1">
          <LinkItem to="/dashboard">Dashboard</LinkItem>
          <LinkItem to="/transactions">Transactions</LinkItem>
          <LinkItem to="/family">Family</LinkItem>
          <LinkItem to="/settings">Settings</LinkItem>
        </nav>
      </aside>

      {/* mobile drawer */}
      <div className={`fixed inset-0 z-40 md:hidden ${open ? "" : "pointer-events-none"}`}>
        <div
          className={`fixed inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        />
        <aside
          className={`fixed left-0 top-0 bottom-0 bg-white w-64 transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <div className="font-semibold text-indigo-600">Family Finance</div>
            <button onClick={onClose} className="text-gray-600">Close</button>
          </div>
          <nav className="p-4 space-y-1">
            <LinkItem to="/dashboard">Dashboard</LinkItem>
            <LinkItem to="/transactions">Transactions</LinkItem>
            <LinkItem to="/family">Family</LinkItem>
            <LinkItem to="/settings">Settings</LinkItem>
          </nav>
        </aside>
      </div>
    </>
  );
}
