import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmojiAI = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
          <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
            Emoji AI
          </h1>
          <button 
            onClick={() => navigate('/lesson-vault-04-06')}
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
                Welcome to Emoji AI!
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Learn how artificial intelligence understands and generates emojis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-pink-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">What is Emoji AI?</h3>
                <p className="text-gray-700 mb-4">
                  Emoji AI uses machine learning to understand emotions and contexts, helping computers communicate using emojis just like humans do!
                </p>
                <div className="text-6xl text-center my-6">
                  🤖 😊 🎨 💡
                </div>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">How Does It Work?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">📝</span>
                    <span>AI reads text and understands the emotion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">🧠</span>
                    <span>It learns patterns from millions of messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">✨</span>
                    <span>Then it suggests the perfect emoji!</span>
                  </li>
                </ul>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">Fun Activities</h3>
                <div className="space-y-4">
                  <button 
                    onClick={() => navigate('/facial-recognition')}
                    className="w-full p-4 bg-white rounded-lg hover:bg-[#bc6c25] hover:text-white transition-colors text-left"
                  >
                    <p className="font-semibold mb-2">😊 Facial Recognition</p>
                    <p className="text-sm text-gray-600 group-hover:text-white">Detect and recognize different facial expressions!</p>
                  </button>
                  <button 
                    onClick={() => navigate('/fruit-item-recognition')}
                    className="w-full p-4 bg-white rounded-lg hover:bg-[#bc6c25] hover:text-white transition-colors text-left"
                  >
                    <p className="font-semibold mb-2">🍎 Fruit Item Recognition</p>
                    <p className="text-sm text-gray-600 group-hover:text-white">Find the different fruit in each row!</p>
                  </button>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-semibold mb-2">🎯 Emoji Matching Game</p>
                    <p className="text-sm text-gray-600">Match emotions with the right emoji!</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-semibold mb-2">🎨 Create Emoji Stories</p>
                    <p className="text-sm text-gray-600">Tell stories using only emojis!</p>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">Why Learn This?</h3>
                <p className="text-gray-700 mb-4">
                  Understanding how AI works with emojis helps you learn about:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Pattern recognition</li>
                  <li>• Emotional intelligence</li>
                  <li>• Machine learning basics</li>
                  <li>• Digital communication</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button 
                onClick={() => navigate('/lesson-vault-04-06')}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-4 rounded-full text-lg"
              >
                Back to Lesson Vault
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmojiAI;
