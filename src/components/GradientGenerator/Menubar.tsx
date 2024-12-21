import { Button } from "@/components/ui/button";
import {  MoonStar, Sun, Star } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Menubar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { theme, toggleTheme } = useTheme();


  return (
    <div className=" flex flex-initial justify-between items-center p-4 bg-background border-b">
      <h1 className="font-semibold text-xl tracking-tight">
        <span className=" select-none font-bold text-2xl">MESHD</span>
      </h1>
      <p className="text-xs hidden md:inline-block text-neutral-500 font-medium">
        Hit space to randomize colors
      </p>
      <div className="flex gap-4 items-center">
       
        <Button
          variant="ghost"
          size="sm"
          className="font-semibold"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Star
            size={16}
            strokeWidth={2.25}
            className=" text-neutral-600 dark:text-neutral-100 mr-1"
          />{" "}
          <span>Favorites</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="font-semibold h-8 w-8"
          onClick={toggleTheme}
        >
          {theme === "light" ? <MoonStar /> : <Sun />}
        </Button>
      </div>
    </div>
  );
}
