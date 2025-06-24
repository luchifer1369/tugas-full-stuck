// 📂 Lokasi: client/user/api-user.js

// 🔧 Fungsi untuk membuat user baru (signup)
const create = async (user) => {
  try {
    let response = await fetch("/api/users/", {
      method: "POST", // 🔼 Permintaan HTTP POST
      headers: {
        Accept: "application/json", // 🔄 Terima respons berupa JSON
        "Content-Type": "application/json", // 📤 Kirim data dalam format JSON
      },
      body: JSON.stringify(user), // 📦 Konversi objek user ke JSON string
    });
    return await response.json(); // 🔙 Kembalikan data response dalam bentuk JSON
  } catch (err) {
    console.error(err); // 🛑 Tangani error koneksi atau server
  }
};

// 📋 Fungsi untuk mengambil daftar semua user
const list = async (signal) => {
  try {
    let response = await fetch("/api/users/", {
      method: "GET", // 🔼 Permintaan GET
      signal: signal, // ⛔ Untuk menghentikan fetch secara manual (opsional)
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

// 🔍 Fungsi untuk mengambil data 1 user berdasarkan ID (harus login)
const read = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/users/" + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t, // 🔐 Token auth
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

// ✏️ Fungsi untuk mengupdate data user
const update = async (params, credentials, user) => {
  try {
    let response = await fetch("/api/users/" + params.userId, {
      method: "PUT", // 🔼 Permintaan HTTP PUT
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

// ❌ Fungsi untuk menghapus user berdasarkan ID
const remove = async (params, credentials) => {
  try {
    let response = await fetch("/api/users/" + params.userId, {
      method: "DELETE", // 🗑️ Permintaan DELETE
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

// 📤 Ekspor semua fungsi untuk digunakan di file lain
export { create, list, read, update, remove };
