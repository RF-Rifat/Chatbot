// app/page.tsx
"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Sparkles, User } from "lucide-react";

export default function GeminiChatbot() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white w-64 p-4 shadow-lg transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Sparkles className="mr-2" /> Gemini Chat
        </h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <li
                key={index}
                className="truncate text-sm text-gray-600 hover:text-gray-900"
              >
                {message.role === "user" ? "You: " : "Gemini: "}
                {message.content}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Bot />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h1 className="text-xl font-semibold">Gemini AI Assistant</h1>
        </header>

        <ScrollArea className="flex-1 p-4">
          <Card className="w-full max-w-2xl mx-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 ${
                  message.role === "user" ? "bg-blue-50" : "bg-white"
                }`}
              >
                <Avatar>
                  <AvatarFallback>
                    {message.role === "user" ? <User /> : <Bot />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <p className="font-medium">
                    {message.role === "user" ? "You" : "Gemini"}
                  </p>
                  <p className="text-sm text-gray-700">{message.content}</p>
                </div>
              </div>
            ))}
          </Card>
        </ScrollArea>

        <footer className="bg-white p-4 shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 max-w-2xl mx-auto"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="flex-1"
            />
            <Button type="submit">
              <Send className="mr-2" />
              Send
            </Button>
          </form>
        </footer>
      </div>
    </div>
  );
}
