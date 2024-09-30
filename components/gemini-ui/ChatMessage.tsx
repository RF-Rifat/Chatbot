import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { CopyBlock, dracula } from "react-code-blocks";

interface ChatMessageProps {
  message: { role: string; content: string };
}

// Update CodeProps to make children optional
interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode; // Make children optional
}

export default function ChatMessage({ message }: ChatMessageProps) {
  console.log(message);
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
              : "dark:bg-[#302f2fd3] dark:text-white border dark:border-gray-700 shadow-sm"
          }`}
        >
          <ReactMarkdown
            className="prose prose-sm prose-blue"
            components={{
              // Custom rendering for links
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {children}
                </a>
              ),
              code({ inline, className, children }: CodeProps) {
                const match = /language-(\w+)/.exec(className || "");
                const language = match ? match[1] : "text";
                return !inline ? (
                  <CopyBlock
                    text={String(children).replace(/\n$/, "")}
                    language={language}
                    showLineNumbers={true}
                    theme={dracula}
                    codeBlock
                  />
                ) : (
                  <code className={className}>{children}</code>
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
