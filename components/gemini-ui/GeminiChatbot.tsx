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

  // Add an initial message
  const initialMessage = {
    id: "1",
    role: "bot",
    content: `Hello! Welcome to my chatbot. I'm MD Rifadul Islam, a Full Stack Developer specializing in React, Next.js, and the MERN stack. You can learn more about me on my Portfolio : [**https://rifadul-islam.vercel.app**](https://rifadul-islam.vercel.app). How can I assist you today?`,
  };

  // Only add the initial message if the messages array is empty
  const displayedMessages = messages.length === 0 ? [initialMessage] : messages;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen">
      <Sidebar
        messages={displayedMessages}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <ChatHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <MainChat
          messages={displayedMessages}
          messagesEndRef={messagesEndRef}
        />
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
