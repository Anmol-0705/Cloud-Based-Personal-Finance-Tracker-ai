// src/pages/Transactions.jsx
// import React, { useEffect, useState } from "react";
// import api from "../api/api";
// import TransactionModal from "../components/TransactionModal";

// export default function Transactions() {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       setLoading(true);
//       try {
//         const families = await api.get("/families").catch(() => null);
//         const familyId = families?.data?.[0]?.id;
//         if (!familyId) {
//           setTransactions([]);
//         } else {
//           const res = await api.get(`/families/${familyId}/transactions`);
//           if (mounted) setTransactions(res.data || []);
//         }
//       } catch (e) {
//         setTransactions([]);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     load();
//     return () => { mounted = false; };
//   }, []);

//   async function handleSave(tx) {
//     try {
//       // If editing exists, call update else create
//       if (editing) {
//         await api.put(`/transactions/${editing.id}`, tx).catch(()=>null);
//       } else {
//         await api.post(`/families/1/transactions`, tx).catch(()=>null); // fallback family id - update if your API differs
//       }
//       // reload
//       const families = await api.get("/families").catch(() => null);
//       const familyId = families?.data?.[0]?.id;
//       const res = familyId ? await api.get(`/families/${familyId}/transactions`) : { data: [] };
//       setTransactions(res.data || []);
//       setModalOpen(false);
//       setEditing(null);
//     } catch (e) {
//       alert("Save failed");
//     }
//   }

//   function handleEdit(item) {
//     setEditing(item);
//     setModalOpen(true);
//   }

//   function handleAdd() {
//     setEditing(null);
//     setModalOpen(true);
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold">Transactions</h2>
//         <div>
//           <button onClick={handleAdd} className="px-3 py-2 rounded-md bg-indigo-600 text-white">Add</button>
//         </div>
//       </div>

//       <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
//         {loading ? <div>Loading...</div> : (
//           <>
//             {transactions.length === 0 ? (
//               <div className="text-gray-500">No transactions yet.</div>
//             ) : (
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="text-sm text-gray-600">
//                     <th className="pb-2">Date</th>
//                     <th className="pb-2">Description</th>
//                     <th className="pb-2">Category</th>
//                     <th className="pb-2">Amount</th>
//                     <th className="pb-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {transactions.map(tx => (
//                     <tr key={tx.id} className="border-t">
//                       <td className="py-2">{new Date(tx.date).toLocaleDateString()}</td>
//                       <td className="py-2">{tx.merchant || tx.description}</td>
//                       <td className="py-2">{tx.category}</td>
//                       <td className="py-2">₹{tx.amount}</td>
//                       <td className="py-2">
//                         <button className="text-sm text-indigo-600 mr-2" onClick={() => handleEdit(tx)}>Edit</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </>
//         )}
//       </div>

//       <TransactionModal
//         open={modalOpen}
//         initial={editing}
//         onClose={() => { setModalOpen(false); setEditing(null); }}
//         onSave={handleSave}
//       />
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import api from "@/api/api";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [category, setCategory] = useState("all");
  const [merchant, setMerchant] = useState("all");
  const [range, setRange] = useState([0, 10000]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      setLoading(true);
      const res = await api.get("/transactions");
      setTransactions(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Derived filter values
  const categories = useMemo(
    () => ["all", ...new Set(transactions.map(t => t.category).filter(Boolean))],
    [transactions]
  );

  const merchants = useMemo(
    () => ["all", ...new Set(transactions.map(t => t.merchant).filter(Boolean))],
    [transactions]
  );

  // Apply filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const amount = Number(t.amount || 0);
      if (category !== "all" && t.category !== category) return false;
      if (merchant !== "all" && t.merchant !== merchant) return false;
      if (amount < range[0] || amount > range[1]) return false;
      return true;
    });
  }, [transactions, category, merchant, range]);

  async function deleteTransaction(id) {
    if (!confirm("Delete this transaction?")) return;
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Transactions</h1>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm">
          <Plus className="w-4 h-4" />
          Add transaction
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Category */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full mt-1 border rounded-md px-2 py-1 text-sm"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Merchant */}
          <div>
            <label className="text-sm text-gray-600">Merchant</label>
            <select
              value={merchant}
              onChange={e => setMerchant(e.target.value)}
              className="w-full mt-1 border rounded-md px-2 py-1 text-sm"
            >
              {merchants.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Amount inputs */}
          <div>
            <label className="text-sm text-gray-600">Amount range</label>
            <div className="flex gap-2 mt-1">
              <input
                type="number"
                value={range[0]}
                onChange={e => setRange([Number(e.target.value), range[1]])}
                className="w-full border rounded-md px-2 py-1 text-sm"
              />
              <input
                type="number"
                value={range[1]}
                onChange={e => setRange([range[0], Number(e.target.value)])}
                className="w-full border rounded-md px-2 py-1 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Slider */}
        <div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            min={0}
            max={10000}
            step={100}
            value={range}
            onValueChange={setRange}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-indigo-600 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-4 h-4 bg-indigo-600 rounded-full" />
            <Slider.Thumb className="block w-4 h-4 bg-indigo-600 rounded-full" />
          </Slider.Root>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-gray-500">Loading transactions…</div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">
            No transactions match your filters.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Merchant</th>
                <th className="text-left p-3">Category</th>
                <th className="text-right p-3">Amount</th>
                <th className="text-right p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(tx => (
                <tr key={tx.id} className="border-b last:border-none">
                  <td className="p-3">{tx.date}</td>
                  <td className="p-3">{tx.merchant || "-"}</td>
                  <td className="p-3">{tx.category || "-"}</td>
                  <td className="p-3 text-right">₹{tx.amount}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
