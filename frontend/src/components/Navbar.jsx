import React from "react";
import { Bell, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between bg-white px-6 py-3 border-b">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">Family Finance Tracker</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded hover:bg-gray-100"><Bell /></button>
        <div className="flex items-center gap-2">
          <User />
          <button className="text-sm text-gray-700" onClick={() => logout()}>Logout</button>
        </div>
      </div>
    </header>
  );
}
