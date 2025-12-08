import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookieConsent from "./components/CookieConsent";
import Index from "./pages/Index";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import LessonVault0406 from "./pages/LessonVault04-06";
import LessonVault0710 from "./pages/LessonVault07-10";
import PaymentForm from "./pages/PaymentForm";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import SignInPage from "./pages/SignInPage";
import DomesticEcology from "./pages/DomesticEcology";
import BiologyNature from "./pages/BiologyNature";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataDeletion from "./pages/DataDeletion";
import EmojiAI from "./pages/EmojiAI";
import Transportation from "./pages/Transportation";
import FruitItemRecognition from "./pages/FruitItemRecognition";
import FacialRecognition from "./pages/FacialRecognition";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CookieConsent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancelled" element={<PaymentCancelled />} />
          <Route path="/lesson-vault-04-06" element={<ProtectedRoute><LessonVault0406 /></ProtectedRoute>} />
          <Route path="/lesson-vault-07-10" element={<ProtectedRoute><LessonVault0710 /></ProtectedRoute>} />
          <Route path="/domestic-ecology" element={<ProtectedRoute><DomesticEcology /></ProtectedRoute>} />
          <Route path="/biology-nature" element={<ProtectedRoute><BiologyNature /></ProtectedRoute>} />
          <Route path="/emoji-ai" element={<ProtectedRoute><EmojiAI /></ProtectedRoute>} />
          <Route path="/fruit-item-recognition" element={<ProtectedRoute><FruitItemRecognition /></ProtectedRoute>} />
          <Route path="/facial-recognition" element={<ProtectedRoute><FacialRecognition /></ProtectedRoute>} />
          <Route path="/transportation" element={<ProtectedRoute><Transportation /></ProtectedRoute>} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
