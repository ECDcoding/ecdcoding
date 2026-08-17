import { ArrowLeft, Home } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EcologyVideoAnalysis, { ECOLOGY_CATEGORIES } from "@/components/EcologyVideoAnalysis";

const DomesticEcology = () => {
  const [searchParams] = useSearchParams();
  const requested = searchParams.get("category");
  const initialCategory = ECOLOGY_CATEGORIES.some((c) => c.value === requested)
    ? (requested as string)
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link to="/lesson-vault-04-06">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Lessons</span>
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
          </div>
          <h1 className="text-xl font-semibold text-foreground">Domestic Ecology</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <EcologyVideoAnalysis initialCategory={initialCategory} />
      </main>
    </div>
  );
};

export default DomesticEcology;