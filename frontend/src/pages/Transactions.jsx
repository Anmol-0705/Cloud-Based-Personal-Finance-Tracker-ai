// import React, { useState, useEffect } from "react";
// import api from "../api/api";

// export default function Transactions() {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     async function load() {
//       // List first family and fetch transactions
//       const families = await api.get("/families");
//       const familyId = families.data[0]?.id;
//       if (!familyId) return;
//       const res = await api.get(`/families/${familyId}/transactions`);
//       setTransactions(res.data);
//     }
//     load();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Transactions</h2>
//       <div className="bg-white rounded shadow p-4">
//         <table className="w-full">
//           <thead>
//             <tr className="text-left">
//               <th>Date</th><th>Merchant</th><th>Category</th><th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map(tx => (
//               <tr key={tx.id}>
//                 <td>{new Date(tx.date).toLocaleDateString()}</td>
//                 <td>{tx.merchant || tx.description}</td>
//                 <td>{tx.category}</td>
//                 <td>₹{tx.amount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
// src/pages/Transactions.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Transactions(){
  const [transactions,setTransactions] = useState([]);
  useEffect(()=>{
    async function load(){
      try{
        const families = await api.get("/families");
        const familyId = families.data?.[0]?.id;
        if(!familyId) return setTransactions([]);
        const res = await api.get(`/families/${familyId}/transactions`);
        setTransactions(res.data || []);
      }catch(e){
        setTransactions([]);
      }
    }
    load();
  },[]);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
        {transactions.length === 0 ? (
          <div className="text-gray-500">No transactions yet.</div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Description</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} className="border-t">
                    <td className="py-2">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="py-2">{tx.merchant || tx.description}</td>
                    <td className="py-2">{tx.category}</td>
                    <td className="py-2">₹{tx.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
