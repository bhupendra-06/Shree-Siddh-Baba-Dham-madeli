import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Users, MapPin, Flame } from "lucide-react"; // 🔥 replaced Phone with Flame for diya
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CTA from "@/components/CTA";

interface Devotee {
  id: string;
  name: string;
  whatsappNumber: string;
  address: string;
  year: number;
  season: string;
  paymentStatus: string;
}

const getSeason = ()=> {
  const month = new Date().getMonth() + 1;

  if(month >= 3 && month <= 5) return "CHAITRA";
  if(month >= 9 && month <= 11) return "SHARDIYA";
  return "SHARDIYA"; // Default value if not in range

};

const DevoteeList = () => {
  const [devotees, setDevotees] = useState<Devotee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedSeason, setSelectedSeason] = useState(getSeason());

  // Fetch devotees from API
  useEffect(() => {
    const fetchDevotees = async () => {
      try {
        const res = await fetch("https://siddhbabatemplebackend.onrender.com/api/bookings");
        const data = await res.json();
        if (Array.isArray(data)) {
          setDevotees(data);
        } else {
          console.error("Unexpected response:", data);
        }
      } catch (err) {
        console.error("Error fetching devotees:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDevotees();
  }, []);

  // Filter function
  const filterDevotees = () => {
    return devotees.filter(
      (devotee) =>
        devotee.year === selectedYear &&
        devotee.season.toLowerCase() === selectedSeason.toLowerCase() &&
        (devotee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          devotee.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          devotee.whatsappNumber.includes(searchTerm))
    );
  };

  const DevoteeCard = ({ devotee, index }: { devotee: Devotee; index: number }) => (
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
              <Flame className="h-3 w-3 text-orange-500" /> {/* 🔥 diya icon */}
              Diya #{index + 1}
            </div>
          </div>
          <p className="text-xs mt-2 text-muted-foreground">
            Status:{" "}
            <span
              className={`${
                devotee.paymentStatus === "PAID" ? "text-green-600" : "text-red-600"
              } font-medium`}
            >
              {devotee.paymentStatus}
            </span>
          </p>
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
          <div className="max-w-md mx-auto relative mb-6">
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

          {/* Filters (Mobile friendly dropdowns) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Select value={selectedYear.toString()} onValueChange={(val) => setSelectedYear(Number(val))}>
              <SelectTrigger className="w-full sm:w-40 bg-white">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSeason} onValueChange={(val) => setSelectedSeason(val)}>
              <SelectTrigger className="w-full sm:w-40 bg-white">
                <SelectValue placeholder="Select Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CHAITRA">Chaitra</SelectItem>
                <SelectItem value="SHARDIYA">Shardiya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Devotee List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading devotees...</p>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  {selectedSeason} {selectedYear} Devotees
                </h2>
                <p className="text-muted-foreground">{filterDevotees().length} devotees found</p>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filterDevotees().map((d, i) => (
                  <DevoteeCard key={d.id} devotee={d} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
};

export default DevoteeList;
