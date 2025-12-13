// src/pages/Transactions.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";
import TransactionModal from "../components/TransactionModal";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const families = await api.get("/families").catch(() => null);
        const familyId = families?.data?.[0]?.id;
        if (!familyId) {
          setTransactions([]);
        } else {
          const res = await api.get(`/families/${familyId}/transactions`);
          if (mounted) setTransactions(res.data || []);
        }
      } catch (e) {
        setTransactions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  async function handleSave(tx) {
    try {
      // If editing exists, call update else create
      if (editing) {
        await api.put(`/transactions/${editing.id}`, tx).catch(()=>null);
      } else {
        await api.post(`/families/1/transactions`, tx).catch(()=>null); // fallback family id - update if your API differs
      }
      // reload
      const families = await api.get("/families").catch(() => null);
      const familyId = families?.data?.[0]?.id;
      const res = familyId ? await api.get(`/families/${familyId}/transactions`) : { data: [] };
      setTransactions(res.data || []);
      setModalOpen(false);
      setEditing(null);
    } catch (e) {
      alert("Save failed");
    }
  }

  function handleEdit(item) {
    setEditing(item);
    setModalOpen(true);
  }

  function handleAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div>
          <button onClick={handleAdd} className="px-3 py-2 rounded-md bg-indigo-600 text-white">Add</button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
        {loading ? <div>Loading...</div> : (
          <>
            {transactions.length === 0 ? (
              <div className="text-gray-500">No transactions yet.</div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-gray-600">
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Description</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(tx => (
                    <tr key={tx.id} className="border-t">
                      <td className="py-2">{new Date(tx.date).toLocaleDateString()}</td>
                      <td className="py-2">{tx.merchant || tx.description}</td>
                      <td className="py-2">{tx.category}</td>
                      <td className="py-2">₹{tx.amount}</td>
                      <td className="py-2">
                        <button className="text-sm text-indigo-600 mr-2" onClick={() => handleEdit(tx)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>

      <TransactionModal
        open={modalOpen}
        initial={editing}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
      />
    </div>
  );
}


// src/pages/Transactions.jsx
// import React, { useEffect, useState } from "react";
// import api from "../api/api";
// import TransactionModal from "../components/TransactionModal";
// import ConfirmDialog from "../components/ConfirmDialog";
// import toast from "react-hot-toast";

// export default function Transactions() {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [toDelete, setToDelete] = useState(null);

//   // helper to get family id (first family)
//   async function getFamilyId() {
//     try {
//       const families = await api.get("/families");
//       return families?.data?.[0]?.id ?? null;
//     } catch (e) {
//       return null;
//     }
//   }

//   async function loadTransactions() {
//     setLoading(true);
//     try {
//       const familyId = await getFamilyId();
//       if (!familyId) {
//         setTransactions([]);
//       } else {
//         const res = await api.get(`/families/${familyId}/transactions`);
//         setTransactions(res.data || []);
//       }
//     } catch (e) {
//       console.error(e);
//       toast.error("Failed to load transactions");
//       setTransactions([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     let mounted = true;
//     loadTransactions();
//     return () => { mounted = false; };
//   }, []);

//   async function handleSave(tx) {
//     try {
//       const familyId = await getFamilyId();
//       if (!familyId) {
//         toast.error("No family found to attach transaction");
//         return;
//       }

//       if (editing) {
//         // Update existing transaction
//         await api.put(`/transactions/${editing.id}`, tx);
//         toast.success("Transaction updated");
//       } else {
//         // Create new transaction under family
//         await api.post(`/families/${familyId}/transactions`, tx);
//         toast.success("Transaction added");
//       }

//       setModalOpen(false);
//       setEditing(null);
//       await loadTransactions();
//     } catch (e) {
//       console.error(e);
//       toast.error("Failed to save transaction");
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

//   function confirmDelete(item) {
//     setToDelete(item);
//     setConfirmOpen(true);
//   }

//   async function doDelete() {
//     if (!toDelete) return;
//     try {
//       await api.delete(`/transactions/${toDelete.id}`);
//       toast.success("Transaction deleted");
//       setConfirmOpen(false);
//       setToDelete(null);
//       await loadTransactions();
//     } catch (e) {
//       console.error(e);
//       toast.error("Delete failed");
//     }
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
//         {loading ? (
//           // skeleton list
//           <div className="space-y-4">
//             {[1,2,3,4].map(i => (
//               <div key={i} className="animate-pulse flex items-center gap-4">
//                 <div className="h-6 w-24 bg-gray-200 rounded"></div>
//                 <div className="h-6 flex-1 bg-gray-200 rounded"></div>
//                 <div className="h-6 w-20 bg-gray-200 rounded"></div>
//                 <div className="h-6 w-12 bg-gray-200 rounded"></div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <>
//             {transactions.length === 0 ? (
//               <div className="text-gray-500">No transactions yet.</div>
//             ) : (
//               <div className="overflow-auto">
//                 <table className="w-full text-left">
//                   <thead>
//                     <tr className="text-sm text-gray-600">
//                       <th className="pb-2">Date</th>
//                       <th className="pb-2">Description</th>
//                       <th className="pb-2">Category</th>
//                       <th className="pb-2">Amount</th>
//                       <th className="pb-2">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {transactions.map(tx => (
//                       <tr key={tx.id} className="border-t">
//                         <td className="py-2">{new Date(tx.date).toLocaleDateString()}</td>
//                         <td className="py-2">{tx.merchant || tx.description}</td>
//                         <td className="py-2">{tx.category}</td>
//                         <td className="py-2">₹{tx.amount}</td>
//                         <td className="py-2">
//                           <button className="text-sm text-indigo-600 mr-3" onClick={() => handleEdit(tx)}>Edit</button>
//                           <button className="text-sm text-red-600" onClick={() => confirmDelete(tx)}>Delete</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
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

//       <ConfirmDialog
//         open={confirmOpen}
//         title="Delete transaction"
//         text="Are you sure you want to delete this transaction? This action cannot be undone."
//         onCancel={() => { setConfirmOpen(false); setToDelete(null); }}
//         onConfirm={doDelete}
//       />
//     </div>
//   );
// }
