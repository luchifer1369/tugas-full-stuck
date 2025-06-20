// 📂 Lokasi: client/user/Signup.js

import React, { useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon
} from '@mui/material'
import { styled } from '@mui/system'
import { create } from './api-user.js'
import { Link } from 'react-router-dom'

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  textAlign: 'center',
  marginTop: theme.spacing(5),
  paddingBottom: theme.spacing(2)
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: 300
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: 'auto',
  marginBottom: theme.spacing(2)
}))

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  })

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, error: '', open: true })
      }
    })
  }

  return (
    <div>
      <StyledCard>
        <CardContent>
          <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>
            Sign Up
          </Typography>
          <StyledTextField
            id="name"
            label="Name"
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
          />
          <br />
          <StyledTextField
            id="email"
            type="email"
            label="Email"
            value={values.email}
            onChange={handleChange('email')}
            margin="normal"
          />
          <br />
          <StyledTextField
            id="password"
            type="password"
            label="Password"
            value={values.password}
            onChange={handleChange('password')}
            margin="normal"
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" sx={{ verticalAlign: 'middle' }}>error</Icon> {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <SubmitButton color="primary" variant="contained" onClick={clickSubmit}>
            Submit
          </SubmitButton>
        </CardActions>
      </StyledCard>

      <Dialog open={values.open}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )
}
