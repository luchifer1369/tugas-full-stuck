import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  TextField,
  Icon,
} from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import auth from "./auth-helper";
import { signin } from "./api-auth";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function Signin() {
  const location = useLocation();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, redirectToReferrer: true });
        });
      }
    });
  };

  const from = location.state?.from || { pathname: "/" };

  if (values.redirectToReferrer) {
    return <Navigate to={from} />;
  }

  return (
    <Card
      sx={{ maxWidth: 600, margin: "auto", textAlign: "center", mt: 5, pb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mt: 2, color: "primary.main" }}>
          Sign In
        </Typography>
        <TextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
          sx={{ width: 300 }}
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
          sx={{ width: 300 }}
        />
        <br />
        {values.error && (
          <Typography
            color="error"
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
            <ErrorOutlineIcon sx={{ mr: 1 }} />
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          sx={{ margin: "auto", mb: 2 }}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
