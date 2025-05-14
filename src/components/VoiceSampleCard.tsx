
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PlayButton from "./PlayButton";
import AudioWaveform from "./AudioWaveform";

interface VoiceSampleCardProps {
  name: string;
  description: string;
  audioSrc?: string;
  onSelect: () => void;
  isSelected?: boolean;
}

const VoiceSampleCard = ({
  name,
  description,
  audioSrc,
  onSelect,
  isSelected = false
}: VoiceSampleCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(audioSrc ? new Audio(audioSrc) : null);

  const togglePlay = () => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Error playing audio:", error));
      
      audio.onended = () => setIsPlaying(false);
    }
    
    onSelect();
  };

  return (
    <Card className={`overflow-hidden transition-all duration-200 ${
      isSelected ? "ring-2 ring-voice" : "hover:shadow-md"
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <PlayButton 
            isPlaying={isPlaying} 
            onClick={togglePlay} 
            size="sm"
          />
          <div className="flex-1">
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="mt-3">
          <AudioWaveform isPlaying={isPlaying} variant="small" />
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceSampleCard;
