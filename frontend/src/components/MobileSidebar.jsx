import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

export default function MobileSidebar({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="relative w-64 bg-white h-full shadow-lg p-4 animate-slide-in">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-indigo-600">Family Finance</div>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-2">
          <Item to="/dashboard" onClick={onClose}>Dashboard</Item>
          <Item to="/transactions" onClick={onClose}>Transactions</Item>
          <Item to="/family" onClick={onClose}>Family</Item>
          <Item to="/settings" onClick={onClose}>Settings</Item>
        </nav>
      </aside>
    </div>
  );
}

function Item({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        "block px-3 py-2 rounded-md " +
        (isActive
          ? "bg-indigo-600 text-white"
          : "text-gray-700 hover:bg-gray-100")
      }
    >
      {children}
    </NavLink>
  );
}
