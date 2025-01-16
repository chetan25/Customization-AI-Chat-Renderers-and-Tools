/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { ChatMessage, ChatRequest } from "@/app/api/chat/route";
import { useContextData } from "@/app/components/ContextManager";

export const useChat = (config: {
  context?: string;
  systemPrompt?: string;
  dynamicContextId?: string;
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { dynamicContext } = useContextData();

  const sendMessage = useCallback(
    async (content: string) => {
      try {
        setIsLoading(true);
        setError(null);

        // Add user message to state
        const userMessage: ChatMessage = {
          role: "user",
          content,
        };

        setMessages((prev) => [...prev, userMessage]);
        let dyContext: (typeof dynamicContext)[number] | string = "";
        if (config.dynamicContextId) {
          dyContext =
            dynamicContext.find((ctx) => ctx.id === config.dynamicContextId) ||
            "";
        }

        dyContext = JSON.stringify(dyContext);
        // Prepare request
        const chatRequest: ChatRequest = {
          messages: [...messages, userMessage],
          staticContext: config.context,
          dynamicContext: dyContext,
          systemPrompt: config.systemPrompt,
        };

        // Send to API
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chatRequest),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const data = await response.json();

        // Add assistant message to state
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.message,
          },
        ]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, config.context, config.systemPrompt]
  );

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
};
