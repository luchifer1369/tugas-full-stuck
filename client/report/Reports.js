// 📂 Lokasi: client/report/Reports.js

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

import auth from "../auth/auth-helper";
import { listByUser } from "../expense/api-expense";
import ExpenseOverview from "../expense/ExpenseOverview";
import CategoryPie from "./CategoryPie";
import MonthlyScatter from "./MonthlyScatter";
import YearlyBar from "./YearlyBar";

const Container = styled("div")(({ theme }) => ({
  maxWidth: 1100,
  margin: "auto",
  padding: theme.spacing(3),
}));

export default function Reports() {
  const jwt = auth.isAuthenticated();
  const [expenses, setExpenses] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState({});
  const [categoryTotals, setCategoryTotals] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByUser({}, { t: jwt.token }, signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setExpenses(data);
        computeTotals(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  const computeTotals = (expenses) => {
    const monthMap = {};
    const categoryMap = {};

    expenses.forEach((item) => {
      const date = new Date(item.incurred_on);
      const month = date.toLocaleString("default", { month: "short" });
      monthMap[month] = (monthMap[month] || 0) + item.amount;

      const cat = item.category;
      categoryMap[cat] = (categoryMap[cat] || 0) + item.amount;
    });

    setMonthlyTotals(monthMap);
    setCategoryTotals(categoryMap);
  };

  const categoryData = Object.keys(categoryTotals).map((k) => ({
    category: k,
    value: categoryTotals[k],
  }));

  return (
    <Container>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: "primary.main" }}>
            Expense Reports
          </Typography>
        </CardContent>
      </Card>

      <ExpenseOverview expenses={expenses} />
      <CategoryPie totalPerCategory={categoryData} />
      <MonthlyScatter expenses={expenses} />
      <YearlyBar monthlyTotals={monthlyTotals} />
    </Container>
  );
}
