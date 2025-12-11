// import React from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./index.css";
// import { ThemeProvider } from "./components/theme-provider";
// import { AuthProvider } from "./hooks/useAuth"; // <--- ensure this path is correct

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ThemeProvider>
//       <AuthProvider>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </AuthProvider>
//     </ThemeProvider>
//   </React.StrictMode>
// );

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import "../src/index.css";
import "./index.css";
import { AuthProvider } from "@/hooks/useAuth";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
