// 📂 Lokasi: client/report/MonthlyScatter.js

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import auth from "../auth/auth-helper";
import { listByUser } from "../expense/api-expense.js";

// Styling
const FilterWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "16px",
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthlyScatter() {
  const jwt = auth.isAuthenticated();
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const date = new Date(year, month, 1);
    listByUser({ month: date }, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setExpenses(data);
      }
    });
  };

  const handleChangeMonth = (e) => setMonth(e.target.value);
  const handleChangeYear = (e) => setYear(e.target.value);

  const data = expenses.map((item) => ({
    x: new Date(item.incurred_on).getDate(),
    y: item.amount,
  }));

  return (
    <Card sx={{ margin: 3 }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Expenses scattered over
        </Typography>

        {/* Filter Bulan dan Tahun */}
        <FilterWrapper>
          <TextField
            select
            label="Month"
            value={month}
            onChange={handleChangeMonth}
            size="small">
            {months.map((m, i) => (
              <MenuItem key={i} value={i}>
                {m}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Year"
            type="number"
            value={year}
            onChange={handleChangeYear}
            size="small"
          />

          <Button variant="contained" onClick={fetchData}>
            GO
          </Button>
        </FilterWrapper>

        {/* Scatter Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis dataKey="x" name="Day of Month" />
            <YAxis dataKey="y" name="Amount ($)" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Expense" data={data} fill="#26a69a" />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
