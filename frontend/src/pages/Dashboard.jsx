import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/auth";

export default function Dashboard() {
  const { token } = useAuth();
  const [summary, setSummary] = useState(null);
  const [familyId, setFamilyId] = useState(null);

  useEffect(() => {
    async function createFamily() {
      const res = await api.post("/families", { name: "Demo Family" });
      setFamilyId(res.data.id);
    }
    if (token) createFamily();
  }, [token]);

  useEffect(() => {
    async function loadSummary() {
      if (!familyId) return;
      const res = await api.get(`/families/${familyId}/dashboard`);
      setSummary(res.data);
    }
    loadSummary();
  }, [familyId]);

  if (!token) return <p>Please login first.</p>;
  if (!summary) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p className="text-lg">Total last 30 days: ₹{summary.total_last_30_days}</p>
      <ul>
        {summary.by_category.map((c) => (
          <li key={c.category}>{c.category}: ₹{c.amount}</li>
        ))}
      </ul>
    </div>
  );
}
