import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CallToAction from "@/components/CallToAction";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <Hero />
        <CallToAction />
      </div>
      <Chatbot />
    </div>
  );
};

export default Index;
