import React from "react";

export default function AccentButton({ children, className = "", ...props }) {
  return (
    <button {...props} className={"inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium " +
      "shadow-sm btn-primary " + className}>
      {children}
    </button>
  );
}
