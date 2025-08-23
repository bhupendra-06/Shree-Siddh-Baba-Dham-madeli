import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, Gift, Camera, Users } from "lucide-react";
import { Link } from "react-router-dom";
import diyaLight from "@/assets/diya-light.jpg";
import diyaRows from "@/assets/diya-rows.jpg";

export const HighlightCards = () => {
  const highlights = [
    {
      icon: Flame,
      title: "Light Your Diya",
      description: "Book your personal diya for the sacred Navratri celebration and make your prayers shine bright.",
      image: diyaLight,
      buttonText: "Book Now",
      buttonVariant: "temple" as const,
      color: "from-primary to-accent",
      link: "/book-diya"
    },
    {
      icon: Gift,
      title: "Sponsor a Day",
      description: "Sponsor an entire day of Prashad and bring blessings to your family and community.",
      image: diyaRows,
      buttonText: "Sponsor",
      buttonVariant: "diya" as const,
      color: "from-secondary to-primary",
      link: "/donations"
    },
    {
      icon: Camera,
      title: "View Gallery",
      description: "Explore beautiful moments from our past Navratri celebrations and divine ceremonies.",
      image: diyaRows,
      buttonText: "View Gallery",
      buttonVariant: "outline" as const,
      color: "from-primary to-accent",
      link: "/gallery"
    }
  ];

  return (
    <section className="pt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            उत्सव का हिस्सा बनें
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose how you want to be part of our sacred Navratri celebration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <Card key={index} className="group overflow-hidden border-0 shadow-card hover:shadow-temple transition-all duration-500 bg-gradient-card">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={highlight.image} 
                  alt={highlight.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${highlight.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
                    <highlight.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {highlight.description}
                </p>
                <Link to={highlight.link}>
                  <Button 
                    variant={highlight.buttonVariant} 
                    className="w-full group-hover:scale-105 transition-transform duration-300"
                  >
                    <highlight.icon className="h-4 w-4" />
                    {highlight.buttonText}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};