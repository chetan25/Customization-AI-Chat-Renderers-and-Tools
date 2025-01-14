/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Chart component that handles different types of charts
export const Chart = ({ content }: { content: any }) => {
  // Parse the content to extract chart data and type
  const parseChartContent = (content: any) => {
    try {
      return {
        type: content.type,
        data: content.data,
        title: content.title,
      };
    } catch (error: any) {
      console.warn(error);
      return {
        type: "line",
        data: [],
        title: "Error parsing chart data",
      };
    }
  };

  const { type, data, title } = parseChartContent(content);

  // If no data, show placeholder
  if (!data.length) {
    return (
      <div className="p-4 border rounded bg-gray-50">
        <p className="text-gray-500">No data available for chart</p>
      </div>
    );
  }

  // Render different chart types
  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="y" fill="#8884d8" />
          </BarChart>
        );
      case "line":
      default:
        return (
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="y" stroke="#8884d8" />
          </LineChart>
        );
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="overflow-x-auto">{renderChart()}</div>
    </div>
  );
};
