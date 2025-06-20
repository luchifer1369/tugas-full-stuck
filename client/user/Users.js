// 📂 Lokasi: client/user/Users.js

import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { ArrowForward, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { list } from "./api-user.js";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(5),
}));

const Title = styled(Typography)(({ theme }) => ({
  margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
  color: theme.palette.primary.main,
}));

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <StyledPaper elevation={4}>
      <Title variant="h6">All Users</Title>
      <List dense>
        {users.map((item, i) => (
          <Link to={`/user/${item._id}`} key={i}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        ))}
      </List>
    </StyledPaper>
  );
}
