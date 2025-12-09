import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Wallet, Users, Settings } from "lucide-react";

function NavLink({ to, icon: Icon, children }) {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link to={to} className={`flex items-center gap-3 px-3 py-2 rounded ${active ? "bg-gray-800 text-white" : "text-gray-200 hover:bg-gray-700"}`}>
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-5">
      <div className="mb-6 text-white font-bold text-xl">FFT</div>
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
        <NavLink to="/transactions" icon={Wallet}>Transactions</NavLink>
        <NavLink to="/family" icon={Users}>Family</NavLink>
        <NavLink to="/settings" icon={Settings}>Settings</NavLink>
      </nav>
    </aside>
  );
}
