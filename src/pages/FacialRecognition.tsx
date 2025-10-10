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
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-pink-400 mb-4" style={{fontFamily: 'Bungee Shade, cursive'}}>
              Find the odd faces!
            </h2>
            <p className="text-xl text-gray-700">
              Look for faces that are different from the others in each row
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacialRecognition;
