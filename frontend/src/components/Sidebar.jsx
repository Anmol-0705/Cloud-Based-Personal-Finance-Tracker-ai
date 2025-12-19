import { Link, useLocation } from "react-router-dom";
import { Home, List, Users, Settings } from "lucide-react";

export default function Sidebar({ collapsed, onNavigate }) {
  const { pathname } = useLocation();

  const item = (to, label, Icon) => (
    <Link
      to={to}
      onClick={onNavigate}
      className={`flex items-center gap-3 px-3 py-2 rounded ${
        pathname === to
          ? "bg-indigo-100 text-indigo-700"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon size={18} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );

  return (
    <div className="h-full flex flex-col p-2">
      {!collapsed && (
        <div className="text-lg font-semibold mb-6 px-2">
          Menu
        </div>
      )}

      <nav className="space-y-1">
        {item("/dashboard", "Dashboard", Home)}
        {item("/transactions", "Transactions", List)}
        {item("/family", "Family", Users)}
        {item("/settings", "Settings", Settings)}
      </nav>
    </div>
  );
}
