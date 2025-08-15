import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, MapPin, Crown } from "lucide-react";
import { useState } from "react";

const DevoteeList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample devotee data organized by Navratri seasons
  const devoteesChaitra2024 = [
    { name: "Rajesh Kumar", city: "Mumbai", gotra: "Bharadwaj", diyaNumber: 1 },
    { name: "Priya Sharma", city: "Delhi", gotra: "Kashyap", diyaNumber: 2 },
    { name: "Amit Patel", city: "Ahmedabad", gotra: "Vishwamitra", diyaNumber: 3 },
    { name: "Sunita Gupta", city: "Jaipur", gotra: "Jamadagni", diyaNumber: 4 },
    { name: "Vikram Singh", city: "Chandigarh", gotra: "Atri", diyaNumber: 5 },
    { name: "Meera Joshi", city: "Pune", gotra: "Vashishtha", diyaNumber: 6 }
  ];

  const devoteesShardiya2024 = [
    { name: "Arun Mishra", city: "Varanasi", gotra: "Angirasa", diyaNumber: 7 },
    { name: "Kavita Agarwal", city: "Indore", gotra: "Gautam", diyaNumber: 8 },
    { name: "Deepak Thakur", city: "Shimla", gotra: "Bharadwaj", diyaNumber: 9 },
    { name: "Anita Roy", city: "Kolkata", gotra: "Kashyap", diyaNumber: 10 },
    { name: "Manoj Verma", city: "Lucknow", gotra: "Vishwamitra", diyaNumber: 11 },
    { name: "Pooja Sinha", city: "Patna", gotra: "Jamadagni", diyaNumber: 12 },
    { name: "Ramesh Chand", city: "Jodhpur", gotra: "Atri", diyaNumber: 13 },
    { name: "Laxmi Devi", city: "Udaipur", gotra: "Vashishtha", diyaNumber: 14 }
  ];

  const devoteesChaitra2025 = [
    { name: "Suresh Goel", city: "Agra", gotra: "Angirasa", diyaNumber: 15 },
    { name: "Seema Bansal", city: "Meerut", gotra: "Gautam", diyaNumber: 16 },
    { name: "Ravi Saxena", city: "Kanpur", gotra: "Bharadwaj", diyaNumber: 17 }
  ];

  const devoteesShardiya2025 = [
    { name: "Rohit Soni", city: "Surat", gotra: "Atri", diyaNumber: 18 },
    { name: "Neha Kapoor", city: "Gurgaon", gotra: "Vashishtha", diyaNumber: 19 },
    { name: "Ajay Tiwari", city: "Bhopal", gotra: "Angirasa", diyaNumber: 20 },
    { name: "Rekha Jain", city: "Nagpur", gotra: "Gautam", diyaNumber: 21 }
  ];

  const filterDevotees = (devotees: typeof devoteesChaitra2024) => {
    return devotees.filter(devotee =>
      devotee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      devotee.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      devotee.gotra.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const DevoteeCard = ({ devotee, index }: { devotee: any, index: number }) => (
    <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-temple transition-all duration-300 group hover:scale-105">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
            {devotee.name.charAt(0)}
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {devotee.name}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {devotee.city}
            </div>
            <div className="flex items-center gap-1">
              <Crown className="h-3 w-3" />
              {devotee.gotra}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Diya #{devotee.diyaNumber}</div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 pt-32 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-medium text-primary">Sacred Community</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Devotee List
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore the blessed community of devotees who have lit their diyas at our sacred temple
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search by name, city, or gotra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 border-border/50 focus:border-primary bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* Devotee List Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
            <Tabs defaultValue="shardiya2024" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-lg grid-cols-4 bg-muted/50">
                <TabsTrigger value="chaitra2024" className="font-medium text-xs md:text-sm">Chaitra 2024</TabsTrigger>
                <TabsTrigger value="shardiya2024" className="font-medium text-xs md:text-sm">Shardiya 2024</TabsTrigger>
                <TabsTrigger value="chaitra2025" className="font-medium text-xs md:text-sm">Chaitra 2025</TabsTrigger>
                <TabsTrigger value="shardiya2025" className="font-medium text-xs md:text-sm">Shardiya 2025</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="chaitra2024" className="space-y-4">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Chaitra Navratri 2024 Devotees
                </h2>
                <p className="text-muted-foreground">
                  {filterDevotees(devoteesChaitra2024).length} devotees found
                </p>
              </div>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filterDevotees(devoteesChaitra2024).map((devotee, index) => (
                  <DevoteeCard key={index} devotee={devotee} index={index} />
                ))}
              </div>
              
              {filterDevotees(devoteesChaitra2024).length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No devotees found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="shardiya2024" className="space-y-4">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Shardiya Navratri 2024 Devotees
                </h2>
                <p className="text-muted-foreground">
                  {filterDevotees(devoteesShardiya2024).length} devotees found
                </p>
              </div>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filterDevotees(devoteesShardiya2024).map((devotee, index) => (
                  <DevoteeCard key={index} devotee={devotee} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="chaitra2025" className="space-y-4">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Chaitra Navratri 2025 Pre-Bookings
                </h2>
                <p className="text-muted-foreground">
                  {filterDevotees(devoteesChaitra2025).length} early bookings received
                </p>
              </div>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filterDevotees(devoteesChaitra2025).map((devotee, index) => (
                  <DevoteeCard key={index} devotee={devotee} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shardiya2025" className="space-y-4">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Shardiya Navratri 2025 Pre-Bookings
                </h2>
                <p className="text-muted-foreground">
                  {filterDevotees(devoteesShardiya2025).length} early bookings received
                </p>
              </div>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filterDevotees(devoteesShardiya2025).map((devotee, index) => (
                  <DevoteeCard key={index} devotee={devotee} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="p-8 md:p-12 bg-gradient-primary text-white border-0 shadow-temple max-w-2xl mx-auto">
              <h3 className="font-display text-2xl font-bold mb-4">
                Join Our Sacred Community
              </h3>
              <p className="text-white/90 mb-6">
                Book your diya today and see your name in next year's devotee list
              </p>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Book Your Diya Now
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DevoteeList;