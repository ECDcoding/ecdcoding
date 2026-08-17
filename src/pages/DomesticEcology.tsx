import { ArrowLeft, Home } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Domestic Ecology Pictures</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-4xl">
              <img 
                src="/lovable-uploads/domestic-ecology-content.jpg" 
                alt="Domestic Ecology Learning Material"
                className="w-full h-auto rounded-lg shadow-lg border border-border"
              />
            </div>
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Interactive learning content for understanding domestic ecology concepts.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/lesson-vault-04-06">
                  <Button variant="outline">Back to All Lessons</Button>
                </Link>
                <Link to="/">
                  <Button>Go Home</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <EcologyVideoAnalysis initialCategory={initialCategory} />
      </main>
    </div>
  );
};

export default DomesticEcology;