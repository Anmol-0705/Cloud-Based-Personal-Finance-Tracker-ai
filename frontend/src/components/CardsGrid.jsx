// src/components/CardsGrid.jsx
import React from "react";

function Card({ title, value, delta, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500">{title}</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
        </div>
        <div className={`text-sm ${delta >= 0 ? "text-green-600" : "text-red-600"}`}>
          {delta >= 0 ? `+${delta}%` : `${delta}%`}
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-400">
        {children}
      </div>
    </div>
  );
}

export default function CardsGrid({ data = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="Monthly spending" value={`₹${data.monthly ?? "0"}`} delta={data.monthly_delta ?? 2}>
        This is total spent in the last 30 days.
      </Card>

      <Card title="Avg / month" value={`₹${data.avg_month ?? "0"}`} delta={data.avg_delta ?? -1}>
        Rolling average of monthly expenses.
      </Card>

      <Card title="Active members" value={`${data.members ?? 1}`} delta={0}>
        Tracked across family accounts.
      </Card>
    </div>
  );
}
