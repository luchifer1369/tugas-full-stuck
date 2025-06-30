// 📂 Lokasi: client/expense/api-expense.js

import queryString from "query-string";

/**
 * 📌 Membuat data pengeluaran baru
 */
const create = async (credentials, expense) => {
  try {
    const response = await fetch("/api/expenses/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(expense),
    });
    return await response.json();
  } catch (err) {
    console.error("❌ create() error:", err);
  }
};

/**
 * 📌 Mengambil daftar pengeluaran berdasarkan parameter user dan waktu
 */
const listByUser = async (params, credentials, signal) => {
  const query = queryString.stringify(params);
  try {
    const response = await fetch(`/api/expenses?${query}`, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error("❌ listByUser() error:", err);
  }
};

/**
 * 📌 Memperbarui data expense berdasarkan ID
 */
const update = async (params, credentials, expense) => {
  try {
    const response = await fetch(`/api/expenses/${params.expenseId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(expense),
    });
    return await response.json();
  } catch (err) {
    console.error("❌ update() error:", err);
  }
};

/**
 * 📌 Menghapus expense berdasarkan ID
 */
const remove = async (params, credentials) => {
  try {
    const response = await fetch(`/api/expenses/${params.expenseId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error("❌ remove() error:", err);
  }
};

/**
 * 📌 Menampilkan ringkasan pengeluaran bulan ini
 */
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
    return await response.json();
  } catch (err) {
    console.error("❌ currentMonthPreview() error:", err);
  }
};

/**
 * 📌 Mengambil daftar pengeluaran yang dikelompokkan berdasarkan kategori
 */
const expenseByCategory = async (credentials, signal) => {
  try {
    const response = await fetch("/api/expenses/category", {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error("❌ expenseByCategory() error:", err);
  }
};

export {
  create,
  listByUser,
  update,
  remove,
  currentMonthPreview,
  expenseByCategory,
};
