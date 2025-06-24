// 📂 Lokasi: client/main.js

// 🔽 Import React utama
import React from "react";

// 🔽 Gunakan React 18 createRoot API
import { createRoot } from "react-dom/client";

// 🔽 BrowserRouter untuk routing SPA berbasis URL
import { BrowserRouter } from "react-router-dom";

// 🔽 Komponen utama aplikasi
import App from "./App.js";

// 🔽 Ambil elemen DOM utama dari index.html (biasanya <div id="root"></div>)
const container = document.getElementById("root");

// 🔽 Inisialisasi root React 18
const root = createRoot(container);

// 🔽 Render aplikasi di dalam BrowserRouter (dibutuhkan untuk routing)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// 🔁 Hot Reloading (aktif hanya saat development mode dengan Vite atau bundler modern)
// Ini mencegah reload manual saat mengedit file
if (import.meta.hot) {
  import.meta.hot.accept();
}
