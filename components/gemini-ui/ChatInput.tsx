import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
}: ChatInputProps) {
  return (
    <footer className="dark:bg-gray-700 p-4 border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-3xl mx-auto">
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
  );
}
