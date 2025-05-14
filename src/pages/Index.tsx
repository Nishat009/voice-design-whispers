
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceSettings from "@/components/VoiceSettings";
import PlayButton from "@/components/PlayButton";
import AudioWaveform from "@/components/AudioWaveform";
import VoiceSampleCard from "@/components/VoiceSampleCard";
import { Volume2, Mic, Music, Headphones, FileAudio, MessageSquare } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/40">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Headphones className="h-6 w-6 text-voice" />
            <span className="font-bold text-xl">VoiceDesign</span>
          </div>
          
          <nav>
            <ul className="flex items-center gap-6">
              <li><a href="#features" className="text-sm font-medium hover:text-primary">Features</a></li>
              <li><a href="#pricing" className="text-sm font-medium hover:text-primary">Pricing</a></li>
              <li><a href="#about" className="text-sm font-medium hover:text-primary">About</a></li>
              <li>
                <Button variant="outline" size="sm" className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Contact Us
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Landing Poster */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1 mb-6">
              <Volume2 className="h-4 w-4 text-voice" />
              <span className="text-sm font-medium">AI Voice Technology</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">Transform Text to Lifelike Speech</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Create natural, human-like voiceovers for your content with our advanced AI voice generator.
              Customize pitch, speed, and choose from multiple voice profiles.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-voice hover:bg-voice/90 text-white" size="lg">
                Start Generating
              </Button>
              <Button variant="outline" size="lg">
                View Demos
              </Button>
            </div>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur"></div>
            <Card className="relative bg-card/90 backdrop-blur-sm border-white/10">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Voice Generation Studio</CardTitle>
                <CardDescription>
                  Experience our powerful text-to-speech engine
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Voice Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI voice generator provides everything you need to create professional voiceovers
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <FileAudio className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Natural Speech Synthesis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced AI models that produce human-like speech with appropriate pauses, inflection, and tone.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Mic className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Multiple Voice Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose from a diverse range of voices with different tones, accents, and characteristics.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                  <Music className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle>Customizable Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fine-tune pitch, speed, and other parameters to get exactly the voice performance you need.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Headphones className="h-6 w-6 text-voice" />
                <span className="font-bold text-xl">VoiceDesign</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Creating the next generation of AI voice technology for content creators, developers, and businesses.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">API</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Integration</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Tutorials</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} VoiceDesign. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
