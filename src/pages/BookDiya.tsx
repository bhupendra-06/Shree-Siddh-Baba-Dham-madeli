import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Flame, Star, Shield, Heart } from "lucide-react";
import { useState } from "react";
import diyaLight from "@/assets/diya-light.jpg";

const BookDiya = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    city: "",
    gotra: "",
    prayer: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const diyaPackages = [
    {
      name: "Oil Diya",
      price: "₹751",
      features: ["",],
      popular: false
    },
    {
      name: "Ghee Diya",
      price: "₹2151",
      features: ["3 Sacred Diyas", "Family Prayer", "WhatsApp Photos", "Digital Certificate", "Special Blessing"],
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 pt-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${diyaLight})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Flame className="h-5 w-5 text-primary diya-glow" />
            <span className="font-medium text-primary">Sacred Booking</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Book Your Sacred Diya
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Light up your prayers and bring divine blessings to your family this Navratri
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Choose Your Blessing Package
          </h2>
          
          <div className="mx-auto w-1/2 flex gap-2 justify-around mb-16">
            {diyaPackages.map((pkg, index) => (
              <Card key={index} className={`p-8 max-w-md text-center border-0 transition-all duration-500 hover:scale-105 hover:shadow-temple ${
                'border-gradient-primary border-2 text-white shadow-temple scale-105' 
              }`}>
                
                <h3 className={`font-display text-2xl font-bold mb-4 ${
                  'text-foreground'
                }`}>
                  {pkg.name}
                </h3>
                
                <div className={`text-4xl font-bold mb-6 ${
                  pkg.popular ? 'text-white' : 'text-primary'
                }`}>
                  {pkg.price}
                </div>
                
                <Button 
                  variant={pkg.popular ? "outline" : "temple"} 
                  className={`w-full ${
                    pkg.popular 
                      ? 'border-white/30 text-white hover:bg-white/10' 
                      : ''
                  }`}
                >
                  Book Your Diya
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-card border-0 shadow-temple">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                  <Flame className="h-8 w-8 text-white" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Diya Booking Form
                </h2>
                <p className="text-muted-foreground">
                  Fill in your details to book your sacred diya for Navratri celebration
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="mt-2 border-border/50 focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact" className="text-sm font-medium text-foreground">
                      Contact Number *
                    </Label>
                    <Input
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder="Enter your contact number"
                      className="mt-2 border-border/50 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-foreground">
                      Full Address *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city or village"
                      className="mt-2 border-border/50 focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="gotra" className="text-sm font-medium text-foreground">
                      Whatsapp Number *
                    </Label>
                    <Input
                      id="gotra"
                      name="gotra"
                      value={formData.gotra}
                      onChange={handleInputChange}
                      placeholder="Enter your Whatsapp number"
                      className="mt-2 border-border/50 focus:border-primary"
                      required
                    />
                  </div>
                </div>


                <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-600">
                    Your information is secure and will only be used for temple communications and diya lighting ceremony.
                  </p>
                </div>

                <Button type="submit" variant="temple" size="lg" className="w-full text-lg">
                  <Flame className="h-5 w-5" />
                  Book Your Diya
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookDiya;