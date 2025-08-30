import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Flame, Shield } from "lucide-react";
import { useState } from "react";
import CTA from "@/components/CTA";

const BookDiya = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    city: "",
    gotra: "",
    prayer: "",
    diyaType: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Auto detect season
    const getSeason = () => {
      const month = new Date().getMonth() + 1; // getMonth() is 0-based
      if (month >= 2 && month <= 5) {
        return "CHAITRA";
      }
      if (month >= 9 && month <= 11) {
        return "SHARDIYA";
      }
      return "SHARDIYA"; // default fallback
    };

    // Map your formData to API format
    const payload = {
      name: formData.name,
      whatsappNumber: formData.gotra, // gotra field = whatsappNumber
      address: formData.city, // city field = address
      year: new Date().getFullYear(),
      season: getSeason(),
    };

    try {
      const response = await fetch(
        "https://siddhbabatemplebackend.onrender.com/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("🎉 Your diya has been booked successfully!");
        setFormData({
          name: "",
          contact: "",
          city: "",
          gotra: "",
          prayer: "",
          diyaType: "",
        });
      } else {
        setMessage(
          data.message || "❌ Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Unable to connect. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Booking Form */}
      <section id="book-your-diya" className="py-10 bg-muted/30">
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
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Full Address *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city or village"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contact">Contact Number *</Label>
                    <Input
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder="Enter your contact number"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="gotra">Whatsapp Number *</Label>
                    <Input
                      id="gotra"
                      name="gotra"
                      value={formData.gotra}
                      onChange={handleInputChange}
                      placeholder="Enter your Whatsapp number"
                      required
                    />
                  </div>
                </div>

                {/* Diya Type */}
                <div>
                  <Label htmlFor="diyaType">Diya Type *</Label>
                  <select
                    id="diyaType"
                    name="diyaType"
                    value={formData.diyaType}
                    onChange={handleInputChange}
                    className="mt-2 w-full border rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Select your diya type</option>
                    <option value="Oil Diya">Oil Diya - ₹751</option>
                    <option value="Ghee Diya">Ghee Diya - ₹2151</option>
                  </select>
                </div>

                {/* Info */}
                <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-600">
                    Your information is secure and will only be used for temple
                    communications.
                  </p>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="temple"
                  size="lg"
                  className="w-full text-lg"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book Your Diya"}
                </Button>

                {message && (
                  <p className="text-center mt-4 text-sm font-medium text-primary">
                    {message}
                  </p>
                )}
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
