
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceSettings from "@/components/VoiceSettings";
import PlayButton from "@/components/PlayButton";
import AudioWaveform from "@/components/AudioWaveform";
import VoiceSampleCard from "@/components/VoiceSampleCard";
import { Volume2, Mic, Music } from "lucide-react";
import { toast } from "sonner";

const DEMO_VOICES = [
  { id: 'aria', name: 'Aria', description: 'Clear female voice with neutral accent' },
  { id: 'roger', name: 'Roger', description: 'Deep male voice with slight British accent' },
  { id: 'sarah', name: 'Sarah', description: 'Gentle female voice with warm tone' },
  { id: 'george', name: 'George', description: 'Authoritative male voice with rich tones' }
];

const Index = () => {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("aria");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleGenerate = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to generate speech");
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Voice successfully generated!");
    }, 1500);
  };

  const handlePlay = () => {
    if (!text.trim()) {
      toast.error("No audio to play. Generate some first!");
      return;
    }
    
    setIsPlaying(!isPlaying);
    
    // Simulate playback ending after 5 seconds
    if (!isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/40 pb-12">
      <header className="pt-12 pb-8 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1 mb-4">
          <Volume2 className="h-4 w-4 text-voice" />
          <span className="text-sm font-medium">Voice Synthesis</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Voice Generator</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Transform text into lifelike speech with customizable voices, pitch, and speed controls.
        </p>
      </header>

      <main className="container max-w-4xl px-4">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Music className="h-5 w-5 text-voice" />
                  Text to Speech
                </CardTitle>
                <CardDescription>
                  Enter your text below to convert it to speech
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type or paste your text here..."
                  className="min-h-32 mb-4"
                  value={text}
                  onChange={handleTextChange}
                />
                
                <div className="flex flex-wrap items-center gap-4">
                  <Button 
                    onClick={handleGenerate} 
                    className="bg-voice hover:bg-voice-dark" 
                    disabled={isGenerating || !text.trim()}
                  >
                    {isGenerating ? "Generating..." : "Generate Voice"}
                  </Button>
                  
                  <div className="flex-1 flex items-center gap-4 bg-secondary/40 rounded-xl px-4 py-2">
                    <PlayButton 
                      isPlaying={isPlaying} 
                      onClick={handlePlay} 
                      size="md"
                    />
                    <div className="flex-1">
                      <AudioWaveform isPlaying={isPlaying} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mic className="h-5 w-5 text-voice" />
                  Voice Samples
                </CardTitle>
                <CardDescription>
                  Listen to sample voices before making your selection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {DEMO_VOICES.map((voice) => (
                    <VoiceSampleCard
                      key={voice.id}
                      name={voice.name}
                      description={voice.description}
                      onSelect={() => setSelectedVoice(voice.id)}
                      isSelected={selectedVoice === voice.id}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Voice Settings</CardTitle>
                <CardDescription>
                  Customize the speech output
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VoiceSettings
                  speed={speed}
                  onSpeedChange={setSpeed}
                  pitch={pitch}
                  onPitchChange={setPitch}
                  selectedVoice={selectedVoice}
                  onVoiceChange={setSelectedVoice}
                  voices={DEMO_VOICES}
                />
              </CardContent>
            </Card>
            
            <div className="relative mt-6">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-voice to-purple-600 opacity-75 blur"></div>
              <Card className="relative bg-card/90 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pro Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Use punctuation for more natural speech patterns</p>
                  <p>• Add pauses with commas and periods</p>
                  <p>• For emphasis, try adjusting both pitch and speed</p>
                  <p>• Different voices excel with different content types</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
