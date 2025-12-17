import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FacialRecognition = () => {
  const navigate = useNavigate();
  
  // Initial grid state - odd faces swapped between row 1 and row 4
  const [grid, setGrid] = useState([
    ["👦", "👦", "👦", "👦", "😄", "👦", "👦"], // Row 1: odd face from row 4 (😄)
    ["👧", "👧", "👧🏻", "👧", "👧", "👧", "👧"], // Row 2: odd face is 👧🏻
    ["👶", "👶", "👶", "👶", "👶", "👶🏻", "👶"], // Row 3: odd face is 👶🏻
    ["😊", "😊", "😊", "😊", "👦🏻", "😊", "😊"], // Row 4: odd face from row 1 (👦🏻)
  ]);

  const [draggedItem, setDraggedItem] = useState<{row: number, col: number} | null>(null);
  const [solvedRows, setSolvedRows] = useState<Set<number>>(new Set());

  // Define what each row should look like when solved
  const targetRows = [
    { mainFace: "👦", oddFace: "👦🏻", oddIndex: 4 },
    { mainFace: "👧", oddFace: "👧🏻", oddIndex: 2 },
    { mainFace: "👶", oddFace: "👶🏻", oddIndex: 5 },
    { mainFace: "😊", oddFace: "😄", oddIndex: 4 },
  ];

  const checkRowSolved = (rowIndex: number, newGrid: string[][]) => {
    const row = newGrid[rowIndex];
    const target = targetRows[rowIndex];
    
    // Check if the odd face is in the correct position
    for (let i = 0; i < row.length; i++) {
      if (i === target.oddIndex) {
        if (row[i] !== target.oddFace) return false;
      } else {
        if (row[i] !== target.mainFace) return false;
      }
    }
    return true;
  };

  const handleDragStart = (row: number, col: number) => {
    setDraggedItem({ row, col });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetRow: number, targetCol: number) => {
    if (!draggedItem) return;
    
    const { row: sourceRow, col: sourceCol } = draggedItem;
    
    // Don't do anything if dropping on same position
    if (sourceRow === targetRow && sourceCol === targetCol) {
      setDraggedItem(null);
      return;
    }

    // Swap the emojis
    const newGrid = grid.map(row => [...row]);
    const temp = newGrid[targetRow][targetCol];
    newGrid[targetRow][targetCol] = newGrid[sourceRow][sourceCol];
    newGrid[sourceRow][sourceCol] = temp;
    
    setGrid(newGrid);
    setDraggedItem(null);

    // Check if any rows are now solved
    const newSolvedRows = new Set(solvedRows);
    let newlySolved = false;

    for (let i = 0; i < 4; i++) {
      if (checkRowSolved(i, newGrid)) {
        if (!solvedRows.has(i)) {
          newSolvedRows.add(i);
          newlySolved = true;
        }
      } else {
        newSolvedRows.delete(i);
      }
    }

    setSolvedRows(newSolvedRows);

    if (newlySolved) {
      toast.success("🎉 Great job! You fixed a row!");
    }

    if (newSolvedRows.size === 4) {
      toast.success("🏆 Amazing! You solved all the puzzles!", {
        duration: 5000,
      });
    }
  };

  const handleTouchStart = (row: number, col: number) => {
    setDraggedItem({ row, col });
  };

  const handleTouchEnd = (e: React.TouchEvent, targetRow: number, targetCol: number) => {
    if (!draggedItem) return;
    
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element) {
      const dropTarget = element.closest('[data-row][data-col]');
      if (dropTarget) {
        const row = parseInt(dropTarget.getAttribute('data-row') || '0');
        const col = parseInt(dropTarget.getAttribute('data-col') || '0');
        handleDrop(row, col);
        return;
      }
    }
    
    setDraggedItem(null);
  };

  const playInstructions = () => {
    const utterance = new SpeechSynthesisUtterance(
      "Drag and drop to swap the faces! Find the odd faces and put them where they belong in each row."
    );
    speechSynthesis.speak(utterance);
  };

  const resetGame = () => {
    setGrid([
      ["👦", "👦", "👦", "👦", "😄", "👦", "👦"],
      ["👧", "👧", "👧🏻", "👧", "👧", "👧", "👧"],
      ["👶", "👶", "👶", "👶", "👶", "👶🏻", "👶"],
      ["😊", "😊", "😊", "😊", "👦🏻", "😊", "😊"],
    ]);
    setSolvedRows(new Set());
    toast.info("Game reset! Try again!");
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
          
          <div className="flex gap-2">
            <Button 
              onClick={resetGame}
              variant="outline"
              className="bg-orange-600 hover:bg-orange-700 text-white border-none"
            >
              Reset
            </Button>
            <Button 
              onClick={playInstructions}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Volume2 className="h-5 w-5 mr-2" />
              Play Instructions
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <div className="text-center mb-8">
            <p className="text-2xl text-white font-semibold">
              🎮 Drag and drop to swap faces! Find where each odd face belongs!
            </p>
            <p className="text-lg text-white/70 mt-2">
              Rows solved: {solvedRows.size} / 4
            </p>
          </div>

          <div className="space-y-6">
            {grid.map((row, rowIndex) => (
              <div 
                key={rowIndex} 
                className={`flex gap-4 justify-center flex-wrap p-4 rounded-xl transition-all duration-300 ${
                  solvedRows.has(rowIndex) 
                    ? 'bg-green-500/30 ring-4 ring-green-400' 
                    : 'bg-slate-600/30'
                }`}
              >
                <span className="text-white font-bold self-center w-8">
                  {rowIndex + 1}.
                </span>
                {row.map((face, faceIndex) => (
                  <div
                    key={faceIndex}
                    data-row={rowIndex}
                    data-col={faceIndex}
                    draggable
                    onDragStart={() => handleDragStart(rowIndex, faceIndex)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(rowIndex, faceIndex)}
                    onTouchStart={() => handleTouchStart(rowIndex, faceIndex)}
                    onTouchEnd={(e) => handleTouchEnd(e, rowIndex, faceIndex)}
                    className={`
                      w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-5xl md:text-6xl
                      transition-all duration-200 cursor-grab active:cursor-grabbing
                      ${draggedItem?.row === rowIndex && draggedItem?.col === faceIndex
                        ? 'opacity-50 scale-95 ring-4 ring-yellow-400'
                        : 'hover:scale-110 hover:ring-2 hover:ring-white/50'
                      }
                      ${solvedRows.has(rowIndex)
                        ? 'bg-green-500/40'
                        : 'bg-slate-600/60 hover:bg-slate-500/60'
                      }
                    `}
                  >
                    {face}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              💡 Tip: Look for faces that don't match the others in each row, then drag them to where they belong!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacialRecognition;
