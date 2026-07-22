import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="absolute top-0 right-0 p-4 z-10">
      <div className="flex gap-4">
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