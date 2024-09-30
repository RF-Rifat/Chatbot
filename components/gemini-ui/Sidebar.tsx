// components/sidebar.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  messages: Array<{ role: string; content: string }>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({
  messages,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 p-4 shadow-lg transition-transform duration-300 ease-in-out transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center text-gray-800 dark:text-gray-200">
          <Sparkles className="mr-2 text-blue-500" /> EchoMind
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <ul className="space-y-2">
          {messages.map((message, index) => (
            <li
              key={index}
              className="truncate text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="font-medium">
                {message.role === "user" ? "You: " : "EchoMind: "}
              </span>
              {message.content}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
