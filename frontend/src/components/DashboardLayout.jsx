// import React from "react";
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";
// import { AuthProvider } from "../hooks/useAuth";

// export default function DashboardLayout({ children }) {
//   return (
//     <AuthProvider>
//       <div className="min-h-screen flex">
//         <Sidebar />
//         <div className="flex-1 min-h-screen bg-gray-50">
//           <Navbar />
//           <main className="p-6">{children}</main>
//         </div>
//       </div>
//     </AuthProvider>
//   );
// }

// src/components/DashboardLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
