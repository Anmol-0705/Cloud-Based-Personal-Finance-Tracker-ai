// src/components/DashboardHeader.jsx
import React from "react";

export default function DashboardHeader({ title = "Dashboard", subtitle }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button className="px-3 py-2 text-sm rounded-md border border-gray-200 bg-white hover:shadow">Export</button>
        <button className="px-3 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Add transaction</button>
      </div>
    </div>
  );
}
