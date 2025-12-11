// import React, { useEffect, useState } from "react";
// import ChartCard from "../components/ChartCard";
// import api from "../api/api";

// export default function Dashboard() {
//   const [summary, setSummary] = useState(null);
//   const [familyId, setFamilyId] = useState(null);

//   useEffect(() => {
//     async function ensureFamily() {
//       try {
//         const res = await api.post("/families", { name: "Demo Family" });
//         setFamilyId(res.data.id);
//       } catch (e) {
//         // ignore if already exists
//       }
//     }
//     ensureFamily();
//   }, []);

//   useEffect(() => {
//     async function load() {
//       if (!familyId) return;
//       const res = await api.get(`/families/${familyId}/dashboard`);
//       setSummary(res.data);
//     }
//     load();
//   }, [familyId]);

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       <div className="lg:col-span-2">
//         <ChartCard title="Spending (last 30 days)">
//           {summary ? <div>₹{summary.total_last_30_days}</div> : <div>Loading...</div>}
//         </ChartCard>
//       </div>
//       <div>
//         <ChartCard title="By Category">
//           {summary ? (
//             <ul>
//               {summary.by_category.map(c => (
//                 <li key={c.category} className="flex justify-between py-1">
//                   <span>{c.category}</span>
//                   <span>₹{c.amount}</span>
//                 </li>
//               ))}
//             </ul>
//           ) : <div>Loading...</div>}
//         </ChartCard>
//       </div>
//     </div>
//   );
// }
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const families = await api.get("/families");
        const familyId = families.data?.[0]?.id;
        if (!familyId) { setSummary({ total_last_30_days: 0, by_category: []}); return; }
        const res = await api.get(`/families/${familyId}/dashboard`).catch(()=>null);
        setSummary(res?.data || { total_last_30_days: 0, by_category: [] });
      } catch {
        setSummary({ total_last_30_days: 0, by_category: [] });
      }
    }
    load();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Spending (last 30 days)</h3>
          <div className="mt-4 text-3xl font-semibold">₹{summary?.total_last_30_days ?? "—"}</div>
          <p className="text-sm text-gray-500 mt-2">Automatically computed from transactions</p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h4 className="font-medium">Recent activity</h4>
            <p className="text-sm text-gray-500 mt-2">No recent activity yet.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h4 className="font-medium">Quick actions</h4>
            <div className="mt-3"><a href="/transactions" className="text-indigo-600">Add transaction</a></div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h4 className="font-medium">By category</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {summary?.by_category?.length ? summary.by_category.map(c => (
              <li key={c.category} className="flex justify-between">
                <span>{c.category}</span>
                <span>₹{c.amount}</span>
              </li>
            )) : (<li className="text-gray-500">No data</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
