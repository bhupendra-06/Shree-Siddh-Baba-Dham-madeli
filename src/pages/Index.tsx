import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { QuickAbout } from "@/components/QuickAbout";
import { HighlightCards } from "@/components/HighlightCards";
import MembersCarousel from "@/components/MembersCarousel";
import { CommunityCarousel } from "@/components/CommunityCarousel";
import { Footer } from "@/components/Footer";
import GoogleMapComponent from "@/components/GoogleMapComponent";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <QuickAbout />
      <HighlightCards />
      <MembersCarousel />
      {/* <CommunityCarousel /> */}
      <GoogleMapComponent />
      <Footer />
    </div>
  );
};

export default Index;
