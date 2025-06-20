// 📂 Lokasi: client/user/EditProfile.js

import React, { useState, useEffect } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon
} from '@mui/material'
import { styled } from '@mui/system'
import { Navigate, useParams } from 'react-router-dom'

import auth from './../auth/auth-helper'
import { read, update } from './api-user.js'

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

export default function EditProfile() {
  const { userId } = useParams()
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    redirectToProfile: false,
    error: ''
  })

  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({ userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setValues((prev) => ({ ...prev, error: data.error }))
      } else {
        setValues((prev) => ({ ...prev, name: data.name, email: data.email }))
      }
    })

    return () => {
      abortController.abort()
    }
  }, [userId])

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }

    update({ userId }, { t: jwt.token }, user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, redirectToProfile: true })
      }
    })
  }

  if (values.redirectToProfile) {
    return <Navigate to={`/user/${userId}`} />
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>
          Edit Profile
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
  )
}
