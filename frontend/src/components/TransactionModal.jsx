// // src/components/TransactionModal.jsx
// import React, { useState, useEffect } from "react";

// export default function TransactionModal({ open, initial = null, onClose, onSave }) {
//   const [form, setForm] = useState({
//     date: "",
//     amount: "",
//     category: "",
//     description: "",
//   });

//   useEffect(() => {
//     if (initial) {
//       setForm({
//         date: initial.date ? initial.date.split("T")[0] : "",
//         amount: initial.amount ?? "",
//         category: initial.category ?? "",
//         description: initial.description ?? "",
//       });
//     } else {
//       setForm({ date: "", amount: "", category: "", description: "" });
//     }
//   }, [initial, open]);

//   if (!open) return null;

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   }

//   function submit(e) {
//     e.preventDefault();
//     // Basic validation
//     if (!form.amount || !form.date) {
//       alert("Please enter date and amount");
//       return;
//     }
//     onSave({
//       ...form,
//       amount: parseFloat(form.amount),
//     });
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

//       <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-6 z-10">
//         <h3 className="text-lg font-semibold mb-3">{initial ? "Edit transaction" : "Add transaction"}</h3>
//         <form onSubmit={submit} className="space-y-3">
//           <div>
//             <label className="text-sm text-gray-700 block mb-1">Date</label>
//             <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
//           </div>
//           <div>
//             <label className="text-sm text-gray-700 block mb-1">Amount</label>
//             <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
//           </div>
//           <div>
//             <label className="text-sm text-gray-700 block mb-1">Category</label>
//             <input name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
//           </div>
//           <div>
//             <label className="text-sm text-gray-700 block mb-1">Description</label>
//             <input name="description" value={form.description} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
//           </div>

//           <div className="flex items-center justify-end gap-2 mt-4">
//             <button type="button" onClick={onClose} className="px-3 py-2 rounded-md border">Cancel</button>
//             <button type="submit" className="px-3 py-2 rounded-md bg-indigo-600 text-white">Save</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




// src/components/TransactionModal.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function TransactionModal({ open, initial = null, onClose, onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      date: "",
      amount: "",
      category: "",
      description: "",
    }
  });

  useEffect(() => {
    if (initial) {
      reset({
        date: initial.date ? initial.date.split("T")[0] : "",
        amount: initial.amount ?? "",
        category: initial.category ?? "",
        description: initial.description ?? "",
      });
    } else {
      reset({ date: "", amount: "", category: "", description: "" });
    }
  }, [initial, open, reset]);

  if (!open) return null;

  async function submit(values) {
    // values.amount is string -> convert to float
    const payload = {
      ...values,
      amount: parseFloat(values.amount),
    };
    await onSave(payload);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-6 z-10">
        <h3 className="text-lg font-semibold mb-3">{initial ? "Edit transaction" : "Add transaction"}</h3>

        <form onSubmit={handleSubmit(submit)} className="space-y-3">
          <div>
            <label className="text-sm text-gray-700 block mb-1">Date</label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date.message}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Amount</label>
            <input
              type="number"
              step="0.01"
              {...register("amount", {
                required: "Amount is required",
                valueAsNumber: true,
                validate: (v) => (v > 0) || "Amount must be > 0"
              })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.amount && <p className="text-xs text-red-600 mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Category</label>
            <input
              {...register("category", { required: "Category is required" })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Description</label>
            <input
              {...register("description")}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex items-center justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded-md border">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-3 py-2 rounded-md bg-indigo-600 text-white">
              {isSubmitting ? (initial ? "Saving..." : "Adding...") : (initial ? "Save" : "Add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
