// 📂 Lokasi: client/report/Reports.js

// 🔽 Import React dan hooks
import React, { useEffect, useState } from "react";
// 🔽 Import komponen MUI dan utilitas styling
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

// 🔽 Import helper autentikasi dan API expense
import auth from "../auth/auth-helper";
import { listByUser } from "../expense/api-expense";

// 🔽 Import komponen visualisasi laporan
import CategoryPie from "./CategoryPie";
import MonthlyScatter from "./MonthlyScatter";
import YearlyBar from "./YearlyBar";

// 💠 Container utama dengan styling responsif
const Container = styled("div")(({ theme }) => ({
  maxWidth: 1100,
  margin: "auto",
  padding: theme.spacing(3),
  overflowY: "auto",
  minHeight: "100vh",
}));

// 🎯 Komponen utama untuk menampilkan halaman laporan
export default function Reports() {
  const jwt = auth.isAuthenticated(); // ✅ Ambil token JWT dari session
  const [expenses, setExpenses] = useState([]); // 🔘 Daftar semua pengeluaran
  const [monthlyTotals, setMonthlyTotals] = useState({}); // 📊 Total per bulan
  const [categoryTotals, setCategoryTotals] = useState({}); // 📊 Total per kategori

  // 🔄 Ambil data pengeluaran saat komponen dimuat
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // 📨 Fetch semua expense user (tanpa filter)
    listByUser({}, { t: jwt.token }, signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setExpenses(data); // 💾 Simpan data pengeluaran
        computeTotals(data); // 🧮 Hitung total per bulan dan kategori
      }
    });

    // 🧼 Cleanup abortController
    return () => {
      abortController.abort();
    };
  }, []);

  // 🧠 Fungsi untuk menghitung total pengeluaran per bulan dan kategori
  const computeTotals = (expenses) => {
    const monthMap = {};
    const categoryMap = {};

    expenses.forEach((item) => {
      const date = new Date(item.incurred_on);
      const month = date.toLocaleString("default", { month: "short" }); // e.g., Jan, Feb
      monthMap[month] = (monthMap[month] || 0) + item.amount;

      const cat = item.category;
      categoryMap[cat] = (categoryMap[cat] || 0) + item.amount;
    });

    setMonthlyTotals(monthMap);
    setCategoryTotals(categoryMap);
  };

  // 🔄 Ubah data kategori menjadi array objek untuk grafik Pie
  const categoryData = Object.keys(categoryTotals).map((k) => ({
    category: k,
    value: categoryTotals[k],
  }));

  return (
    <Container>
      {/* 📌 Header Laporan */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: "primary.main" }}>
            Expense Reports
          </Typography>
        </CardContent>
      </Card>
      {/* 📊 Tampilkan berbagai jenis laporan */}
      <MonthlyScatter expenses={expenses} />
      {/* 🍕 Pie chart by kategori */}
      <YearlyBar monthlyTotals={monthlyTotals} />
      {/* 📍 Scatter pengeluaran harian */}
      <CategoryPie totalPerCategory={categoryData} />{" "}
      {/* 📊 Bar chart by bulan */}
    </Container>
  );
}
