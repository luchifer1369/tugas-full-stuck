// 📂 Lokasi: client/user/DeleteUser.js

import React, { useState } from 'react'
import PropTypes from 'prop-types'

// 💄 Komponen UI dari MUI
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

// 🗑️ Ikon delete
import { Delete } from '@mui/icons-material'

// 🔁 Untuk navigasi otomatis setelah akun dihapus
import { Navigate } from 'react-router-dom'

// 🔐 Modul autentikasi untuk akses token & hapus JWT
import auth from './../auth/auth-helper'

// 🔧 Fungsi API untuk hapus user
import { remove } from './api-user.js'

// 📦 Komponen utama untuk menghapus akun user
export default function DeleteUser({ userId }) {
  const [open, setOpen] = useState(false)         // 🔘 Status dialog
  const [redirect, setRedirect] = useState(false) // 🔁 Redirect setelah hapus
  const jwt = auth.isAuthenticated()              // 🔐 Ambil token user

  // 🔘 Saat ikon delete diklik, buka dialog
  const clickButton = () => {
    setOpen(true)
  }

  // ✅ Fungsi untuk menghapus akun
  const deleteAccount = () => {
    remove({ userId }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error)  // 🛑 Tampilkan error jika ada
      } else {
        // ✅ Hapus token JWT dari session
        auth.clearJWT(() => console.log('deleted'))

        // 🔁 Redirect ke homepage
        setRedirect(true)
      }
    })
  }

  // ❌ Jika user batal menghapus akun
  const handleRequestClose = () => {
    setOpen(false)
  }

  // 🔁 Redirect ke halaman utama setelah sukses hapus
  if (redirect) {
    return <Navigate to="/" />
  }

  // 🖼️ Tampilkan tombol & dialog konfirmasi
  return (
    <>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

// ✅ Validasi props untuk memastikan `userId` berupa string dan wajib ada
DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
}
