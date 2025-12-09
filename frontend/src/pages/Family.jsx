import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Family() {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await api.get("/families");
      setFamilies(res.data);
    }
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Families</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {families.map(f => (
          <div key={f.id} className="bg-white rounded shadow p-4">
            <h3 className="font-semibold">{f.name}</h3>
            <p className="text-sm text-gray-600">Members: {f.member_count || 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
