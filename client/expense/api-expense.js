// 📂 Lokasi: client/expense/api-expense.js

import queryString from "query-string";

const create = async (credentials, expense) => {
  try {
    const response = await fetch("/api/expenses/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(expense),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

const listByUser = async (params, credentials, signal) => {
  const query = queryString.stringify(params);
  try {
    const response = await fetch(`/api/expenses?${query}`, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

const update = async (params, credentials, expense) => {
  try {
    const response = await fetch(`/api/expenses/${params.expenseId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(expense),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

const remove = async (params, credentials) => {
  try {
    const response = await fetch(`/api/expenses/${params.expenseId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

const currentMonthPreview = async (credentials, signal) => {
  try {
    const response = await fetch("/api/expenses/current/preview", {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export { create, listByUser, update, remove, currentMonthPreview };
