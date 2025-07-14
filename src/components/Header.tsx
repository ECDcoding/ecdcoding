import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="absolute top-0 right-0 p-4 z-10">
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Register
        </Button>
        <Button 
          variant="outline" 
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Sign in
        </Button>
      </div>
    </header>
  );
};

export default Header;