
import React from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const PlayButton = ({ 
  isPlaying, 
  onClick, 
  className,
  size = "md"
}: PlayButtonProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  return (
    <Button
      variant="default"
      size="icon"
      onClick={onClick}
      className={cn(
        "rounded-full bg-voice shadow-lg hover:bg-voice-dark transition-all duration-200",
        sizeClasses[size],
        className
      )}
    >
      {isPlaying ? (
        <Pause className="h-5 w-5" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </Button>
  );
};

export default PlayButton;
