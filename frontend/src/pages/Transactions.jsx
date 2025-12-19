import { useEffect, useState } from "react";
import api from "@/api/api";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

const MIN = 0;
const MAX = 100000;

export default function Transactions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FILTER STATE */
  const [categoryFilter, setCategoryFilter] = useState("");
  const [merchantFilter, setMerchantFilter] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(50000);

  /* MODAL STATE */
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [merchant, setMerchant] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newMerchant, setNewMerchant] = useState("");

  const categories = ["Food", "Transport", "Shopping"];
  const merchants = ["Zomato", "Uber", "Amazon"];

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/transactions");
      setItems(res.data || []);
    } catch {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const saveTransaction = async () => {
    const finalCategory = category === "__new" ? newCategory : category;
    const finalMerchant = merchant === "__new" ? newMerchant : merchant;

    if (!amount || !finalCategory || !finalMerchant) {
      toast.error("All fields required");
      return;
    }

    try {
      await api.post("/transactions", {
        amount: Number(amount),
        category: finalCategory,
        merchant: finalMerchant,
      });
      toast.success("Transaction added");
      setOpen(false);
      setAmount("");
      setCategory("");
      setMerchant("");
      setNewCategory("");
      setNewMerchant("");
      fetchTransactions();
    } catch {
      toast.error("Failed to add transaction");
    }
  };

  const filtered = items.filter(
    (tx) =>
      (!categoryFilter || tx.category === categoryFilter) &&
      (!merchantFilter || tx.merchant === merchantFilter) &&
      tx.amount >= minAmount &&
      tx.amount <= maxAmount
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} />
          Add Transaction
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-4 space-y-4">
        <h3 className="font-medium">Filters</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category */}
          <select
            className="border px-3 py-2 rounded"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* Merchant */}
          <select
            className="border px-3 py-2 rounded"
            value={merchantFilter}
            onChange={(e) => setMerchantFilter(e.target.value)}
          >
            <option value="">All merchants</option>
            {merchants.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          {/* SINGLE RANGE BAR */}
          <div>
            <label className="text-sm font-medium block mb-2">
              Amount range
            </label>

            <div className="relative h-6">
              {/* Track */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded -translate-y-1/2" />

              {/* Active range */}
              <div
                className="absolute top-1/2 h-1 bg-indigo-500 rounded -translate-y-1/2"
                style={{
                  left: `${(minAmount / MAX) * 100}%`,
                  right: `${100 - (maxAmount / MAX) * 100}%`,
                }}
              />

              {/* Min thumb */}
              <input
                type="range"
                min={MIN}
                max={MAX}
                value={minAmount}
                onChange={(e) =>
                  setMinAmount(Math.min(Number(e.target.value), maxAmount - 100))
                }
                className="absolute w-full pointer-events-none appearance-none bg-transparent
                  [&::-webkit-slider-thumb]:pointer-events-auto
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-indigo-600"
              />

              {/* Max thumb */}
              <input
                type="range"
                min={MIN}
                max={MAX}
                value={maxAmount}
                onChange={(e) =>
                  setMaxAmount(Math.max(Number(e.target.value), minAmount + 100))
                }
                className="absolute w-full pointer-events-none appearance-none bg-transparent
                  [&::-webkit-slider-thumb]:pointer-events-auto
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-indigo-600"
              />
            </div>

            {/* INPUTS */}
            <div className="flex gap-2 mt-3">
              <input
                type="number"
                className="border px-2 py-1 rounded w-1/2"
                value={minAmount}
                onChange={(e) =>
                  setMinAmount(Math.min(Number(e.target.value), maxAmount))
                }
              />
              <input
                type="number"
                className="border px-2 py-1 rounded w-1/2"
                value={maxAmount}
                onChange={(e) =>
                  setMaxAmount(Math.max(Number(e.target.value), minAmount))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white border rounded-xl p-4">
        {loading ? (
          <div className="animate-pulse space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No transactions found
          </div>
        ) : (
          filtered.map((tx) => (
            <div key={tx.id} className="border-b py-3">
              <div className="font-medium">
                {tx.category} — {tx.merchant}
              </div>
              <div className="text-sm text-gray-500">₹{tx.amount}</div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="font-semibold mb-4">Add Transaction</h3>

            <input
              type="number"
              placeholder="Amount"
              className="w-full border px-3 py-2 mb-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              className="w-full border px-3 py-2 mb-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
              <option value="__new">+ Add new</option>
            </select>

            {category === "__new" && (
              <input
                className="w-full border px-3 py-2 mb-2"
                placeholder="New category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            )}

            <select
              className="w-full border px-3 py-2 mb-2"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
            >
              <option value="">Select Merchant</option>
              {merchants.map((m) => (
                <option key={m}>{m}</option>
              ))}
              <option value="__new">+ Add new</option>
            </select>

            {merchant === "__new" && (
              <input
                className="w-full border px-3 py-2 mb-3"
                placeholder="New merchant"
                value={newMerchant}
                onChange={(e) => setNewMerchant(e.target.value)}
              />
            )}

            <button
              onClick={saveTransaction}
              className="w-full bg-indigo-600 text-white py-2 rounded"
            >
              Save Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
