import { Card } from "@/components/ui/card";
import { Flame, Heart, Users, Calendar } from "lucide-react";

export const QuickAbout = () => {
  return (
    <section className="pt-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            मंदिर का इतिहास
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            पिछले कई वर्षों से श्री सिद्ध बाबा धाम मडेली आस्था और भक्ति का दीपस्तंभ रहा है। यहाँ श्रद्धालु एकत्रित होकर नवरात्रि का पावन उत्सव मनाते हैं। विशेष दीप प्रज्वलन की यह परंपरा हजारों हृदयों को भक्ति और प्रार्थना में जोड़ती है।
          </p>
        </div>
      </div>
    </section>
  );
};