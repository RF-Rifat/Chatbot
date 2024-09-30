import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";


interface ChatHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatHeader({
  sidebarOpen,
  setSidebarOpen,
}: ChatHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 p-4 shadow-sm flex justify-between items-center transition-colors duration-200">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        RF AI Assistant
      </h1>
      <ThemeToggle />
    </header>
  );
}
