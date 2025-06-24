// 📂 Lokasi: client/report/MonthlyScatter.js

// 🔽 Import React dan komponen dari MUI serta Recharts
import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography } from '@mui/material'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

// 📈 Komponen utama untuk menampilkan grafik scatter pengeluaran harian per bulan
export default function MonthlyScatter({ expenses }) {
  // 🔄 Transformasi data pengeluaran menjadi format { x: tanggal, y: jumlah }
  const data = expenses.map((item) => ({
    x: new Date(item.incurred_on).getDate(), // Mengambil tanggal dari tanggal penuh
    y: item.amount                           // Nilai pengeluaran
  }))

  return (
    // 🧾 Kartu pembungkus grafik
    <Card sx={{ margin: 3 }}>
      <CardContent>
        {/* 🏷️ Judul grafik */}
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Daily Expenses (This Month)
        </Typography>

        {/* 🔳 Container responsif untuk memastikan grafik tampil optimal */}
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            {/* 🧱 Grid latar belakang */}
            <CartesianGrid />

            {/* ➕ Sumbu X untuk tanggal */}
            <XAxis dataKey="x" name="Day" />

            {/* ➕ Sumbu Y untuk jumlah uang */}
            <YAxis dataKey="y" name="Amount" />

            {/* 🔎 Tooltip saat hover */}
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />

            {/* 🔵 Grafik scatter utama */}
            <Scatter name="Expense" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

// ✅ Validasi prop: expenses wajib berupa array
MonthlyScatter.propTypes = {
  expenses: PropTypes.array.isRequired
}
