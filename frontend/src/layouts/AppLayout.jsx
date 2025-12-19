import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout() {
  const { logout } = useAuth();

  // mobile open
  const [mobileOpen, setMobileOpen] = useState(false);
  // desktop collapse
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 md:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 inset-y-0 left-0 bg-white border-r transition-all
          ${collapsed ? "w-16" : "w-64"}
          transform md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:static
        `}
      >
        <Sidebar
          collapsed={collapsed}
          onNavigate={() => setMobileOpen(false)}
        />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>

            {/* Desktop collapse toggle */}
            <button
              className="hidden md:inline-flex"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>

            <span className="font-semibold ml-2">
              Family Finance
            </span>
          </div>

          <button
            onClick={logout}
            className="text-sm text-red-500 border border-red-300 px-3 py-1 rounded hover:bg-red-50"
          >
            Logout
          </button>
        </header>

        <main className="p-4 md:p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
