// 📂 Lokasi: client/core/Home.js

// ✅ Import React dan komponen dari Material UI (MUI)
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

// 🎨 Styling untuk komponen Card menggunakan MUI styled utility
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600, // Lebar maksimal card
  margin: "auto", // Posisi tengah secara horizontal
  marginTop: theme.spacing(5), // Jarak dari atas
  padding: theme.spacing(3), // Padding internal card
  textAlign: "center", // Teks rata tengah
  backgroundColor: "#f5f5f5", // Warna latar card
}));

// 🏠 Komponen utama halaman Home
export default function Home() {
  return (
    <StyledCard>
      <CardContent>
        {/* 🧾 Judul utama halaman */}
        <Typography variant="h4" gutterBottom sx={{ color: "primary.main" }}>
          MERN Expense Tracker
        </Typography>

        {/* 📝 Deskripsi singkat tentang fungsi aplikasi */}
        <Typography variant="subtitle1">
          A full-stack web app to track your daily, monthly, and yearly
          expenses.
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
