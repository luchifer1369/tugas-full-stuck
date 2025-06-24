// 📂 Lokasi: client/expense/NewExpense.js

import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@mui/material";
import { styled } from "@mui/system";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { create } from "./api-expense.js";
import auth from "../auth/auth-helper";
import { Link, Navigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  textAlign: "center",
  marginTop: theme.spacing(5),
  paddingBottom: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: 300,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: "auto",
  marginBottom: theme.spacing(2),
}));

export default function NewExpense() {
  const jwt = auth.isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    category: "",
    amount: "",
    incurred_on: new Date(),
    notes: "",
    error: "",
    redirect: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, error: "" });
  };

  const handleDateChange = (date) => {
    if (!isNaN(new Date(date))) {
      setValues({ ...values, incurred_on: date, error: "" });
    } else {
      setValues({ ...values, error: "Invalid date selected." });
    }
  };

  const clickSubmit = () => {
    const { title, category, amount, incurred_on } = values;

    // ✅ Validasi wajib
    if (!title || !category || !amount || !incurred_on) {
      setValues({ ...values, error: "All fields are required." });
      return;
    }

    if (isNaN(new Date(incurred_on))) {
      setValues({ ...values, error: "Date is not valid." });
      return;
    }

    const expense = {
      title,
      category,
      amount,
      incurred_on,
      notes: values.notes || undefined,
    };

    create({ t: jwt.token }, expense).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirect: true });
      }
    });
  };

  if (values.redirect) {
    return <Navigate to="/" />;
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ mt: 2, color: "primary.main" }}>
          Expense Record
        </Typography>

        <StyledTextField
          id="title"
          label="Title"
          value={values.title}
          onChange={handleChange("title")}
          margin="normal"
        />
        <br />

        <StyledTextField
          id="amount"
          label="Amount ($)"
          type="number"
          value={values.amount}
          onChange={handleChange("amount")}
          margin="normal"
        />
        <br />

        <StyledTextField
          id="category"
          label="Category"
          value={values.category}
          onChange={handleChange("category")}
          margin="normal"
        />
        <br />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Incurred on"
            value={values.incurred_on}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                variant: "outlined",
                className: StyledTextField,
              },
            }}
          />
        </LocalizationProvider>
        <br />
        <br />

        <StyledTextField
          id="notes"
          label="Notes"
          multiline
          rows={2}
          value={values.notes}
          onChange={handleChange("notes")}
          margin="normal"
        />
        <br />

        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error" sx={{ verticalAlign: "middle" }}>
              error
            </Icon>{" "}
            {values.error}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <SubmitButton color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </SubmitButton>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained">Cancel</Button>
        </Link>
      </CardActions>
    </StyledCard>
  );
}
