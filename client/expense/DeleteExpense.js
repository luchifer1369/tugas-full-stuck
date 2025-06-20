// 📂 Lokasi: client/expense/DeleteExpense.js

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { remove } from "./api-expense.js";
import auth from "../auth/auth-helper";

export default function DeleteExpense({ expense, onRemove }) {
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };

  const deleteExpense = () => {
    remove({ expenseId: expense._id }, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOpen(false);
        onRemove(expense);
      }
    });
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your expense entry titled "{expense.title}".
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteExpense} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteExpense.propTypes = {
  expense: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
