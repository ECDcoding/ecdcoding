import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const FruitItemRecognition = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});

  const fruitRows = [
    {
      id: "row1",
      fruits: ["🍎", "🍎", "🍎", "🍎", "🍌", "🍎", "🍎", "🍎", "🍎", "🍎"],
      oddIndex: 4,
      oddFruit: "🍌",
      message: "Great! You found the banana among the apples!"
    },
    {
      id: "row2",
      fruits: ["🍊", "🍊", "🍊", "🍓", "🍊", "🍊", "🍊", "🍊", "🍊", "🍊"],
      oddIndex: 3,
      oddFruit: "🍓",
      message: "Awesome! You spotted the strawberry!"
    },
    {
      id: "row3",
      fruits: ["🍇", "🍇", "🍇", "🍇", "🍇", "🍉", "🍇", "🍇", "🍇", "🍇"],
      oddIndex: 5,
      oddFruit: "🍉",
      message: "Excellent! The watermelon was hiding among grapes!"
    },
    {
      id: "row4",
      fruits: ["🍋", "🍋", "🍋", "🍋", "🍋", "🍋", "🍒", "🍋", "🍋", "🍋"],
      oddIndex: 6,
      oddFruit: "🍒",
      message: "Perfect! You found the cherries!"
    },
    {
      id: "row5",
      fruits: ["🥝", "🥝", "🥝", "🍑", "🥝", "🥝", "🥝", "🥝", "🥝", "🥝"],
      oddIndex: 3,
      oddFruit: "🍑",
      message: "Amazing! You discovered the peach!"
    }
  ];

  const handleFruitClick = (rowId: string, index: number, correctIndex: number, message: string) => {
    if (selectedItems[rowId] !== undefined) {
      return; // Already selected
    }

    if (index === correctIndex) {
      setSelectedItems({ ...selectedItems, [rowId]: index });
      toast.success(message);
    } else {
      toast.error("Try again! Look for the different fruit.");
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
          <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
            Emoji AI
          </h1>
          <button 
            onClick={() => navigate('/emoji-ai')}
            className="text-white hover:text-yellow-400 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-8 max-w-6xl mx-auto w-full">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-pink-400 mb-4" style={{fontFamily: 'Bungee Shade, cursive'}}>
                Find the Different Fruit!
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Click on the fruit that's different from the others in each row
              </p>
            </div>

            {fruitRows.map((row, rowIndex) => (
              <div key={row.id} className="bg-pink-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">
                  Row {rowIndex + 1}
                </h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
                  {row.fruits.map((fruit, index) => (
                    <button
                      key={`${row.id}-${index}`}
                      onClick={() => handleFruitClick(row.id, index, row.oddIndex, row.message)}
                      className={`text-6xl p-4 rounded-lg transition-all transform hover:scale-110 ${
                        selectedItems[row.id] === index
                          ? "bg-green-200 ring-4 ring-green-500 scale-110"
                          : selectedItems[row.id] !== undefined
                          ? "opacity-50 cursor-not-allowed"
                          : "bg-white hover:bg-pink-100 cursor-pointer"
                      }`}
                      disabled={selectedItems[row.id] !== undefined}
                    >
                      {fruit}
                    </button>
                  ))}
                </div>
                {selectedItems[row.id] !== undefined && (
                  <p className="mt-4 text-green-600 font-semibold text-center">
                    ✓ Completed!
                  </p>
                )}
              </div>
            ))}

            {Object.keys(selectedItems).length === fruitRows.length && (
              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-green-600 mb-4">
                  🎉 Congratulations! 🎉
                </h3>
                <p className="text-xl text-gray-700">
                  You found all the different fruits! You're amazing at pattern recognition!
                </p>
              </div>
            )}

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

export default FruitItemRecognition;
