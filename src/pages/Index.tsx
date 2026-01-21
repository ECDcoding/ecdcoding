import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CallToAction from "@/components/CallToAction";
import Chatbot from "@/components/Chatbot";
import { Copyright } from "lucide-react";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import emailIcon from "@/assets/email-icon.png";
import adminIcon from "@/assets/admin-icon.png";
import stemLogo from "@/assets/stem-learning-logo.png";

const Index = () => {
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false);
  const { isAdmin } = useIsAdmin();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <Hero />
        <CallToAction />
      </div>
      <Chatbot onVoiceModeChange={setIsVoiceModeActive} />
      
      {/* Footer */}
      <footer className="w-full bg-background border-t border-border py-6 px-4">
        <div className="flex items-center justify-between w-full">
          <img src={stemLogo} alt="STEM Learning" className="h-10" />
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-muted-foreground">
            <span className="text-sm">Copyright</span>
            <Copyright className="h-4 w-4" />
            <span className="text-sm">ECDcoding 2026</span>
          </div>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            <img src={emailIcon} alt="Contact Us" className="h-6 w-6" />
          </Link>
          <a href="https://chat.whatsapp.com/FBhE9ZU2KDsKLi5OipxW4I" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            <FaWhatsapp className="h-5 w-5" />
          </a>
          <a href="https://www.facebook.com/61568116623673" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            <FaFacebook className="h-5 w-5" />
          </a>
          {isAdmin && (
            <Link to="/admin" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              <img src={adminIcon} alt="Admin" className="h-6 w-6" />
            </Link>
          )}
          </div>
          <div className="w-10" /> {/* Spacer for balance */}
        </div>
      </footer>
    </div>
  );
};

export default Index;
