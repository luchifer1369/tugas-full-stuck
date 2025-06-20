// 📂 Lokasi: client/report/CategoryPie.js

import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#d0ed57",
  "#a4de6c",
  "#ff7f50",
  "#ffbb28",
];

export default function CategoryPie({ totalPerCategory }) {
  return (
    <Card sx={{ margin: 3 }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Total Expenses per Category
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={totalPerCategory}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label>
              {totalPerCategory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

CategoryPie.propTypes = {
  totalPerCategory: PropTypes.array.isRequired,
};
