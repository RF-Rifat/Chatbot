"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import ChatHeader from "./ChatHeader";

import MainChat from "./MainChat";
import ChatInput from "./ChatInput";
import { Sidebar } from "./Sidebar";

export default function GeminiChatbot() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen">
      <Sidebar
        messages={messages}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <ChatHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <MainChat messages={messages} messagesEndRef={messagesEndRef} />
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
