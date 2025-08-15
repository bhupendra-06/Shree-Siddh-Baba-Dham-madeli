import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { Flame, Calendar, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import templeHero from "@/assets/temple-hero.jpg";

export const HeroSection = () => {
  // Navratri 2024 dates - adjust as needed
  const navratriDate = new Date("2024-10-15");

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${templeHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {/* Temple Icon */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
            <Flame className="h-5 w-5 text-accent diya-glow" />
            <span className="font-medium">Sacred Navratri Diya Lighting</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Shree Siddh Baba Dham
            <span className="block text-accent diya-glow">Temple</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Light your sacred diya and be part of our divine Navratri celebration. 
            Join thousands of devotees in this blessed ritual.
          </p>

          {/* Countdown Timer */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-accent">
              Navratri Begins In:
            </h3>
            <CountdownTimer targetDate={navratriDate} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/book-diya">
              <Button variant="temple" size="xl" className="font-semibold text-lg hover:scale-105 transition-transform duration-300">
                <Flame className="h-5 w-5" />
                Book Your Diya Now
              </Button>
            </Link>
            <Link to="/devotees">
              <Button variant="outline" size="xl" className="border-white/30 text-black hover:bg-white/20 hover:scale-105 transition-all duration-300">
                <Users className="h-5 w-5" />
                View Devotee List
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">5000+</div>
              <div className="text-white/80">Diyas Lit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-white/80">Years of Tradition</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">10K+</div>
              <div className="text-white/80">Devotees</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-temple-float">
        <Sparkles className="h-8 w-8 text-accent/60" />
      </div>
      <div className="absolute bottom-20 right-10 animate-temple-float" style={{ animationDelay: "2s" }}>
        <Sparkles className="h-6 w-6 text-accent/40" />
      </div>
    </section>
  );
};