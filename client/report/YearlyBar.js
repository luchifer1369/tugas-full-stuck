// 📂 Lokasi: client/report/YearlyBar.js

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import auth from "../auth/auth-helper";
import { listByUser } from "../expense/api-expense.js";

const FilterWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "16px",
});

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function YearlyBar() {
  const jwt = auth.isAuthenticated();
  const [year, setYear] = useState(new Date().getFullYear());
  const [expenses, setExpenses] = useState([]);

  const fetchData = () => {
    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);

    // Fetch all expenses within the year
    listByUser({}, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        const filtered = data.filter((e) => {
          const d = new Date(e.incurred_on);
          return d >= start && d < end;
        });
        setExpenses(filtered);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const monthlyTotals = months.map((_, i) => {
    const monthExpenses = expenses.filter(
      (e) => new Date(e.incurred_on).getMonth() === i
    );
    const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
    return { month: months[i], total };
  });

  return (
    <Card sx={{ margin: 3 }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Your monthly expenditures in
        </Typography>

        {/* Filter Tahun */}
        <FilterWrapper>
          <TextField
            label="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            size="small"
          />
          <Button variant="contained" onClick={fetchData}>
            GO
          </Button>
        </FilterWrapper>

        {/* Bar Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyTotals}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#00bfa5" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
