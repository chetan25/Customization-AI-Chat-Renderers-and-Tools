"use client";
import { useState, MouseEvent } from "react";
import { Send, Settings } from "lucide-react";

const ChatForm = ({
  handleSubmit,
  isLoading,
}: {
  handleSubmit: (e: MouseEvent<HTMLButtonElement>, input: string) => void;
  isLoading: boolean;
}) => {
  const [input, setInput] = useState("");

  const handleFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(e, input);
    setInput("");
  };

  return (
    <form className="border-t p-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          onClick={handleFormSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatForm;
