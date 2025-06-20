// 📂 Lokasi: client/App.js

import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme.js'
import MainRouter from './MainRouter.js'
import Menu from './core/Menu.js'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu />
      <MainRouter />
    </ThemeProvider>
  )
}
