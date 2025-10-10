import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FacialRecognition = () => {
  const navigate = useNavigate();
  const [selectedFaces, setSelectedFaces] = useState<Record<number, number>>({});

  // Define rows with emojis and the index of the odd one
  const faceRows = [
    { faces: ["👦", "👦", "👦", "👦", "👦🏻", "👦", "👦"], oddIndex: 4 },
    { faces: ["👧", "👧", "👧🏻", "👧", "👧", "👧", "👧"], oddIndex: 2 },
    { faces: ["👶", "👶", "👶", "👶", "👶", "👶🏻", "👶"], oddIndex: 5 },
    { faces: ["😊", "😊", "😊", "😊", "😊", "😊", "😄"], oddIndex: 6 },
  ];

  const handleFaceClick = (rowIndex: number, faceIndex: number) => {
    const row = faceRows[rowIndex];
    
    if (faceIndex === row.oddIndex) {
      toast.success("🎉 Correct! You found the odd face!");
      setSelectedFaces(prev => ({ ...prev, [rowIndex]: faceIndex }));
    } else {
      toast.error("Try again! Look more carefully.");
    }
  };

  const playInstructions = () => {
    const utterance = new SpeechSynthesisUtterance(
      "Find the odd faces! Look for faces that are different from the others in each row."
    );
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-indigo-700 z-[100] overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <button 
            onClick={() => navigate('/emoji-ai')}
            className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="text-lg font-semibold">Back</span>
          </button>
          
          <h1 className="text-4xl font-bold text-white">
            Facial Recognition
          </h1>
          
          <Button 
            onClick={playInstructions}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Volume2 className="h-5 w-5 mr-2" />
            Play Instructions
          </Button>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <div className="text-center mb-8">
            <p className="text-2xl text-white font-semibold">
              Find the odd faces! Look for faces that are different from the others in each row.
            </p>
          </div>

          <div className="space-y-6">
            {faceRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-4 justify-center flex-wrap">
                {row.faces.map((face, faceIndex) => (
                  <button
                    key={faceIndex}
                    onClick={() => handleFaceClick(rowIndex, faceIndex)}
                    className={`
                      w-32 h-32 rounded-xl flex items-center justify-center text-6xl
                      transition-all duration-200 hover:scale-105
                      ${selectedFaces[rowIndex] === faceIndex
                        ? 'bg-green-500 ring-4 ring-green-300'
                        : 'bg-slate-600/60 hover:bg-slate-500/60'
                      }
                    `}
                  >
                    {face}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacialRecognition;
