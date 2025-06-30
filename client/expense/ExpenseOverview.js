// 📂 Lokasi: client/expense/ExpenseOverview.js

import React, { useEffect, useState } from "react";
import { Card, Typography, Divider, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import { currentMonthPreview, expenseByCategory } from "./api-expense.js";

const Container = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: "auto",
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
  padding: theme.spacing(3),
}));

const TotalCircle = styled(Box)(({ theme }) => ({
  padding: "40px",
  fontSize: "3em",
  backgroundColor: "#01579b",
  color: "#70f0ae",
  borderRadius: "50%",
  border: "8px double #70f0ae",
  fontWeight: 300,
  textAlign: "center",
  minWidth: 180,
}));

const SmallBox = styled(Box)(({ theme }) => ({
  margin: "12px 0",
  padding: "10px 20px",
  border: "3px solid #58bd7f38",
  borderRadius: "8px",
  textAlign: "center",
}));

export default function ExpenseOverview() {
  const [expensePreview, setExpensePreview] = useState({
    month: { totalSpent: 0 },
    today: { totalSpent: 0 },
    yesterday: { totalSpent: 0 },
  });
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [error, setError] = useState("");

  const jwt = auth.isAuthenticated();

useEffect(() => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  currentMonthPreview({ t: jwt.token }, signal).then((data) => {
    if (data?.error) setError(data.error);
    else setExpensePreview(data);
  });

  return () => abortController.abort();
}, []);

useEffect(() => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  expenseByCategory({ t: jwt.token }, signal).then((data) => {
    if (data?.error) setError(data.error);
    else setExpenseCategories(data);
  });

  return () => abortController.abort();
}, []);

  const indicateExpense = (category) => {
    let color = "#4f83cc";
    if (category.total) {
      const diff = category.total - category.average;
      if (diff > 0) color = "#e9858b";
      if (diff < 0) color = "#2bbd7e";
    }
    return color;
  };

  return (
    <Container elevation={3}>
      <Typography
        variant="h5"
        sx={{ color: "primary.main", textAlign: "center", mb: 2 }}>
        Your Spent Overview
      </Typography>

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <TotalCircle>
          ${expensePreview?.month?.totalSpent || 0}
          <Typography sx={{ fontSize: "0.35em" }}>so far this month</Typography>
        </TotalCircle>

        <Box sx={{ ml: 3 }}>
          <SmallBox>
            <Typography variant="h6">
              ${expensePreview?.today?.totalSpent || 0}
            </Typography>
            <Typography variant="body2">today</Typography>
          </SmallBox>
          <SmallBox>
            <Typography variant="h6">
              ${expensePreview?.yesterday?.totalSpent || 0}
            </Typography>
            <Typography variant="body2">yesterday</Typography>
          </SmallBox>
          <Button
            component={Link}
            to="/expenses"
            variant="outlined"
            sx={{ mt: 1 }}>
            See more
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {expenseCategories.map((expense, index) => (
        <Box key={index} sx={{ mb: 2, textAlign: "center" }}>
          <Typography
            variant="subtitle1"
            sx={{
              display: "inline-block",
              backgroundColor: "#f4f6f9",
              px: 2,
              py: 1,
            }}>
            {expense._id}
          </Typography>
          <Divider
            sx={{
              my: 1,
              height: 4,
              backgroundColor: indicateExpense(expense),
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}>
            <Box>
              <Typography variant="caption">Past Average</Typography>
              <Typography>${expense.average?.toFixed(2)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption">This Month</Typography>
              <Typography>${expense.total?.toFixed(2)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption">
                {expense.total - expense.average > 0 ? "Spent Extra" : "Saved"}
              </Typography>
              <Typography>
                $
                {Math.abs(
                  (expense.total || 0) - (expense.average || 0)
                ).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Container>
  );
}
