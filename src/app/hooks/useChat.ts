/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { ChatMessage, ChatRequest } from "../api/chat/route";

export const useChat = (config: {
  context?: string;
  systemPrompt?: string;
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

        // Prepare request
        const chatRequest: ChatRequest = {
          messages: [...messages, userMessage],
          context: config.context,
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
