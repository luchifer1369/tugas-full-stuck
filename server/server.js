// ✅ Import app dari file express.js yang sudah dikonfigurasi penuh
import app from "./express.js";

// ✅ Import konfigurasi umum (port, database URI, dll)
import config from "./config/config.js";

// ✅ Ambil port dari konfigurasi (bisa dari .env atau default ke 3000)
const PORT = config.port;

// ✅ Jalankan server menggunakan listen
app.listen(PORT, (err) => {
  if (err) {
    // ❌ Jika gagal, tampilkan pesan error
    console.error("❌ Server failed to start:", err);
  } else {
    // ✅ Jika berhasil, tampilkan pesan berhasil
    console.info(`✅ Server started on port ${PORT}`);
  }
});
