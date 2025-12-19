import { useState } from "react";
import { X, Plus } from "lucide-react";

export default function Family() {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "You",
      email: "you@example.com",
      budget: 20000,
      spent: 12500,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function addMember() {
    if (!name || !email) return;

    setMembers([
      ...members,
      {
        id: Date.now(),
        name,
        email,
        budget: 0,
        spent: Math.floor(Math.random() * 15000), // mock spend
      },
    ]);

    setName("");
    setEmail("");
    setOpen(false);
  }

  function updateBudget(id, value) {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, budget: value } : m
      )
    );
  }

  const maxSpent =
    Math.max(...members.map((m) => m.spent), 1);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-2">Family</h1>
        <p className="text-sm text-gray-600">
          Manage family members, budgets, and shared spending.
        </p>
      </div>

      {/* MEMBERS HEADER */}
      <div className="bg-white border rounded-xl p-6 flex items-center justify-between">
        <div>
          <div className="font-medium">Family Members</div>
          <div className="text-sm text-gray-500">
            Invite members and assign budgets
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 text-white"
        >
          <Plus size={16} />
          Invite Member
        </button>
      </div>

      {/* MEMBERS LIST */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        {members.map((m) => (
          <div
            key={m.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b pb-3"
          >
            <div>
              <div className="font-medium">{m.name}</div>
              <div className="text-sm text-gray-500">
                {m.email}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Monthly Budget
              </span>
              <input
                type="number"
                value={m.budget}
                onChange={(e) =>
                  updateBudget(m.id, Number(e.target.value))
                }
                className="border rounded px-2 py-1 w-28"
                placeholder="₹0"
              />
            </div>
          </div>
        ))}
      </div>

      {/* SPENDING CHART */}
      <div className="bg-white border rounded-xl p-6">
        <div className="font-medium mb-4">
          Member Spending Overview
        </div>

        <div className="space-y-4">
          {members.map((m) => {
            const percent = (m.spent / maxSpent) * 100;
            return (
              <div key={m.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{m.name}</span>
                  <span className="text-gray-600">
                    ₹{m.spent}
                  </span>
                </div>

                <div className="h-3 bg-gray-100 rounded">
                  <div
                    className="h-3 bg-indigo-600 rounded"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INVITE MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              Invite Family Member
            </h3>

            <div className="space-y-3">
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                onClick={addMember}
                className="w-full bg-indigo-600 text-white py-2 rounded"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


