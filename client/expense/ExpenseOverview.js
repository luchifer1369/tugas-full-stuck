// 📂 Lokasi: client/expense/ExpenseOverview.js

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function ExpenseOverview({ expenses }) {
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const average =
    expenses.length > 0 ? (total / expenses.length).toFixed(2) : 0;
  const highest = Math.max(...expenses.map((e) => e.amount), 0);
  const lowest = Math.min(...expenses.map((e) => e.amount), 0);

  return (
    <Card sx={{ margin: 3 }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Overview
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem>
            <ListItemText primary="Total Expenses" secondary={`$${total}`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Average per Entry"
              secondary={`$${average}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Highest Expense" secondary={`$${highest}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Lowest Expense" secondary={`$${lowest}`} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

ExpenseOverview.propTypes = {
  expenses: PropTypes.array.isRequired,
};
