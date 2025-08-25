import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Flame, Calendar, Users, Heart } from "lucide-react";
import templeHero from "@/assets/temple-hero.jpg";
import diyaRows from "@/assets/diya-rows.jpg";
import CTA from "@/components/CTA";

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
            A sacred journey of faith, tradition, and divine blessings spanning
            over five decades
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                History
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  बहुत पुरानी बात है। इसी पावन स्थान पर श्री सिद्ध बाबा जी रहा
                  करते थे। कहा जाता है कि बाबा जी ने यहीं बैठकर वर्षों तक कठोर
                  तप किया और अपना संपूर्ण जीवन ईश्वर की भक्ति में लगा दिया।
                  अंततः इसी धरती पर उन्होंने समाधि ली। तभी से यह स्थान भक्तों के
                  लिए आस्था और श्रद्धा का केन्द्र बन गया।
                </p>
                <p>
                  मंदिर बनने से पहले भी आसपास के लोग यहाँ आकर बाबा जी की सेवा,
                  पूजा-अर्चना और भजन-कीर्तन करते थे। हर आने वाला अपने मन की बात
                  कहता, प्रसाद चढ़ाता और शांति लेकर लौटता। लोगों का विश्वास आज
                  भी यही है कि सिद्ध बाबा जी की कृपा से मनोकामनाएँ पूर्ण होती
                  हैं और मन को अद्भुत शांति मिलती है।
                </p>
                <p>
                  वर्ष 2008 में रायपुर के श्री मन्नू लाल साहू जी के सहयोग और
                  संकल्प से यहाँ मंदिर का निर्माण कराया गया। मंदिर बनने के बाद
                  धाम की महिमा और भी बढ़ी, नियमित पूजा, दीप-प्रज्वलन और सत्संग
                  से वातावरण सदा आध्यात्मिक बना रहता है। दूर-दूर से श्रद्धालु
                  यहाँ दर्शन के लिए आते हैं और बाबा जी के चरणों में नतमस्तक होकर
                  आशीर्वाद पाते हैं।
                </p>
                <p>
                  श्री सिद्ध बाबा धाम केवल एक मंदिर नहीं, यह विश्वास, सेवा और
                  भक्ति का जीवंत प्रतीक है, जहाँ हर हृदय को अपनापन और दिव्य
                  शांति का अनुभव होता है।
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
                श्री सिद्ध बाबा धाम में हर वर्ष चैत्र और शारदीय नवरात्रि पर
                विशेष दीप प्रज्वलन की परंपरा होती है। इस पावन अवसर पर भक्तजन
                अपने नाम से माता जी के चरणों में दीप जलवाते हैं। यह दीपक केवल
                प्रकाश का प्रतीक नहीं, बल्कि हर श्रद्धालु की मनोकामना और आस्था
                का प्रतीक होता है।
              </p>
              <p className="text-lg leading-relaxed mb-6">
                भक्तों का विश्वास है कि माता जी के चरणों में जलाया गया दीपक उनकी
                प्रार्थनाओं को स्वीकार करवाता है और जीवन में सुख-शांति,
                स्वास्थ्य और समृद्धि लेकर आता है। इसलिए हर वर्ष दूर-दूर से
                श्रद्धालु इस अनोखी परंपरा में भाग लेने आते हैं और अपने परिवार की
                मंगल कामनाओं के लिए दीप बुक कराते हैं।
              </p>
              <p className="text-lg leading-relaxed">
                मंदिर में प्रत्येक दीपक पुजारियों द्वारा विधि-विधान से माता जी
                को अर्पित किया जाता है। हजारों दीपों की लौ जब एक साथ प्रज्वलित
                होती है, तो वातावरण अलौकिक और दिव्य हो उठता है। यह दृश्य भक्तों
                के हृदय को भक्ति और ऊर्जा से भर देता है।
              </p>
              <p>
                दीया बुकिंग की यह परंपरा निरंतर बढ़ती जा रही है और आज यह श्रद्धा
                का एक जीवंत प्रतीक बन चुकी है, जहाँ हर भक्त अपनी आस्था को माता
                जी के चरणों में समर्पित करता है।
              </p>
            </div>
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </div>
  );
};

export default About;
