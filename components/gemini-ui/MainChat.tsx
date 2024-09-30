import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import ChatMessage from "./ChatMessage";

interface MainChatProps {
  messages: Array<{ role: string; content: string }>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function MainChat({ messages, messagesEndRef }: MainChatProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <Card className="w-full max-w-4xl mx-auto border-none shadow-none bg-transparent">
        <CardContent className="p-0 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
