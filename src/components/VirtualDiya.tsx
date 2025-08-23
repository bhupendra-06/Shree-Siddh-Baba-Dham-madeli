import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Sparkles, Heart } from "lucide-react";
import { toast } from "sonner";

interface LitDiya {
  id: number;
  name: string;
  isLit: boolean;
  timestamp?: Date;
}

export const VirtualDiya = () => {
  const [diyas, setDiyas] = useState<LitDiya[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: "",
      isLit: false,
    }))
  );
  const [selectedDiya, setSelectedDiya] = useState<number | null>(null);
  const [devoteeName, setDevoteeName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleDiyaClick = (diyaId: number) => {
    const diya = diyas.find(d => d.id === diyaId);
    if (diya?.isLit) {
      toast.info(`This diya was lit by ${diya.name}`);
      return;
    }
    setSelectedDiya(diyaId);
    setShowForm(true);
  };

  const lightDiya = () => {
    if (!devoteeName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setDiyas(prev => prev.map(diya => 
      diya.id === selectedDiya 
        ? { ...diya, name: devoteeName, isLit: true, timestamp: new Date() }
        : diya
    ));

    toast.success(`🪔 Diya lit by ${devoteeName}! May your prayers be answered.`);
    setShowForm(false);
    setDevoteeName("");
    setSelectedDiya(null);
  };

  const resetDiyas = () => {
    setDiyas(prev => prev.map(diya => ({ ...diya, name: "", isLit: false, timestamp: undefined })));
    toast.info("All diyas have been reset for new devotees");
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-medium text-primary">Virtual Blessing</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Light Your Virtual Diya
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience the divine energy by lighting a virtual diya. Click on any unlit diya below and make your prayer.
          </p>
        </div>

        {/* Diya Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 mb-8">
          {diyas.map((diya) => (
            <Card
              key={diya.id}
              className={`p-4 md:p-6 cursor-pointer transition-all duration-300 hover:scale-105 border-0 ${
                diya.isLit
                  ? 'bg-gradient-primary shadow-temple animate-pulse'
                  : 'bg-gradient-card shadow-card hover:shadow-diya'
              }`}
              onClick={() => handleDiyaClick(diya.id)}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`relative mb-2 ${diya.isLit ? 'animate-bounce' : ''}`}>
                  <Flame
                    className={`h-8 w-8 md:h-10 md:w-10 transition-colors duration-300 ${
                      diya.isLit ? 'text-yellow-400' : 'text-muted-foreground'
                    }`}
                  />
                  {diya.isLit && (
                    <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
                  )}
                </div>
                
                <div className="text-xs md:text-sm">
                  {diya.isLit ? (
                    <div className="text-white">
                      <div className="font-semibold truncate">{diya.name}</div>
                      <div className="text-white/80 text-xs">Blessed</div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      <div>Diya #{diya.id}</div>
                      <div className="text-xs">Click to light</div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-gradient-card rounded-xl shadow-card">
            <div className="text-2xl font-bold text-primary mb-1">
              {diyas.filter(d => d.isLit).length}
            </div>
            <div className="text-sm text-muted-foreground">Diyas Lit</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-card rounded-xl shadow-card">
            <div className="text-2xl font-bold text-primary mb-1">
              {12 - diyas.filter(d => d.isLit).length}
            </div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-card rounded-xl shadow-card col-span-2 md:col-span-1">
            <Heart className="h-6 w-6 text-primary mx-auto mb-1" />
            <div className="text-sm text-muted-foreground">Blessings Shared</div>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 bg-card border-border shadow-temple">
              <div className="text-center mb-6">
                <Flame className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Light Diya #{selectedDiya}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Enter your name to receive divine blessings
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="devotee-name" className="text-foreground font-medium">
                    Your Name *
                  </Label>
                  <Input
                    id="devotee-name"
                    type="text"
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-2"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setDevoteeName("");
                      setSelectedDiya(null);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="temple"
                    onClick={lightDiya}
                    className="flex-1"
                  >
                    Light Diya 🪔
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Reset Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={resetDiyas}
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            Reset All Diyas
          </Button>
        </div>
      </div>
    </section>
  );
};