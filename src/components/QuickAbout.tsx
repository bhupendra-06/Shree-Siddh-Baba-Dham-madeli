import { Card } from "@/components/ui/card";
import { Flame, Heart, Users, Calendar } from "lucide-react";

export const QuickAbout = () => {
  return (
    <section className="pt-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            About Siddh Baba Dham Madeli
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            For over five decades, Siddh Baba Dham Madeli has been a beacon of spiritual light, 
            where devotees gather to celebrate the divine festival of Navratri. Our sacred 
            diya lighting ritual brings together thousands of faithful hearts in prayer and devotion.
          </p>
        </div>
      </div>
    </section>
  );
};