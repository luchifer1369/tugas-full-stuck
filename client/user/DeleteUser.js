// 📂 Lokasi: client/user/DeleteUser.js

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { Navigate } from 'react-router-dom'

import auth from './../auth/auth-helper'
import { remove } from './api-user.js'

export default function DeleteUser({ userId }) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const jwt = auth.isAuthenticated()

  const clickButton = () => {
    setOpen(true)
  }

  const deleteAccount = () => {
    remove({ userId }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        auth.clearJWT(() => console.log('deleted'))
        setRedirect(true)
      }
    })
  }

  const handleRequestClose = () => {
    setOpen(false)
  }

  if (redirect) {
    return <Navigate to="/" />
  }

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

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
}
