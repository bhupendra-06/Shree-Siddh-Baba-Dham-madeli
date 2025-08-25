import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import CTA from "@/components/CTA";

// Example data
const devotees = [
  { name: "Bhupendra", whatsappNumber: "8888888888", address: "Bhilai, CG", year: 2024, season: "SHARDIYA" },
  { name: "RajKumar", whatsappNumber: "8888888888", address: "Bhilai, CG", year: 2024, season: "SHARDIYA" },
  { name: "Rahul", whatsappNumber: "8888888888", address: "Bhilai, CG", year: 2024, season: "SHARDIYA" },
  { name: "Deepak", whatsappNumber: "8888888888", address: "Bhilai, CG", year: 2024, season: "SHARDIYA" },
  { name: "Rohit", whatsappNumber: "9999999999", address: "Raipur, CG", year: 2024, season: "CHAITRA" },
  { name: "Priya", whatsappNumber: "7777777777", address: "Durg, CG", year: 2025, season: "SHARDIYA" },
  { name: "Amit", whatsappNumber: "6666666666", address: "Bilaspur, CG", year: 2025, season: "CHAITRA" }
];

const DevoteeList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter function by year, season, and search
  const filterDevotees = (year: number, season: string) => {
    return devotees.filter(devotee =>
      devotee.year === year &&
      devotee.season.toLowerCase() === season.toLowerCase() &&
      (devotee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       devotee.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
       devotee.whatsappNumber.includes(searchTerm))
    );
  };

  const DevoteeCard = ({ devotee }: { devotee: any }) => (
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
              {devotee.address}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {devotee.whatsappNumber}
            </div>
          </div>
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
              placeholder="Search by name, address, or number..."
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

            {/* Tab Contents */}
            <TabsContent value="chaitra2024" className="space-y-4">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Chaitra 2024 Devotees</h2>
                <p className="text-muted-foreground">{filterDevotees(2024, "CHAITRA").length} devotees found</p>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filterDevotees(2024, "CHAITRA").map((d, i) => <DevoteeCard key={i} devotee={d} />)}
              </div>
            </TabsContent>

            <TabsContent value="shardiya2024" className="space-y-4">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Shardiya 2024 Devotees</h2>
                <p className="text-muted-foreground">{filterDevotees(2024, "SHARDIYA").length} devotees found</p>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filterDevotees(2024, "SHARDIYA").map((d, i) => <DevoteeCard key={i} devotee={d} />)}
              </div>
            </TabsContent>

            <TabsContent value="chaitra2025" className="space-y-4">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Chaitra 2025 Devotees</h2>
                <p className="text-muted-foreground">{filterDevotees(2025, "CHAITRA").length} devotees found</p>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filterDevotees(2025, "CHAITRA").map((d, i) => <DevoteeCard key={i} devotee={d} />)}
              </div>
            </TabsContent>

            <TabsContent value="shardiya2025" className="space-y-4">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Shardiya 2025 Devotees</h2>
                <p className="text-muted-foreground">{filterDevotees(2025, "SHARDIYA").length} devotees found</p>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filterDevotees(2025, "SHARDIYA").map((d, i) => <DevoteeCard key={i} devotee={d} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <CTA />
      <Footer />
    </div>
  );
};

export default DevoteeList;
