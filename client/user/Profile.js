// 📂 Lokasi: client/user/Profile.js

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
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { Edit, Person } from "@mui/icons-material";
import { Link, Navigate, useParams } from "react-router-dom";

import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
import DeleteUser from "./DeleteUser";

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  padding: theme.spacing(3),
  marginTop: theme.spacing(5),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  color: theme.palette.secondary.main,
}));

export default function Profile() {
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const { userId } = useParams();
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }

  return (
    <StyledPaper elevation={4}>
      <Title variant="h6">Profile</Title>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id === user._id && (
              <ListItemSecondaryAction>
                <Link to={`/user/edit/${user._id}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={`Joined: ${new Date(user.created).toDateString()}`}
          />
        </ListItem>
      </List>
    </StyledPaper>
  );
}
