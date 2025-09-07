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
  Heart,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-muted/30 to-muted/60 pt-10 pb-8">
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
                <h3 className="rozha-one-regular font-display font-bold text-2xl text-foreground">
                  श्री सिद्ध बाबा धाम
                </h3>
                <p className="text-muted-foreground">पावन मंदिर, मड़ेली</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              नवरात्रि के शुभ अवसर पर आइए, दिव्य आशीर्वाद का अनुभव कीजिए। पिछले
              20 वर्षों से हम भक्ति की राह को आलोकित कर रहे हैं और भक्तों को
              प्रार्थना व उत्सव में जोड़ रहे हैं।
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg text-foreground mb-4">
              संपर्क करें
            </h4>
            <div className="space-y-3 ">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    श्री सिद्ध बाबा धाम मड़ेली,
                    <br />
                    गरियाबंद, छत्तीसगढ़ (493889)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />

                <a
                  href="tel:8839117716"
                  className="text-sm text-muted-foreground"
                >
                  +91 88391 17716
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <a
                  href="mailto:shreesiddhababadhammadeli@gmail.com"
                  className="text-sm text-muted-foreground break-all leading-snug"
                >
                  shreesiddhababadhammadeli@gmail.com
                </a>
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
                  9009610596@axisbank
                </p>
              </div>
            </Card>
            <Link to="/donations">
              <Button
                variant="diya"
                className="w-full mt-4 hover:scale-105 transition-transform duration-300"
              >
                <Heart className="h-4 w-4" />
                Donate Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            ©{new Date().getFullYear()} Shree Siddh Baba Dham Madeli. All rights
            reserved. |
            <a href="/" className="hover:text-primary transition-colors ml-1">
              Privacy Policy
            </a>
            |
            <a href="/" className="hover:text-primary transition-colors ml-1">
              Terms of Service
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for our devotee community
          </p>
        </div>
      </div>
    </footer>
  );
};
