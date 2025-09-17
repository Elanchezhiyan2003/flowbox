{
  /* THIS IS A DEMO SAMPLE WHILE THE APP IS SPINNING, PLEASE REPLACE IT COMPLETELY */
}

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { AuthModal } from "@/components/auth/AuthModal";

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <Header onAuthClick={handleAuthClick} />
      <main>
        <HeroSection onGetStarted={handleAuthClick} />
        <FeaturesSection />
      </main>
      <Footer />
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen} 
      />
    </div>
  );
}

export default App;