import React, { useState, useEffect } from "react";
import api from "../api/api";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function load() {
      // List first family and fetch transactions
      const families = await api.get("/families");
      const familyId = families.data[0]?.id;
      if (!familyId) return;
      const res = await api.get(`/families/${familyId}/transactions`);
      setTransactions(res.data);
    }
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th>Date</th><th>Merchant</th><th>Category</th><th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>{tx.merchant || tx.description}</td>
                <td>{tx.category}</td>
                <td>₹{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
