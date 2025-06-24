// 📂 Lokasi: client/user/Profile.js

// 🔃 React Hooks dan komponen MUI
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
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { Edit, Person } from "@mui/icons-material";
import { Link, Navigate, useParams } from "react-router-dom";

// 🔐 Autentikasi dan fungsi API user
import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
import DeleteUser from "./DeleteUser";

// 🎨 Styling Paper (kontainer utama profil)
const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  padding: theme.spacing(3),
  marginTop: theme.spacing(5),
}));

// 🎨 Styling untuk judul profil
const Title = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  color: theme.palette.secondary.main,
}));

// 📦 Komponen utama: halaman profil pengguna
export default function Profile() {
  const [user, setUser] = useState({});                    // 📁 State data user
  const [redirectToSignin, setRedirectToSignin] = useState(false); // 🔀 Redirect ke signin jika error
  const { userId } = useParams();                          // 🔍 Ambil ID user dari parameter URL
  const jwt = auth.isAuthenticated();                      // 🔐 Ambil token autentikasi

  // 🔄 Ambil data user berdasarkan userId
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true); // 🔁 Jika gagal (unauthorized), arahkan ke signin
      } else {
        setUser(data);             // ✅ Simpan data user ke state
      }
    });

    return function cleanup() {
      abortController.abort();     // 🛑 Abort fetch jika komponen di-unmount
    };
  }, [userId]);

  // 🔀 Redirect ke halaman signin jika tidak berhak mengakses
  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }

  // 🖼️ Tampilan halaman profil
  return (
    <StyledPaper elevation={4}>
      <Title variant="h6">Profile</Title>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person /> {/* 👤 Icon avatar */}
            </Avatar>
          </ListItemAvatar>

          {/* 📝 Tampilkan nama dan email user */}
          <ListItemText primary={user.name} secondary={user.email} />

          {/* 🛡️ Hanya tampilkan tombol edit dan delete jika user sedang login sesuai user yang ditampilkan */}
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id === user._id && (
              <ListItemSecondaryAction>
                {/* ✏️ Tombol edit profil */}
                <Link to={`/user/edit/${user._id}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>

                {/* 🗑️ Komponen untuk menghapus akun */}
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>

        <Divider />

        {/* 🕒 Tampilkan tanggal pembuatan akun */}
        <ListItem>
          <ListItemText
            primary={`Joined: ${
              user.created ? new Date(user.created).toDateString() : ""
            }`}
          />
        </ListItem>
      </List>
    </StyledPaper>
  );
}
