// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import CardsGrid from "../components/CardsGrid";
import api from "../api/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        // attempt to fetch dashboard summary; fallback to placeholders if fails
        const families = await api.get("/families").catch(() => null);
        const familyId = families?.data?.[0]?.id;
        if (!familyId) {
          setSummary({ monthly: 0, avg_month: 0, members: 1 });
        } else {
          const res = await api.get(`/families/${familyId}/dashboard`).catch(() => null);
          if (res?.data) {
            setSummary({
              monthly: res.data.total_last_30_days ?? 0,
              avg_month: res.data.avg_month ?? 0,
              members: res.data.members_count ?? 1,
              monthly_delta: res.data.monthly_delta ?? 0,
              avg_delta: res.data.avg_delta ?? 0
            });
          } else {
            setSummary({ monthly: 0, avg_month: 0, members: 1 });
          }
        }
      } catch (e) {
        setSummary({ monthly: 0, avg_month: 0, members: 1 });
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <DashboardHeader title="Overview" subtitle="Snapshot of family finances" />
      <div className="space-y-4">
        <CardsGrid data={summary} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Spending trend (placeholder)</h3>
            <div className="mt-4 h-40 flex items-center justify-center text-sm text-gray-400">Chart will appear here</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h4 className="font-medium">Recent activity</h4>
            <div className="mt-3 text-sm text-gray-500">No recent activity yet.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
