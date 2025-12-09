import React, { useEffect, useState } from "react";
import ChartCard from "../components/ChartCard";
import api from "../api/api";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [familyId, setFamilyId] = useState(null);

  useEffect(() => {
    async function ensureFamily() {
      try {
        const res = await api.post("/families", { name: "Demo Family" });
        setFamilyId(res.data.id);
      } catch (e) {
        // ignore if already exists
      }
    }
    ensureFamily();
  }, []);

  useEffect(() => {
    async function load() {
      if (!familyId) return;
      const res = await api.get(`/families/${familyId}/dashboard`);
      setSummary(res.data);
    }
    load();
  }, [familyId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <ChartCard title="Spending (last 30 days)">
          {summary ? <div>₹{summary.total_last_30_days}</div> : <div>Loading...</div>}
        </ChartCard>
      </div>
      <div>
        <ChartCard title="By Category">
          {summary ? (
            <ul>
              {summary.by_category.map(c => (
                <li key={c.category} className="flex justify-between py-1">
                  <span>{c.category}</span>
                  <span>₹{c.amount}</span>
                </li>
              ))}
            </ul>
          ) : <div>Loading...</div>}
        </ChartCard>
      </div>
    </div>
  );
}
