import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Flame, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Youtube,
  QrCode,
  Heart
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-muted/30 to-muted/60 pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Temple Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-primary rounded-lg shadow-temple">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground">
                  Shree Siddh Baba Dham Madeli
                </h3>
                <p className="text-muted-foreground">Sacred Temple, Madeli</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Experience the divine blessings of Navratri at our sacred temple. 
              For over 50 years, we have been lighting the path of devotion and 
              bringing communities together in prayer and celebration.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white transition-all duration-300">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg text-foreground mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Shree Siddh Baba Dham Madeli Temple<br />
                    Madeli, Gariaband - 493889, Chhattisgarh
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">+91 78048 27109</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">shreesiddhababamadeli@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Donation Section */}
          <div>
            <h4 className="font-display font-semibold text-lg text-foreground mb-4">
              Support Our Temple
            </h4>
            <Card className="p-4 bg-gradient-card border border-primary/20 shadow-card">
              <div className="text-center">
                <QrCode className="h-16 w-16 mx-auto text-primary mb-3" />
                <p className="text-sm text-muted-foreground mb-3">
                  Scan to donate via UPI
                </p>
                <p className="text-xs text-accent font-medium">
                  temple@upi
                </p>
              </div>
            </Card>
            <Link to="/donations">
              <Button variant="diya" className="w-full mt-4 hover:scale-105 transition-transform duration-300">
                <Heart className="h-4 w-4" />
                Donate Now
              </Button>
            </Link>
          </div>
        </div>


        {/* Bottom Footer */}
        <div className="border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            ©{new Date().getFullYear()} Shree Siddh Baba Dham Madeli. All rights reserved. | 
            <a href="#" className="hover:text-primary transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-primary transition-colors ml-1">Terms of Service</a>
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for our devotee community
          </p>
        </div>
      </div>
    </footer>
  );
};