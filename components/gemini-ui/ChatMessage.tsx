import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatMessageProps {
  message: { role: string; content: string };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
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
            className={message.role === "user" ? "bg-blue-500" : "bg-green-500"}
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
          <ReactMarkdown
            className="prose prose-sm prose-blue"
            components={{
              // @ts-expect-error: Unreachable code error
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    // @ts-expect-error: Unreachable code error
                    style={materialDark}
                    language={match[1]}
                    PreTag="div"
                    showLineNumbers
                    customStyle={{
                      borderRadius: "0.375rem",
                      backgroundColor: "#282C34",
                      padding: "1rem",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
