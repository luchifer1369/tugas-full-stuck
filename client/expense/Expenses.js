// 📂 Lokasi: client/expense/Expenses.js

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  TextField,
  Button,
  Icon,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import auth from "../auth/auth-helper";
import { listByUser, update } from "./api-expense.js";
import DeleteExpense from "./DeleteExpense";
import { Navigate } from "react-router-dom";

const Root = styled("div")(({ theme }) => ({
  width: "90%",
  maxWidth: 800,
  margin: "auto",
  marginTop: 40,
  marginBottom: 40,
}));

const TextInput = styled(TextField)(({ theme }) => ({
  margin: "8px 16px",
  width: 240,
}));

const SearchSection = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const jwt = auth.isAuthenticated();

  const today = new Date(),
    y = today.getFullYear(),
    m = today.getMonth();
  const [firstDay, setFirstDay] = useState(new Date(y, m, 1));
  const [lastDay, setLastDay] = useState(new Date(y, m + 1, 0));

  // ✅ Perbaikan: kirim parameter 'month' saja
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByUser({ month: firstDay }, { t: jwt.token }, signal).then((data) => {
      if (data.error) {
        setRedirectToSignin(true);
      } else {
        setExpenses(data);
      }
    });

    return () => abortController.abort();
  }, []);

  const handleDateChange = (name) => (date) => {
    if (name === "firstDay") setFirstDay(date);
    else setLastDay(date);
  };

  const searchClicked = () => {
    listByUser({ month: firstDay }, { t: jwt.token }).then((data) => {
      if (data.error) setRedirectToSignin(true);
      else setExpenses(data);
    });
  };

  const handleChange = (name, index) => (event) => {
    const updated = [...expenses];
    updated[index][name] = event.target.value;
    setExpenses(updated);
  };

  const handleUpdateDate = (index) => (date) => {
    const updated = [...expenses];
    updated[index].incurred_on = date;
    setExpenses(updated);
  };

  const clickUpdate = (index) => {
    const expense = expenses[index];
    update({ expenseId: expense._id }, { t: jwt.token }, expense).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSaved(true);
          setTimeout(() => setSaved(false), 3000);
        }
      }
    );
  };

  const removeExpense = (expense) => {
    const updated = expenses.filter((e) => e._id !== expense._id);
    setExpenses(updated);
  };

  if (redirectToSignin) return <Navigate to="/signin" />;

  return (
    <Root>
      <SearchSection>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disableFuture
            label="FROM"
            value={firstDay}
            onChange={handleDateChange("firstDay")}
            slotProps={{
              textField: { variant: "outlined", className: TextInput },
            }}
          />
          <DatePicker
            label="TO"
            value={lastDay}
            onChange={handleDateChange("lastDay")}
            slotProps={{
              textField: { variant: "outlined", className: TextInput },
            }}
          />
        </LocalizationProvider>
        <Button variant="contained" color="secondary" onClick={searchClicked}>
          GO
        </Button>
      </SearchSection>

      {expenses.map((expense, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div style={{ marginRight: 32, width: 90 }}>
              <Typography sx={{ fontSize: "2em", color: "#2bbd7e" }}>
                ${expense.amount}
              </Typography>
              <Divider />
              <Typography>{expense.category}</Typography>
              <Typography sx={{ fontSize: "0.9em", color: "#888" }}>
                {expense.incurred_on && !isNaN(new Date(expense.incurred_on))
                  ? new Date(expense.incurred_on).toLocaleDateString()
                  : "Invalid date"}
              </Typography>
            </div>
            <div>
              <Typography variant="h6">{expense.title}</Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {expense.notes}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "block" }}>
            <TextField
              label="Title"
              value={expense.title}
              onChange={handleChange("title", index)}
              className="textfield"
              margin="normal"
            />
            <TextField
              label="Amount ($)"
              value={expense.amount}
              onChange={handleChange("amount", index)}
              className="textfield"
              margin="normal"
              type="number"
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Incurred on"
                value={expense.incurred_on}
                onChange={handleUpdateDate(index)}
                slotProps={{
                  textField: { variant: "outlined", className: TextInput },
                }}
              />
            </LocalizationProvider>

            <TextField
              label="Category"
              value={expense.category}
              onChange={handleChange("category", index)}
              className="textfield"
              margin="normal"
            />
            <TextField
              label="Notes"
              multiline
              rows={2}
              value={expense.notes}
              onChange={handleChange("notes", index)}
              className="textfield"
              margin="normal"
            />

            <div style={{ textAlign: "right" }}>
              {error && (
                <Typography component="p" color="error">
                  <Icon color="error">error</Icon> {error}
                </Typography>
              )}
              {saved && (
                <Typography component="span" color="secondary" sx={{ mr: 2 }}>
                  Saved
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() => clickUpdate(index)}>
                Update
              </Button>
              <DeleteExpense expense={expense} onRemove={removeExpense} />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Root>
  );
}
