import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import LessonVault0406 from "./pages/LessonVault04-06";
import LessonVault0710 from "./pages/LessonVault07-10";
import PaymentForm from "./pages/PaymentForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/lesson-vault-04-06" element={<LessonVault0406 />} />
          <Route path="/lesson-vault-07-10" element={<LessonVault0710 />} />
          <Route path="/payment" element={<PaymentForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
