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
    openTitle: "#3f4771",
    protectedTitle: "#f50057",
    type: "light",
  },
});

export default theme;
