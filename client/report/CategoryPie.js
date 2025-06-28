// 📂 Lokasi: client/report/CategoryPie.js

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import auth from "../auth/auth-helper";
import { listByUser } from "../expense/api-expense.js";

const FilterWrapper = styled("div")({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  marginBottom: "16px",
});

const COLORS = [
  "#FF5722",
  "#4CAF50",
  "#2196F3",
  "#FFC107",
  "#9C27B0",
  "#E91E63",
  "#00BCD4",
  "#8BC34A",
];

export default function CategoryPie() {
  const jwt = auth.isAuthenticated();
  const [expenses, setExpenses] = useState([]);
  const [fromDate, setFromDate] = useState("01/06/2025");
  const [toDate, setToDate] = useState("30/06/2025");

  const fetchData = () => {
    const [fromDay, fromMonth, fromYear] = fromDate.split("/");
    const [toDay, toMonth, toYear] = toDate.split("/");
    const start = new Date(`${fromYear}-${fromMonth}-${fromDay}`);
    const end = new Date(`${toYear}-${toMonth}-${toDay}T23:59:59`);

    listByUser({}, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        const filtered = data.filter((e) => {
          const d = new Date(e.incurred_on);
          return d >= start && d <= end;
        });
        setExpenses(filtered);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categoryTotals = expenses.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = 0;
    }
    acc[item.category] += item.amount;
    return acc;
  }, {});

  const pieData = Object.keys(categoryTotals).map((k) => ({
    name: k,
    value: categoryTotals[k],
  }));

  return (
    <Card sx={{ margin: 3 }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Expenditures per category
        </Typography>

        {/* Filter Tanggal */}
        <FilterWrapper>
          <TextField
            label="FROM"
            type="text"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            size="small"
            helperText="dd/mm/yyyy"
          />
          <TextField
            label="TO"
            type="text"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            size="small"
            helperText="dd/mm/yyyy"
          />
          <Button variant="contained" onClick={fetchData}>
            GO
          </Button>
        </FilterWrapper>

        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="40%"
              innerRadius={60}
              outerRadius={150}
              paddingAngle={4}
              stroke="black">
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={`url(#grad-${index})`} />
              ))}
            </Pie>

            {/* Tooltip */}
            <Tooltip />

            {/* Gradient Definitions */}
            <defs>
              {pieData.map((_, index) => (
                <linearGradient
                  key={index}
                  id={`grad-${index}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%">
                  <stop
                    offset="0%"
                    stopColor={COLORS[index % COLORS.length]}
                    stopOpacity="0.6"
                  />
                  <stop
                    offset="100%"
                    stopColor={COLORS[index % COLORS.length]}
                    stopOpacity="1"
                  />
                </linearGradient>
              ))}
            </defs>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
