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
                Welcome to Facial Recognition!
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Discover how AI can detect and recognize different facial expressions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-pink-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">What is Facial Recognition?</h3>
                <p className="text-gray-700 mb-4">
                  Facial recognition is a technology that uses artificial intelligence to identify and analyze human faces. It can detect emotions, expressions, and even identify specific people!
                </p>
                <div className="text-6xl text-center my-6">
                  😊 😢 😮 😡
                </div>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">How Does It Work?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">📸</span>
                    <span>Camera captures your face</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">🔍</span>
                    <span>AI finds key facial features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">🧠</span>
                    <span>Brain-like networks analyze the expression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">✨</span>
                    <span>It recognizes the emotion or identity!</span>
                  </li>
                </ul>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">Fun Activities</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg hover:bg-[#bc6c25] hover:text-white transition-colors">
                    <p className="font-semibold mb-2">🔎 Find the Odd Face</p>
                    <p className="text-sm">Look for faces that are different from others in each row!</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg hover:bg-[#bc6c25] hover:text-white transition-colors">
                    <p className="font-semibold mb-2">😄 Expression Matching</p>
                    <p className="text-sm">Match facial expressions with their emotions!</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-semibold mb-2">🎭 Emotion Detective</p>
                    <p className="text-sm text-gray-600">Identify emotions from different faces!</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-semibold mb-2">👥 Face Memory Game</p>
                    <p className="text-sm text-gray-600">Remember and match different faces!</p>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">Why Learn This?</h3>
                <p className="text-gray-700 mb-4">
                  Understanding facial recognition helps you learn about:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• How computers "see" and understand faces</li>
                  <li>• Emotion recognition and empathy</li>
                  <li>• Artificial intelligence and machine learning</li>
                  <li>• Privacy and technology ethics</li>
                  <li>• Real-world AI applications</li>
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
