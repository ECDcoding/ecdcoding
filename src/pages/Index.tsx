import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import Hero from "@/components/Hero";
import CallToAction from "@/components/CallToAction";
import AssistantHub from "@/components/AssistantHub";
import ExpoPhotoCarousel from "@/components/ExpoPhotoCarousel";
import { Calendar, Copyright, Mail, Phone, Shield } from "lucide-react";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import emailIcon from "@/assets/email-icon.png";
import adminIcon from "@/assets/admin-icon.png";


const Index = () => {
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false);
  const { isAdmin } = useIsAdmin();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Signed-in users stay on the landing page so they can choose their own age group.



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <Hero />
        <CallToAction />
      </main>
      <AssistantHub context="Inside ECDcoding" onVoiceModeChange={setIsVoiceModeActive} showReception />

      <ExpoPhotoCarousel />

      {/* Footer */}
      <footer className="w-full bg-background border-t border-border py-6 px-4">
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center space-x-8">
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Copyright</span>
              <Copyright className="h-4 w-4 text-lime-400" />
              <span className="text-sm">ECDcoding 2026</span>
            </div>
          </div>
          <Popover>
            <PopoverTrigger className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              <img src={emailIcon} alt="Contact Us" className="h-6 w-6" />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4 bg-background border border-border shadow-lg z-50">
              <div className="space-y-3">
                <p className="font-semibold text-sm text-foreground">Contact Us</p>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:info@ecdcoding.co.za" className="text-muted-foreground hover:text-primary transition-colors">
                    info@ecdcoding.co.za
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+27730639622" className="text-muted-foreground hover:text-primary transition-colors">
                    +27 73 063 9622
                  </a>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <a href="https://chat.whatsapp.com/FBhE9ZU2KDsKLi5OipxW4I" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-green-500 transition-colors">
                    <FaWhatsapp className="h-5 w-5" />
                  </a>
                  <a href="https://www.facebook.com/61568116623673" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-500 transition-colors">
                    <FaFacebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Link to="/privacy-policy" className="text-lime-400 hover:text-lime-300 transition-colors flex items-center gap-1" title="Privacy Policy">
            <Shield className="h-5 w-5" />
            <span className="text-sm text-muted-foreground">Privacy Policy</span>
          </Link>
          <button
            type="button"
            onClick={() => toast("No Events Yet")}
            className="text-lime-400 hover:text-lime-300 transition-colors flex items-center gap-1"
            title="Events"
          >
            <Calendar className="h-5 w-5" />
            <span className="text-sm text-muted-foreground">Events</span>
          </button>
          {isAdmin && (
            <Link to="/admin" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              <img src={adminIcon} alt="Admin" className="h-6 w-6" />
            </Link>
          )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
