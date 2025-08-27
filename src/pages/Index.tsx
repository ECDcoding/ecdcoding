import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CallToAction from "@/components/CallToAction";
import Chatbot from "@/components/Chatbot";
import { Copyright, Mail } from "lucide-react";

const Index = () => {
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <Hero isHidden={isVoiceModeActive} />
        <CallToAction isHidden={isVoiceModeActive} />
      </div>
      <Chatbot onVoiceModeChange={setIsVoiceModeActive} />
      
      {/* Footer */}
      <footer className="w-full bg-background border-t border-border py-6">
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Copyright className="h-4 w-4" />
            <span className="text-sm">ECDcoding 2025</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            <Mail className="h-4 w-4" />
            <span className="text-sm">Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
