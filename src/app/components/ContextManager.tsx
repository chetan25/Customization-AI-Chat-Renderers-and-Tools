/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, createContext, useContext } from "react";

// Define types for context data
type ContextData = {
  id: string;
  type: "document" | "database" | "api" | "custom";
  content: string | Record<string, any>;
  metadata?: Record<string, any>;
};

type ChatContextType = {
  staticContext: ContextData[];
  dynamicContext: ContextData[];
  addDynamicContext: (context: ContextData) => void;
  removeDynamicContext: (id: string) => void;
};

// Create context manager
const ChatContext = createContext<ChatContextType | null>(null);

// Context provider component
export const ContextProvider = ({
  children,
  initialContext = [],
}: {
  children: React.ReactNode;
  initialContext: ContextData[];
}) => {
  const [staticContext] = useState<ContextData[]>(initialContext);
  const [dynamicContext, setDynamicContext] = useState<ContextData[]>([]);

  const addDynamicContext = useCallback((context: ContextData) => {
    setDynamicContext((prev) => [...prev, context]);
  }, []);

  const removeDynamicContext = useCallback((id: string) => {
    setDynamicContext((prev) => prev.filter((ctx) => ctx.id !== id));
  }, []);

  return (
    <ChatContext.Provider
      value={{
        staticContext,
        dynamicContext,
        addDynamicContext,
        removeDynamicContext,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook for context management
export const useContextData = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context)
    throw new Error("useContextData must be used within ContextProvider");
  return context;
};
