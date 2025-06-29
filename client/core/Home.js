// 📂 Lokasi: client/core/Home.js

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import auth from "../auth/auth-helper";
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
  const isLoggedIn = auth.isAuthenticated();

  if (isLoggedIn) {
    return <ExpenseOverview />;
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
