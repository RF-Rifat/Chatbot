// app/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Sparkles, User, Menu } from "lucide-react";

export default function GeminiChatbot() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
          <Sparkles className="mr-2 text-blue-500" /> Gemini Chat
        </h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <li
                key={index}
                className="truncate text-sm text-gray-600 hover:text-gray-900 p-2 rounded hover:bg-gray-100"
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
            <Menu className="text-gray-600" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">
            Gemini AI Assistant
          </h1>
          <div className="w-8 h-8 md:hidden" />
        </header>

        <ScrollArea className="flex-1 p-4">
          <Card className="w-full max-w-3xl mx-auto border-none shadow-none bg-transparent">
            <CardContent className="p-0 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback
                        className={
                          message.role === "user"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }
                      >
                        {message.role === "user" ? (
                          <User className="text-white w-4 h-4" />
                        ) : (
                          <Bot className="text-white w-4 h-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white border border-gray-200 shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
          </Card>
        </ScrollArea>

        <footer className="bg-white p-4 border-t border-gray-200">
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 max-w-3xl mx-auto"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="flex-1 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-full py-2 px-4"
            />
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 transition-colors rounded-full px-6"
            >
              <Send className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </footer>
      </div>
    </div>
  );
}
