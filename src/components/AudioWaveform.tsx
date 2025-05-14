
import React from "react";

interface AudioWaveformProps {
  isPlaying?: boolean;
  variant?: "small" | "medium" | "large";
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ 
  isPlaying = false,
  variant = "medium" 
}) => {
  const numBars = variant === "small" ? 3 : variant === "medium" ? 5 : 8;
  
  const getBarHeight = (index: number, variant: string) => {
    const baseHeights = {
      small: [16, 20, 16],
      medium: [18, 28, 36, 28, 18],
      large: [20, 32, 48, 56, 48, 32, 20, 14]
    };
    
    return baseHeights[variant][index] || 20;
  };

  return (
    <div className="waveform-container">
      {[...Array(numBars)].map((_, i) => (
        <div
          key={i}
          className={`bar ${isPlaying ? `animate-wave-${(i % 5) + 1}` : ""}`}
          style={{
            height: `${isPlaying ? 'var(--height)' : getBarHeight(i, variant)}px`,
            '--height': `${getBarHeight(i, variant)}px`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;
