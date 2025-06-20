// 📂 Lokasi: client/report/YearlyBar.js

import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography } from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function YearlyBar({ monthlyTotals }) {
  const data = Object.keys(monthlyTotals).map((month) => ({
    name: month,
    total: monthlyTotals[month]
  }))

  return (
    <Card sx={{ margin: 3 }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Total Monthly Expenses (Year)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

YearlyBar.propTypes = {
  monthlyTotals: PropTypes.object.isRequired
}
