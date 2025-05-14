
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface VoiceSettingsProps {
  speed: number;
  onSpeedChange: (value: number) => void;
  pitch: number;
  onPitchChange: (value: number) => void;
  selectedVoice: string;
  onVoiceChange: (value: string) => void;
  voices: { id: string; name: string }[];
}

const VoiceSettings = ({
  speed,
  onSpeedChange,
  pitch,
  onPitchChange,
  selectedVoice,
  onVoiceChange,
  voices,
}: VoiceSettingsProps) => {
  return (
    <div className="space-y-4 p-2">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="voice">Voice</Label>
        </div>
        <Select value={selectedVoice} onValueChange={onVoiceChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select voice" />
          </SelectTrigger>
          <SelectContent>
            {voices.map((voice) => (
              <SelectItem key={voice.id} value={voice.id}>
                {voice.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="speed">Speed</Label>
          <span className="text-xs text-muted-foreground">{speed.toFixed(1)}x</span>
        </div>
        <Slider
          id="speed"
          min={0.5}
          max={2}
          step={0.1}
          value={[speed]}
          onValueChange={([value]) => onSpeedChange(value)}
          className="cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="pitch">Pitch</Label>
          <span className="text-xs text-muted-foreground">{pitch.toFixed(1)}</span>
        </div>
        <Slider
          id="pitch"
          min={-2}
          max={2}
          step={0.1}
          value={[pitch]}
          onValueChange={([value]) => onPitchChange(value)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default VoiceSettings;
