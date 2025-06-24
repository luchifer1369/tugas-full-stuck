// 📂 Lokasi: server/helpers/dbErrorHandler.js

/**
 * Fungsi untuk menangani dan mengekstrak pesan error dari MongoDB/Mongoose
 * Digunakan untuk mengembalikan pesan error yang lebih informatif ke frontend.
 */
const getErrorMessage = (err) => {
  // ❗ Jika error disebabkan oleh duplicate key (misalnya email sudah terdaftar)
  if (err.code && err.code === 11000) {
    return "Email is already registered";
  }

  // ⚠️ Jika error berasal dari validasi Mongoose (misal field required tidak diisi)
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        return err.errors[errName].message; // Ambil pesan validasi pertama
      }
    }
  }

  // 🚨 Jika jenis error tidak diketahui
  return "Something went wrong";
};

// 🔄 Ekspor helper agar bisa digunakan di controller
export default { getErrorMessage };
