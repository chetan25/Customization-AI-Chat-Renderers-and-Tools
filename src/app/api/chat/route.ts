/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// Sample responses
const MOCK_RESPONSES = {
  chart: {
    responseType: "chart",
    type: "line",
    data: [
      { x: "Jan", y: 100 },
      { x: "Feb", y: 150 },
      { x: "Mar", y: 130 },
      { x: "Apr", y: 180 },
      { x: "May", y: 220 },
      { x: "Jun", y: 170 },
    ],
    title: "Sample Sales Data",
  },

  table: {
    responseType: "table",
    type: "table",
    headers: ["Product", "Sales", "Revenue", "Growth"],
    data: [
      ["Laptop Pro", 234, "$156,000", "+15%"],
      ["Smart Watch", 456, "$91,200", "+23%"],
      ["Wireless Buds", 789, "$55,230", "+8%"],
      ["Tablet Air", 345, "$172,500", "+31%"],
    ],
    title: "Q2 2024 Sales Report",
  },
  greeting: {
    responseType: "message",
    data: `Hello! I'm your AI assistant. I can help you visualize data using charts or tables. 
  Try asking me something with the words "chart" or "table" to see some examples!`,
  },
};

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatRequest = {
  messages: ChatMessage[];
  staticContext?: string;
  dynamicContext?: string;
  systemPrompt?: string;
};

export async function POST(req: Request) {
  try {
    const { messages, dynamicContext } = await req.json();
    console.log({ messages });
    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage.content.toLowerCase();

    console.log({ dynamicContext });
    // Determine which response to send
    let responseContent;
    if (userMessage.includes("chart")) {
      responseContent = MOCK_RESPONSES.chart;
    } else if (userMessage.includes("table")) {
      responseContent = MOCK_RESPONSES.table;
    } else {
      if (dynamicContext.length > 2 && userMessage.includes("bar")) {
        responseContent = JSON.parse(dynamicContext)["content"];
      } else {
        responseContent = MOCK_RESPONSES.greeting;
      }
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // return res.status(200).json({
    //   message: responseContent,
    //   role: "assistant",
    // });
    return NextResponse.json(
      {
        message: responseContent,
        role: "assistant",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Error processing your request",
        details: error.message,
      },
      { status: 500 }
    );
  }

  //   try {
  //     const { messages, context, systemPrompt }: ChatRequest = req.body;

  //     // Prepare messages array with context and system prompt
  //     const allMessages: ChatMessage[] = [];

  //     // Add system prompt if provided
  //     if (systemPrompt) {
  //       allMessages.push({
  //         role: "system",
  //         content: systemPrompt,
  //       });
  //     }

  //     // Add context if provided
  //     if (context) {
  //       allMessages.push({
  //         role: "system",
  //         content: `Context for this conversation:\n${context}`,
  //       });
  //     }

  //     // Add conversation messages
  //     allMessages.push(...messages);

  //     // Call OpenAI
  //     const completion = await openai.chat.completions.create({
  //       model: "gpt-4-turbo-preview",
  //       messages: allMessages,
  //       temperature: 0.7,
  //       stream: false,
  //     });

  //     // Extract the response
  //     const responseMessage = completion.choices[0].message;

  //     return res.status(200).json({
  //       message: responseMessage.content,
  //       role: "assistant",
  //     });
  //   } catch (error) {
  //     console.error("OpenAI API error:", error);
  //     return res.status(500).json({
  //       error: "Error processing your request",
  //       details: error.message,
  //     });
  //   }
}

const EXTENDED_MOCK_RESPONSES = {
  charts: {
    bar: `/chart type=bar data=[
        {"x": "Product A", "y": 300},
        {"x": "Product B", "y": 450},
        {"x": "Product C", "y": 280},
        {"x": "Product D", "y": 390}
      ] title="Product Sales Comparison"`,

    line: `/chart type=line data=[
        {"x": "Week 1", "y": 100},
        {"x": "Week 2", "y": 150},
        {"x": "Week 3", "y": 130},
        {"x": "Week 4", "y": 180}
      ] title="Monthly Trend"`,
  },

  tables: {
    users: `/table headers=["Name", "Role", "Department", "Status"]
        data=[
          ["John Doe", "Senior Dev", "Engineering", "Active"],
          ["Jane Smith", "Designer", "UX/UI", "Active"],
          ["Bob Johnson", "Manager", "Product", "On Leave"],
          ["Alice Brown", "Analyst", "Data", "Active"]
        ] title="Team Members"`,

    metrics: `/table headers=["Metric", "Value", "Change", "Status"]
        data=[
          ["Page Views", "45,678", "+12%", "↑"],
          ["Conversion", "3.2%", "-0.5%", "↓"],
          ["Revenue", "$34,567", "+8%", "↑"],
          ["Users", "12,345", "+15%", "↑"]
        ] title="Key Performance Indicators"`,
  },
};

// Optional: Add helper function to get more specific responses
function getDetailedResponse(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("chart")) {
    if (msg.includes("bar")) {
      return EXTENDED_MOCK_RESPONSES.charts.bar;
    }
    return EXTENDED_MOCK_RESPONSES.charts.line;
  }

  if (msg.includes("table")) {
    if (msg.includes("user") || msg.includes("team")) {
      return EXTENDED_MOCK_RESPONSES.tables.users;
    }
    if (msg.includes("metric") || msg.includes("kpi")) {
      return EXTENDED_MOCK_RESPONSES.tables.metrics;
    }
    return MOCK_RESPONSES.table;
  }

  return MOCK_RESPONSES.greeting;
}
