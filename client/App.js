// 📂 Lokasi: client/App.js

// 🔽 Import komponen React
import React from 'react'

// 🔽 Import dari MUI untuk styling global
import { ThemeProvider, CssBaseline } from '@mui/material'

// 🔽 Import tema kustom
import theme from './theme.js'

// 🔽 Import komponen routing utama
import MainRouter from './MainRouter.js'

// 🔽 Import menu navigasi utama
import Menu from './core/Menu.js'

export default function App() {
  return (
    // 🎨 Provider untuk tema MUI agar bisa digunakan di seluruh komponen
    <ThemeProvider theme={theme}>
      {/* 🔳 Reset CSS ke baseline untuk konsistensi tampilan antar browser */}
      <CssBaseline />

      {/* 🧭 Navigasi utama (navbar/header) */}
      <Menu />

      {/* 🔁 Routing utama aplikasi (semua halaman ditampilkan di sini) */}
      <MainRouter />
    </ThemeProvider>
  )
}
