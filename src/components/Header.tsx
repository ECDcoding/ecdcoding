import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const Header = () => {
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
          <DropdownMenuContent className="bg-background border border-border">
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
                Tech Teacher
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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