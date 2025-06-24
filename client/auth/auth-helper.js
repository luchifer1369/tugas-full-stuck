// 📂 Lokasi: client/auth/auth-helper.js

// Import fungsi signout dari modul API untuk logout dari server
import { signout } from "./api-auth.js";

// Objek auth untuk menangani otentikasi pengguna di sisi client
const auth = {
  // Fungsi untuk memeriksa apakah pengguna sudah login (token tersimpan di sessionStorage)
  isAuthenticated() {
    // Jika kode dijalankan di luar browser (misalnya saat server rendering), kembalikan false
    if (typeof window === "undefined") return false;

    // Ambil JWT dari sessionStorage dan parse ke bentuk objek
    const jwt = sessionStorage.getItem("jwt");
    return jwt ? JSON.parse(jwt) : false;
  },

  // Fungsi untuk menyimpan JWT ke sessionStorage setelah login berhasil
  authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
      // Simpan JWT dalam format JSON string ke sessionStorage
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    }
    cb(); // Jalankan callback setelah penyimpanan berhasil
  },

  // Fungsi untuk menghapus JWT dari sessionStorage saat logout
  clearJWT(cb) {
    if (typeof window !== "undefined") {
      // Hapus token dari sessionStorage
      sessionStorage.removeItem("jwt");
    }
    cb(); // Jalankan callback setelah token dihapus

    // Opsional: Panggil fungsi logout dari server dan hapus cookie token
    signout().then(() => {
      // Hapus cookie 't' yang digunakan untuk menyimpan token sisi server (jika ada)
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};

// Ekspor objek auth agar bisa digunakan di seluruh aplikasi
export default auth;
