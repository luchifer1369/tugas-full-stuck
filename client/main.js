// 📂 Lokasi: client/main.js

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";

// Ambil elemen root dari index.html
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Hot Reload (hanya di development)
if (import.meta.hot) {
  import.meta.hot.accept();
}
