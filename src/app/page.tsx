"use client";

import ConfigurableAIChat from "./components/chatbot";
import { Chart } from "./components/Chart";
import { Table } from "./components/Table";
import { ContextProvider } from "./components/ContextManager";

export default function ChatPage() {
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

  return (
    <ContextProvider initialContext={[]}>
      <ConfigurableAIChat
        context="You are a helpful AI assistant."
        systemPrompt={systemPrompt}
        components={components}
        renderRules={renderRules}
      />
    </ContextProvider>
  );
}
