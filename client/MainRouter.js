// 📂 Lokasi: client/MainRouter.js

import React from "react";
import { Routes, Route } from "react-router-dom";

// 🔽 Import halaman utama dan user
import Home from "./core/Home.js";
import Signup from "./user/Signup.js";
import Signin from "./auth/Signin.js";
import Users from "./user/Users.js";
import Profile from "./user/Profile.js";
import EditProfile from "./user/EditProfile.js";
import DeleteUser from "./user/DeleteUser.js";

// 🔽 Import fitur pengeluaran (expense)
import NewExpense from "./expense/NewExpense.js";
import Expenses from "./expense/Expenses.js";

// 🔽 Import fitur laporan
import Reports from "./report/Reports.js";

// 🔽 PrivateRoute: wrapper untuk halaman yang butuh login
import PrivateRoute from "./auth/PrivateRoute.js";

export default function MainRouter() {
  return (
    <Routes>
      {/* 🔓 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

      {/* 🔒 User Profile Routes */}
      <Route path="/user/:userId" element={<Profile />} />
      <Route path="/user/edit/:userId" element={<EditProfile />} />
      <Route path="/user/delete/:userId" element={<DeleteUser />} />

      {/* 🔒 Protected Routes (butuh login) */}
      <Route element={<PrivateRoute />}>
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expenses/new" element={<NewExpense />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
