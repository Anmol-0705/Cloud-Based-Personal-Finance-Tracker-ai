// src/components/ConfirmDialog.jsx
import React from "react";

export default function ConfirmDialog({ open, title = "Are you sure?", text = "", onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel}></div>

      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 z-10">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {text && <p className="text-sm text-gray-600 mb-4">{text}</p>}
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-2 border rounded">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}
