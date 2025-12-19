import { useEffect, useState } from "react";
import { Plus, Download, Wallet } from "lucide-react";
import api from "@/api/api";

export default function Dashboard() {
  const [type, setType] = useState("debit");
  const [range, setRange] = useState("30");
  const [total, setTotal] = useState(0);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      api.get("/dashboard/summary"),
      api.get("/transactions"),
    ])
      .then(([summaryRes, txRes]) => {
        setTotal(summaryRes.data.total_spending || 0);
        const list = Array.isArray(txRes.data) ? txRes.data : [];
        setRecent(list.slice(0, 10));
      })
      .catch(() => {
        setTotal(0);
        setRecent([]);
      })
      .finally(() => setLoading(false));
  }, [type, range]);

  return (
    <div className="space-y-6">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TOTAL SPENDING */}
        <div className="bg-white rounded-xl border p-5 lg:col-span-2">
          {loading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-10 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-56 bg-gray-200 rounded" />
            </div>
          ) : (
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500">
                  Total Spending (last {range} days)
                </div>
                <div className="text-3xl font-semibold mt-1">
                  ₹{total}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Computed from transactions
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="flex rounded-md border overflow-hidden text-sm">
                  <button
                    onClick={() => setType("debit")}
                    className={`px-3 py-1 ${
                      type === "debit"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    Debit
                  </button>
                  <button
                    onClick={() => setType("credit")}
                    className={`px-3 py-1 ${
                      type === "credit"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    Credit
                  </button>
                </div>

                <select
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  className="border rounded-md text-sm px-2 py-1"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="180">Last 6 months</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* CATEGORY PLACEHOLDER */}
        <div className="bg-white rounded-xl border p-5">
          <div className="text-sm font-medium mb-2">By category</div>
          <div className="text-sm text-gray-500">
            Charts coming soon
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RECENT TRANSACTIONS */}
        <div className="bg-white rounded-xl border p-5">
          <div className="text-sm font-medium mb-3">
            Recent Transactions
          </div>

          {loading ? (
            <div className="space-y-2 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="text-sm text-gray-500">
              No recent transactions
            </div>
          ) : (
            <ul className="space-y-2">
              {recent.map((tx) => (
                <li
                  key={tx.id}
                  className="flex justify-between text-sm border-b pb-1"
                >
                  <span>{tx.category || "Unknown"}</span>
                  <span className="font-medium">₹{tx.amount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-xl border p-5">
          <div className="text-sm font-medium mb-4">
            Quick Actions
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center gap-2 border rounded-md px-3 py-2 hover:bg-gray-50">
              <Plus size={16} />
              Add Transaction
            </button>

            <button className="w-full flex items-center gap-2 border rounded-md px-3 py-2 hover:bg-gray-50">
              <Wallet size={16} />
              Set Budget
            </button>

            <button className="w-full flex items-center gap-2 border rounded-md px-3 py-2 hover:bg-gray-50">
              <Download size={16} />
              Download Statement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
