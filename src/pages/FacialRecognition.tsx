import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FacialRecognition = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
          <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
            Facial Recognition
          </h1>
          <button 
            onClick={() => navigate('/emoji-ai')}
            className="text-white hover:text-yellow-400 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-8 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-pink-400 mb-4" style={{fontFamily: 'Bungee Shade, cursive'}}>
                Detect and Recognize Facial Expressions! 😊
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Learn how AI recognizes different emotions and facial expressions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-pink-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">What is Facial Recognition?</h3>
                <p className="text-gray-700 mb-4">
                  Facial recognition AI can detect faces and identify emotions like happiness, sadness, anger, and surprise!
                </p>
                <div className="text-6xl text-center my-6">
                  😊 😢 😠 😲
                </div>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">How Does It Work?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">👁️</span>
                    <span>AI detects facial features like eyes and mouth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">🧠</span>
                    <span>It analyzes patterns in facial expressions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">✨</span>
                    <span>Then it identifies the emotion!</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button 
                onClick={() => navigate('/emoji-ai')}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-4 rounded-full text-lg"
              >
                Back to Emoji AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacialRecognition;
