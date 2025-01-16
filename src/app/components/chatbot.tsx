/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { MouseEvent, useCallback } from "react";

import { useChat } from "../hooks/useChat";
import ChatForm from "./ChatForm";

// Configuration type definitions
type AIConfig = {
  context: string;
  systemPrompt: string;
  components: Record<string, React.ComponentType<any>>;
  renderRules: Array<{
    pattern: RegExp;
    component: string;
  }>;
  dynamicContextId?: string;
};

// Custom message renderer that handles special components
const MessageRenderer = ({
  content,
  components,
  renderRules,
}: { content: Record<string, any> | string } & Partial<AIConfig>) => {
  if (typeof content === "object") {
    // Check content against render rules
    for (const rule of renderRules!) {
      console.log(content.responseType, rule.component.toLowerCase());
      if (content.responseType === rule.component.toLowerCase()) {
        const Component = components![rule.component];
        if (Component) {
          return <Component content={content} />;
        }
      }
    }
    // Default text rendering
    return <div className="whitespace-pre-wrap">{content.data}</div>;
  }

  // Default text rendering for user type
  return <div className="whitespace-pre-wrap">{content}</div>;
};

// Main chat container
const ConfigurableAIChat = ({
  context,
  systemPrompt,
  components,
  renderRules,
  dynamicContextId,
}: AIConfig) => {
  //   const [showConfig, setShowConfig] = useState(false);

  const { messages, isLoading, error, sendMessage } = useChat({
    context,
    systemPrompt,
    dynamicContextId,
  });

  const handleSubmit = useCallback(
    async (e: MouseEvent<HTMLButtonElement>, input: string) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      await sendMessage(input);
    },
    [isLoading, sendMessage]
  );

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <MessageRenderer
                content={message.content}
                components={components}
                renderRules={renderRules}
              />
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">Thinking...</div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center">Error: {error}</div>
        )}
      </div>

      <ChatForm handleSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default ConfigurableAIChat;
