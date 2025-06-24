// 📂 Lokasi: client/report/YearlyBar.js

// 🔽 Import React dan tipe data
import React from "react";
import PropTypes from "prop-types";

// 🔽 Import komponen UI dari MUI
import { Card, CardContent, Typography } from "@mui/material";

// 🔽 Import komponen chart dari Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 📊 Komponen untuk menampilkan grafik batang total pengeluaran bulanan sepanjang tahun
export default function YearlyBar({ monthlyTotals }) {
  // 🔄 Konversi objek monthlyTotals menjadi array data untuk grafik
  const data = Object.keys(monthlyTotals).map((month) => ({
    name: month, // 🏷️ Nama bulan (contoh: Jan, Feb, dst)
    total: monthlyTotals[month], // 💲 Total pengeluaran bulan itu
  }));

  return (
    <Card sx={{ margin: 3 }}>
      <CardContent>
        {/* 🔖 Judul chart */}
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Total Monthly Expenses (Year)
        </Typography>

        {/* 📈 Grafik batang responsif */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            {/* 🟦 Garis grid latar */}
            <CartesianGrid strokeDasharray="3 3" />
            {/* 📆 Sumbu X dengan nama bulan */}
            <XAxis dataKey="name" />
            {/* 💰 Sumbu Y untuk nilai total */}
            <YAxis />
            {/* 🛠️ Tooltip saat hover */}
            <Tooltip />
            {/* 📊 Batang data total */}
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// 📌 Validasi prop agar monthlyTotals adalah objek (bukan array)
YearlyBar.propTypes = {
  monthlyTotals: PropTypes.object.isRequired,
};
