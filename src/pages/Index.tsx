import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CallToAction from "@/components/CallToAction";
import Chatbot from "@/components/Chatbot";
import { Copyright, Mail } from "lucide-react";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";

const Index = () => {
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <Hero />
        <CallToAction />
      </div>
      <Chatbot onVoiceModeChange={setIsVoiceModeActive} />
      
      {/* Footer */}
      <footer className="w-full bg-background border-t border-border py-6">
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Copyright className="h-4 w-4" />
            <span className="text-sm">ECDcoding 2025</span>
          </div>
          <Link to="/contact" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            <Mail className="h-4 w-4" />
            <span className="text-sm">Contact Us</span>
          </Link>
          <a href="https://chat.whatsapp.com/FBhE9ZU2KDsKLi5OipxW4I" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            <FaWhatsapp className="h-5 w-5" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61568116623673" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            <FaFacebook className="h-5 w-5" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
