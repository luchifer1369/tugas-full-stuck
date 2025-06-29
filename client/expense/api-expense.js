// 📂 Lokasi: client/expense/api-expense.js

// 📦 Digunakan untuk membuat string query dari objek parameter
import queryString from "query-string";

// 📌 Fungsi untuk membuat data pengeluaran baru
const create = async (credentials, expense) => {
  try {
    const response = await fetch("/api/expenses/", {
      method: "POST", // Metode HTTP POST untuk membuat data baru
      headers: {
        Accept: "application/json", // Menerima response dalam format JSON
        "Content-Type": "application/json", // Mengirim data dalam format JSON
        Authorization: `Bearer ${credentials.t}`, // Token autentikasi Bearer
      },
      body: JSON.stringify(expense), // Mengubah objek expense menjadi JSON string
    });
    return await response.json(); // Mengembalikan response sebagai JSON
  } catch (err) {
    console.error(err); // Menampilkan error di konsol jika request gagal
  }
};

// 📌 Fungsi untuk mengambil daftar pengeluaran berdasarkan parameter user dan waktu
const listByUser = async (params, credentials, signal) => {
  const query = queryString.stringify(params); // Mengubah params ke format query string
  try {
    const response = await fetch(`/api/expenses?${query}`, {
      method: "GET", // Mengambil data (baca)
      signal: signal, // Untuk mengontrol fetch (bisa dibatalkan)
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json(); // Mengembalikan data expense dari backend
  } catch (err) {
    console.error(err);
  }
};

// 📌 Fungsi untuk memperbarui data expense berdasarkan ID
const update = async (params, credentials, expense) => {
  try {
    const response = await fetch(`/api/expenses/${params.expenseId}`, {
      method: "PUT", // PUT digunakan untuk update data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(expense), // Kirim data baru yang diupdate
    });
    return await response.json(); // Mengembalikan hasil update
  } catch (err) {
    console.error(err);
  }
};

// 📌 Fungsi untuk menghapus expense berdasarkan ID
const remove = async (params, credentials) => {
  try {
    const response = await fetch(`/api/expenses/${params.expenseId}`, {
      method: "DELETE", // DELETE untuk menghapus data
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json(); // Mengembalikan status atau pesan dari server
  } catch (err) {
    console.error(err);
  }
};

// 📌 Fungsi untuk menampilkan ringkasan pengeluaran bulan ini (preview)
const currentMonthPreview = async (credentials, signal) => {
  try {
    const response = await fetch("/api/expenses/current/preview", {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json(); // Mengembalikan data ringkasan bulanan
  } catch (err) {
    console.error(err);
  }
};

const expenseByCategory = async (credentials, signal) => {
  try {
    let response = await fetch("/api/expenses/category", {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// 🚀 Mengekspor semua fungsi API yang dapat digunakan oleh komponen lain
export {
  create,
  listByUser,
  update,
  remove,
  currentMonthPreview,
  expenseByCategory,
};
