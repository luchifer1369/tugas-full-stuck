// 📂 Lokasi: client/core/Home.js

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import auth from "../auth/auth-helper";
import { listByUser } from "../expense/api-expense";
import ExpenseOverview from "../expense/ExpenseOverview";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  marginTop: theme.spacing(5),
  padding: theme.spacing(3),
  textAlign: "center",
}));

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = auth.isAuthenticated();

  // Jika sudah login, ambil data expense
  useEffect(() => {
    if (isLoggedIn) {
      const abortController = new AbortController();
      const signal = abortController.signal;

      listByUser({}, { t: isLoggedIn.token }, signal).then((data) => {
        if (data && !data.error) {
          setExpenses(data);
        }
        setLoading(false);
      });

      return () => abortController.abort();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    if (loading) {
      return (
        <StyledCard>
          <CardContent>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Loading your expenses...
            </Typography>
          </CardContent>
        </StyledCard>
      );
    }

    return <ExpenseOverview expenses={expenses} />;
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ color: "primary.main" }}>
          MERN Expense Tracker
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          A full-stack web app to track your daily, monthly, and yearly
          expenses.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <Link to="/signup">Sign up</Link> or <Link to="/signin">Sign in</Link>{" "}
          to start tracking your expenses.
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
