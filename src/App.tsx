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
import SignInPage from "./pages/SignInPage";
import DomesticEcology from "./pages/DomesticEcology";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataDeletion from "./pages/DataDeletion";
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="/lesson-vault-04-06" element={<ProtectedRoute><LessonVault0406 /></ProtectedRoute>} />
          <Route path="/lesson-vault-07-10" element={<ProtectedRoute><LessonVault0710 /></ProtectedRoute>} />
          <Route path="/domestic-ecology" element={<ProtectedRoute><DomesticEcology /></ProtectedRoute>} />
          <Route path="/payment" element={<PaymentForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
