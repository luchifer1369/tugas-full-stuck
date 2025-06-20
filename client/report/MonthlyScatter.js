// 📂 Lokasi: client/report/MonthlyScatter.js

import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography } from '@mui/material'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function MonthlyScatter({ expenses }) {
  const data = expenses.map((item) => ({
    x: new Date(item.incurred_on).getDate(),
    y: item.amount
  }))

  return (
    <Card sx={{ margin: 3 }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Daily Expenses (This Month)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis dataKey="x" name="Day" />
            <YAxis dataKey="y" name="Amount" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Expense" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

MonthlyScatter.propTypes = {
  expenses: PropTypes.array.isRequired
}
