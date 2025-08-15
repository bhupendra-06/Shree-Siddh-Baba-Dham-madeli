import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { QuickAbout } from "@/components/QuickAbout";
import { HighlightCards } from "@/components/HighlightCards";
import { VirtualDiya } from "@/components/VirtualDiya";
import { CommunityCarousel } from "@/components/CommunityCarousel";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <QuickAbout />
      <HighlightCards />
      <VirtualDiya />
      <CommunityCarousel />
      <Footer />
    </div>
  );
};

export default Index;
