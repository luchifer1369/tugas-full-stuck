// 📂 Lokasi: client/user/Users.js

// 🧱 Import library React dan komponen MUI yang digunakan
import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";

import { styled } from "@mui/system"; // 🎨 Untuk styling komponen MUI menggunakan theme
import { ArrowForward, Person } from "@mui/icons-material"; // 🔘 Icon pengguna dan navigasi
import { Link } from "react-router-dom"; // 🔗 Navigasi antar halaman
import { list } from "./api-user.js"; // 📡 API untuk mengambil daftar user dari backend


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(5),
}));

const Title = styled(Typography)(({ theme }) => ({
  margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
  color: theme.palette.primary.main,
}));

export default function Users() {
  const [users, setUsers] = useState([]); // 🔄 State untuk menyimpan data user

  useEffect(() => {
    const abortController = new AbortController(); // 🛑 Untuk membatalkan fetch jika komponen unmount
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error); // ⚠️ Tampilkan error jika ada
      } else {
        setUsers(data); // ✅ Simpan data user ke dalam state
      }
    });

    return function cleanup() {
      abortController.abort(); // 🧹 Batalkan request saat komponen dilepas
    };
  }, []);

  return (
    <StyledPaper elevation={4}>
      <Title variant="h6">All Users</Title>
      <List dense>
        {users.map((item, i) => (
          <Link to={`/user/${item._id}`} key={i}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        ))}
      </List>
    </StyledPaper>
  );
}
