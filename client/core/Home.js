// 📂 Lokasi: client/core/Home.js

import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/system'

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(5),
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: '#f5f5f5'
}))

export default function Home() {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
          MERN Expense Tracker
        </Typography>
        <Typography variant="subtitle1">
          A full-stack web app to track your daily, monthly, and yearly expenses.
        </Typography>
      </CardContent>
    </StyledCard>
  )
}
