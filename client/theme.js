// 📂 Lokasi: client/theme.js

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#7986cb",
      main: "#3f51b5",
      dark: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff",
    },
    // 🎨 Tambahan kustom yang bisa kamu gunakan via sx={{ color: 'openTitle' }}
    openTitle: "#3f4771",
    protectedTitle: "#f50057",

    // MUI v5 masih mendukung 'mode' sebagai pengganti 'type'
    // Tapi 'type' masih bekerja, walaupun deprecated
    type: "light", // atau gunakan: mode: 'light'
  },
});

export default theme;
