import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Heart, Building, Users, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import QrCode from "@/assets/qr-any-amount.jpg";

const Donations = () => {
  const { toast } = useToast();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankDetails = {
    accountName: "GIRIRAJ  NIRMALKAR",
    accountNumber: "918010064188600",
    ifscCode: "UTIB0001728",
    bankName: "Axis Bank",
    // branch: "Temple Road Branch"
  };

  const upiId = "9009610596@axisbank";
  const upiLink = "upi://pay?pa=9009610596@axisbank&pn=GIRIRAJ&cu=INR";

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast({
      title: "Copied!",
      description: `${field} copied to clipboard`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const donationPurposes = [
    {
      icon: Lightbulb,
      title: "Diya Oil/Ghee & Supplies",
      description:
        "Support the procurement of sacred oil, wicks, and supplies for our daily diya lighting rituals.",
      amount: "Oil - ₹751 / Ghee - ₹2151",
    },
    {
      icon: Building,
      title: "Temple Maintenance",
      description:
        "Help maintain our sacred temple premises, cleanliness, and infrastructure improvements.",
      amount: "₹5001",
    },
    {
      icon: Users,
      title: "Bhojan Prashad",
      description:
        "Support free meals, prashad for pilgrims, and community welfare programs.",
      amount: "₹10001",
    },
    {
      icon: Heart,
      title: "General Donation",
      description:
        "Contribute to the overall functioning and spiritual activities of the temple.",
      amount: "Any Amount",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-10 pt-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-3xl font-bold text-foreground mb-6">
            हमारे मंदिर का सहयोग करें
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            आपकी उदारता हमें हमारी दिव्य परंपराओं को संजोए रखने और भक्तों की
            सेवा में निरंतर समर्पित रहने की शक्ति देती है
          </p>
        </div>
      </section>

      {/* Donation Purposes
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              आपके दान से कैसे सहयोग मिलता है
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              आपका हर योगदान, चाहे कितना ही छोटा क्यों न हो, हमारे मंदिर की दिव्य परंपराओं को जीवित रखता है और हमें भक्तों की सेवा के पथ पर आगे बढ़ाता है
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {donationPurposes.map((purpose, index) => (
              <Card key={index} className="p-6 text-center group hover:shadow-temple transition-all duration-500 bg-gradient-card border-0 hover:scale-105">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 group-hover:shadow-diya transition-all duration-300">
                  <purpose.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {purpose.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {purpose.description}
                </p>
                <div className="text-primary font-bold text-lg">
                  {purpose.amount}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Payment Methods */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Donation Methods
              </h2>
              <p className="text-muted-foreground">
                Choose your preferred method to make a secure donation
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* UPI Payment */}
              <Card className="p-8 bg-gradient-card border-0 shadow-card hover:shadow-temple transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    UPI Payment
                  </h3>
                  <p className="text-muted-foreground">
                    Quick and secure digital payment
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-border/50">
                    <div className="relative flex items-center justify-end gap-2">
                      <div className="absolute left-0">
                        <label className="text-sm font-medium text-gray-600/75">
                          UPI ID
                        </label>
                        <div className="font-mono text-sm break-words">
                          {upiId}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(upiId, "UPI ID")}
                        className={
                          copiedField === "UPI ID"
                            ? "bg-green-100 text-green-700"
                            : ""
                        }
                      >
                        <Copy className="h-4 w-4" />
                        {copiedField === "UPI ID" ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <div className="w-24 h-24 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <img
                        src={QrCode}
                        alt="UPI QR Code"
                        className="w-full rounded-lg object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Scan with any UPI app to donate
                    </p>
                  </div>

                  <Button
                    variant="temple"
                    className="w-full md:hidden"
                    onClick={() => {
                      window.location.href =
                        "upi://pay?pa=9009610596@axisbank&pn=GIRIRAJ&cu=INR";
                    }}
                  >
                    <Heart className="h-4 w-4" />
                    Pay with UPI
                  </Button>
                </div>
              </Card>

              {/* Bank Transfer */}
              <Card className="p-8 bg-gradient-card border-0 shadow-card hover:shadow-temple transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-secondary rounded-full mb-4">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Bank Transfer
                  </h3>
                  <p className="text-muted-foreground">
                    Direct bank account transfer
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(bankDetails).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-white p-4 rounded-lg border border-border/50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </label>
                          <div className="text-foreground font-mono break-all">
                            {value}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(value, key)}
                          className={
                            copiedField === key
                              ? "bg-green-100 text-green-700"
                              : ""
                          }
                        >
                          <Copy className="h-4 w-4" />
                          {copiedField === key ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Important Note */}

            <Card className="mt-12 p-8 bg-gradient-primary text-white border-0 shadow-temple">
              <div className="text-center">
                <Heart className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold mb-4">
                  Your Donation Makes a Difference
                </h3>
                <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
                  All donations are used for temple maintenance, community
                  services, and preserving our sacred traditions. You will
                  receive a confirmation receipt and blessing certificate via
                  WhatsApp or email after your donation.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donations;
