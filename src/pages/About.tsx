import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Flame, Calendar, Users, Heart } from "lucide-react";
import templeHero from "@/assets/temple-hero.jpg";
import diyaRows from "@/assets/diya-rows.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 pt-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${templeHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Flame className="h-5 w-5 text-primary" />
            <span className="font-medium text-primary">Sacred Heritage</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            About Siddh Baba Dham Madeli
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A sacred journey of faith, tradition, and divine blessings spanning over five decades
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Sacred History
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Established in 1970, Siddh Baba Dham Madeli has been a beacon of spiritual light for devotees across the nation. Our temple stands as a testament to unwavering faith and the power of collective prayer.
                </p>
                <p>
                  The tradition of diya lighting during Navratri began as a simple offering by a handful of devotees and has grown into a magnificent celebration where thousands of diyas illuminate the sacred premises, creating a divine atmosphere that touches every heart.
                </p>
                <p>
                  Each diya represents not just light, but hope, faith, and the eternal connection between the devotee and the divine. Our temple has witnessed countless miracles and answered prayers through these sacred rituals.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={diyaRows} 
                alt="Temple Diya Lighting" 
                className="rounded-2xl shadow-temple w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-primary/20 rounded-2xl"></div>
            </div>
          </div>


          {/* Story Section */}
          <div className="bg-gradient-card rounded-3xl p-8 md:p-12 border border-border/50">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              The Story of Diya Booking
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                The tradition of diya booking at Siddh Baba Dham Madeli began in 1985 when our beloved temple priest, Pandit Ramesh Sharma, had a divine vision during meditation. In his vision, he saw thousands of diyas creating a celestial pathway for the goddess to descend and bless her devotees.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                What started as a humble offering by 25 families has now grown to accommodate over 10,000 devotees annually. Each diya is personally blessed by our priests and lit with sacred mantras, ensuring that every devotee's prayers reach the divine.
              </p>
              <p className="text-lg leading-relaxed">
                Today, devotees from across India and abroad book their diyas months in advance, knowing that this sacred ritual will bring prosperity, health, and happiness to their families. The booking system was introduced to ensure that every devotee gets their turn to participate in this blessed tradition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;