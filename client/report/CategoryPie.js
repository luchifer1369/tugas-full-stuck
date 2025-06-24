// 📂 Lokasi: client/report/CategoryPie.js

// 🔽 Import React dan komponen tambahan dari MUI dan Recharts
import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 🎨 Warna-warna yang akan digunakan pada pie chart
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#d0ed57",
  "#a4de6c",
  "#ff7f50",
  "#ffbb28",
];

// 📊 Komponen utama untuk menampilkan pie chart berdasarkan kategori pengeluaran
export default function CategoryPie({ totalPerCategory }) {
  return (
    // 🧾 Bungkus chart dalam Card MUI
    <Card sx={{ margin: 3 }}>
      <CardContent>
        {/* Judul chart */}
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Total Expenses per Category
        </Typography>

        {/* 💡 Container yang otomatis menyesuaikan ukuran layar */}
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            {/* 🔄 Komponen Pie dari Recharts */}
            <Pie
              data={totalPerCategory} // Data array [{ category: '', value: 0 }, ...]
              dataKey="value" // Field yang merepresentasikan nilai
              nameKey="category" // Label kategori
              cx="50%" // Posisi horizontal
              cy="50%" // Posisi vertikal
              outerRadius={100} // Radius lingkaran luar
              label // Menampilkan label secara otomatis
            >
              {/* 🎨 Pewarnaan tiap irisan pie berdasarkan index */}
              {totalPerCategory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]} // Pilih warna dari daftar
                />
              ))}
            </Pie>

            {/* 🔎 Tooltip untuk info saat hover */}
            <Tooltip />

            {/* 🧾 Legenda ditampilkan di bawah chart */}
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ✅ Validasi prop untuk memastikan data berupa array
CategoryPie.propTypes = {
  totalPerCategory: PropTypes.array.isRequired,
};
