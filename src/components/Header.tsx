import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import SignIn from "./SignIn";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="absolute top-0 right-0 p-4 z-10">
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Register <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 bg-background border border-border shadow-lg">
            <DropdownMenuItem asChild>
              <Link to="/register?type=parent" className="cursor-pointer">
                Parent
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/register?type=ecd-manager" className="cursor-pointer">
                ECD Manager
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/register?type=tech-teacher" className="cursor-pointer">
                Tech Teacher Mentorship
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {user ? (
          <>
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/lesson-vault-04-06">My Lesson Vault</Link>
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={signOut}
            >
              Sign out
            </Button>
          </>
        ) : (
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => setSignInOpen(true)}
          >
            Sign in
          </Button>
        )}
        
        <SignIn open={signInOpen} onOpenChange={setSignInOpen} />
      </div>
    </header>
  );
};

export default Header;