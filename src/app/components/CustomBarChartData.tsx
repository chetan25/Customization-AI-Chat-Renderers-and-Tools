"use client";

import { useState } from "react";
import Drawer from "@/app/components/Drawer";
import ConfigurableAIChat from "@/app/components/chatbot";
import { Chart } from "@/app/components/Chart";
import { Table } from "@/app/components/Table";
import { useContextData } from "./ContextManager";

const CustomBarChartData = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addDynamicContext } = useContextData();
  // Custom components for special rendering
  const components = {
    Chart: Chart,
    Table: Table,
  };

  // Rules for when to use custom components
  const renderRules = [
    {
      pattern: /^\/chart/,
      component: "Chart",
    },
    {
      pattern: /^\/table/,
      component: "Table",
    },
  ];

  const systemPrompt = `
  When displaying data:
  - Use /chart for visualizations
    Format: /chart type=line|bar data=[{x:"Label",y:value},...] title="Chart Title"
    
  - Use /table for tabular data
    Format: /table headers=["Col1","Col2"] data=[[val1,val2],...] title="Table Title"
  `;

  const loadBarChartData = () => {
    addDynamicContext({
      id: "barChartData",
      type: "custom",
      content: {
        responseType: "chart",
        type: "bar",
        data: [
          { x: "Product A", y: 300 },
          { x: "Product B", y: 450 },
          { x: "Product C", y: 280 },
          { x: "Product D", y: 390 },
        ],
        title: "Product Sales Comparison",
      },
    });
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="text-center m-10">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          data-drawer-target="drawer-example"
          data-drawer-show="drawer-example"
          aria-controls="drawer-example"
          onClick={loadBarChartData}
        >
          Load With Bar Chart Data
        </button>
      </div>
      {isDrawerOpen ? (
        <Drawer isOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}>
          <ConfigurableAIChat
            context="You are a helpful AI assistant."
            systemPrompt={systemPrompt}
            components={components}
            renderRules={renderRules}
            dynamicContextId="barChartData"
          />
        </Drawer>
      ) : null}
    </>
  );
};

export default CustomBarChartData;
