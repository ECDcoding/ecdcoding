import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly at info@ecdcoding.co.za",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#395B50", paddingTop: "85px" }}>
      {/* Back to Home Link */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Logo */}
      <div className="text-center mb-12">
        <img 
          src="/lovable-uploads/6f846a04-7251-473a-8a8d-adf8aa1bb9c1.png" 
          alt="ECDcoding Logo" 
          className="mx-auto"
          style={{ width: "270px", height: "190px" }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-helvetica font-semibold text-yellow-400 mb-4">
            Contact Us
          </h2>
          <h4 className="text-gray-400 text-base leading-relaxed">
            We'd love to hear from you!
          </h4>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Name Field */}
          <div className="relative">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-8 text-yellow-400 border-0 rounded text-base placeholder:text-transparent focus:placeholder:text-gray-400"
              style={{ backgroundColor: "#132a13" }}
              placeholder="Name"
            />
            <Label 
              htmlFor="name" 
              className={`absolute left-8 transition-all duration-200 pointer-events-none ${
                formData.name ? 'top-2 text-xs text-white' : 'top-8 text-white'
              }`}
            >
              Name
            </Label>
          </div>

          {/* Email and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-8 text-yellow-400 border-0 rounded text-base placeholder:text-transparent focus:placeholder:text-gray-400"
                style={{ backgroundColor: "#132a13" }}
                placeholder="Email"
              />
              <Label 
                htmlFor="email" 
                className={`absolute left-8 transition-all duration-200 pointer-events-none ${
                  formData.email ? 'top-2 text-xs text-white' : 'top-8 text-white'
                }`}
              >
                Email
              </Label>
            </div>

            <div className="relative">
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-8 text-yellow-400 border-0 rounded text-base placeholder:text-transparent focus:placeholder:text-gray-400"
                style={{ backgroundColor: "#132a13" }}
                placeholder="Phone Number"
              />
              <Label 
                htmlFor="phone" 
                className={`absolute left-8 transition-all duration-200 pointer-events-none ${
                  formData.phone ? 'top-2 text-xs text-white' : 'top-8 text-white'
                }`}
              >
                Phone Number
              </Label>
            </div>
          </div>

          {/* Message Field */}
          <div className="relative">
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full p-8 text-yellow-400 border-0 rounded text-base min-h-[240px] placeholder:text-transparent focus:placeholder:text-gray-400 resize-none"
              style={{ backgroundColor: "#132a13" }}
              placeholder="Message"
            />
            <Label 
              htmlFor="message" 
              className={`absolute left-8 transition-all duration-200 pointer-events-none ${
                formData.message ? 'top-2 text-xs text-white' : 'top-8 text-white'
              }`}
            >
              Message
            </Label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded-full shadow-lg hover:shadow-md transition-all duration-300 hover:transform hover:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;