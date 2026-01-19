import { useEffect, useRef, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Play, Code, Gamepad2, RotateCcw, Volume2, BookOpen, GraduationCap } from "lucide-react";
import BlocklyTutorial from "./BlocklyTutorial";

interface BlocklyEditorProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

// Declare global Blockly type
declare global {
  interface Window {
    Blockly: any;
    javascript: any;
  }
}

const BlocklyEditor = ({ isOpen, onClose, title, description }: BlocklyEditorProps) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<any>(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Tutorial state
  const [showTutorial, setShowTutorial] = useState(true);
  const [activeTutorial, setActiveTutorial] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Custom game-oriented toolbox
  const toolbox = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "🎮 Game Actions",
        colour: "#5C81A6",
        contents: [
          { kind: "block", type: "controls_repeat_ext" },
          { kind: "block", type: "controls_whileUntil" },
          { kind: "block", type: "controls_for" },
          { kind: "block", type: "controls_if" },
        ],
      },
      {
        kind: "category",
        name: "🔢 Numbers",
        colour: "#5CA65C",
        contents: [
          { kind: "block", type: "math_number" },
          { kind: "block", type: "math_arithmetic" },
          { kind: "block", type: "math_random_int" },
          { kind: "block", type: "math_modulo" },
        ],
      },
      {
        kind: "category",
        name: "📝 Text",
        colour: "#A6745C",
        contents: [
          { kind: "block", type: "text" },
          { kind: "block", type: "text_print" },
          { kind: "block", type: "text_join" },
          { kind: "block", type: "text_length" },
        ],
      },
      {
        kind: "category",
        name: "🎨 Logic",
        colour: "#745CA6",
        contents: [
          { kind: "block", type: "logic_compare" },
          { kind: "block", type: "logic_operation" },
          { kind: "block", type: "logic_boolean" },
          { kind: "block", type: "logic_negate" },
        ],
      },
      {
        kind: "category",
        name: "📦 Variables",
        colour: "#A65C81",
        custom: "VARIABLE",
      },
      {
        kind: "category",
        name: "🔧 Functions",
        colour: "#9A5CA6",
        custom: "PROCEDURE",
      },
    ],
  };

  // Load Blockly from CDN
  const loadBlocklyFromCDN = useCallback(() => {
    if (window.Blockly) {
      setIsLoaded(true);
      return;
    }

    // Load Blockly core
    const script1 = document.createElement("script");
    script1.src = "https://unpkg.com/blockly/blockly_compressed.js";
    script1.async = true;
    
    script1.onload = () => {
      // Load blocks
      const script2 = document.createElement("script");
      script2.src = "https://unpkg.com/blockly/blocks_compressed.js";
      script2.async = true;
      
      script2.onload = () => {
        // Load JavaScript generator
        const script3 = document.createElement("script");
        script3.src = "https://unpkg.com/blockly/javascript_compressed.js";
        script3.async = true;
        
        script3.onload = () => {
          // Load English messages
          const script4 = document.createElement("script");
          script4.src = "https://unpkg.com/blockly/msg/en.js";
          script4.async = true;
          
          script4.onload = () => {
            setIsLoaded(true);
          };
          
          document.body.appendChild(script4);
        };
        
        document.body.appendChild(script3);
      };
      
      document.body.appendChild(script2);
    };
    
    document.body.appendChild(script1);
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadBlocklyFromCDN();
      // Reset tutorial state when opening
      setShowTutorial(true);
      setActiveTutorial(null);
      setCurrentStep(0);
      setCompletedSteps([]);
    }
  }, [isOpen, loadBlocklyFromCDN]);

  useEffect(() => {
    // Initialize workspace when dialog is open and Blockly is loaded
    if (isOpen && isLoaded && blocklyDiv.current && window.Blockly) {
      // Clear any existing workspace in the div first
      if (blocklyDiv.current.firstChild) {
        blocklyDiv.current.innerHTML = '';
      }
      
      // Dispose any existing workspace reference
      if (workspaceRef.current) {
        try {
          workspaceRef.current.dispose();
        } catch (e) {
          // Ignore disposal errors
        }
        workspaceRef.current = null;
      }

      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        if (!blocklyDiv.current || !window.Blockly) return;
        
        // Initialize Blockly workspace
        workspaceRef.current = window.Blockly.inject(blocklyDiv.current, {
          toolbox: toolbox,
          grid: {
            spacing: 20,
            length: 3,
            colour: "#ccc",
            snap: true,
          },
          zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2,
          },
          trashcan: true,
          move: {
            scrollbars: true,
            drag: true,
            wheel: true,
          },
        });

        // Add change listener to generate code
        workspaceRef.current.addChangeListener(() => {
          if (workspaceRef.current && window.Blockly?.JavaScript) {
            try {
              const code = window.Blockly.JavaScript.workspaceToCode(workspaceRef.current);
              setGeneratedCode(code);
            } catch (e) {
              console.error("Code generation error:", e);
            }
          }
        });

        // Force resize to ensure toolbox renders correctly
        window.Blockly.svgResize(workspaceRef.current);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen, isLoaded]);

  // Cleanup on unmount or close
  useEffect(() => {
    return () => {
      if (workspaceRef.current) {
        try {
          workspaceRef.current.dispose();
        } catch (e) {
          // Ignore disposal errors
        }
        workspaceRef.current = null;
      }
    };
  }, []);

  const handleRun = () => {
    setOutput([]);
    const newOutput: string[] = [];
    
    // Create a safe console.log replacement
    const mockConsole = {
      log: (...args: unknown[]) => {
        newOutput.push(args.map(a => String(a)).join(" "));
      }
    };

    // Replace print function calls with our mock
    const modifiedCode = generatedCode.replace(
      /window\.alert/g, 
      "mockConsole.log"
    ).replace(
      /console\.log/g,
      "mockConsole.log"
    );

    try {
      // Create a function with mockConsole in scope
      const runCode = new Function("mockConsole", `
        function print(text) { mockConsole.log(text); }
        ${modifiedCode}
      `);
      runCode(mockConsole);
      setOutput(newOutput.length > 0 ? newOutput : ["✅ Code ran successfully!"]);
      
      // Speak the output
      if (newOutput.length > 0 && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(newOutput.join(". "));
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      setOutput([`❌ Error: ${(error as Error).message}`]);
    }
  };

  const handleClear = () => {
    if (workspaceRef.current) {
      workspaceRef.current.clear();
      setGeneratedCode("");
      setOutput([]);
    }
  };

  const handleClose = () => {
    if (workspaceRef.current) {
      workspaceRef.current.dispose();
      workspaceRef.current = null;
    }
    setGeneratedCode("");
    setOutput([]);
    setShowCode(false);
    setShowTutorial(true);
    setActiveTutorial(null);
    onClose();
  };

  // Tutorial handlers
  const handleStartTutorial = (tutorialId: string) => {
    setActiveTutorial(tutorialId);
    setCurrentStep(0);
    setCompletedSteps([]);
    // Clear workspace for fresh start
    if (workspaceRef.current) {
      workspaceRef.current.clear();
    }
  };

  const handleNextStep = () => {
    setCompletedSteps(prev => [...prev, currentStep]);
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    setActiveTutorial(null);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-[95vw] h-[95vh] p-0 bg-gradient-to-br from-[#1e1e3f] via-[#252045] to-[#1a1a2e] border border-cyan-400/30 overflow-hidden">
        <DialogHeader className="px-4 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <DialogTitle className="text-white font-bold text-lg flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 animate-pulse" />
                {title}
              </DialogTitle>
              <DialogDescription className="text-white/80 text-sm">
                {description || "Drag and drop blocks to create your code!"}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              {!showTutorial && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => {
                    setShowTutorial(true);
                    setActiveTutorial(null);
                  }}
                >
                  <GraduationCap className="h-4 w-4 mr-1" />
                  Tutorials
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={handleClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-[calc(95vh-80px)] relative">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] border-b border-cyan-400/20">
            <Button
              size="sm"
              onClick={handleRun}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={!isLoaded}
            >
              <Play className="h-4 w-4 mr-1" />
              Run
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowCode(!showCode)}
              className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10"
            >
              <Code className="h-4 w-4 mr-1" />
              {showCode ? "Hide Code" : "Show Code"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClear}
              className="border-orange-400/30 text-orange-300 hover:bg-orange-400/10"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <div className="ml-auto text-cyan-300 text-xs flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              🎯 Drag blocks from the left menu to start coding!
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 overflow-hidden relative">
            {/* Blockly Workspace */}
            {!isLoaded ? (
              <div className="flex-1 flex items-center justify-center bg-[#f8f8f8]">
                <div className="text-center">
                  <Gamepad2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading Block Editor...</p>
                </div>
              </div>
            ) : (
              <div 
                ref={blocklyDiv} 
                className="flex-1 bg-[#f8f8f8]"
                style={{ minHeight: "400px" }}
              />
            )}

            {/* Side Panel - Code & Output */}
            {showCode && (
              <div className="w-80 bg-[#1e1e3f] border-l border-cyan-400/20 flex flex-col">
                <div className="p-2 bg-[#252045] text-cyan-300 text-xs font-bold border-b border-cyan-400/20">
                  📝 Generated JavaScript
                </div>
                <pre className="flex-1 p-3 text-xs text-green-400 overflow-auto font-mono">
                  {generatedCode || "// Your code will appear here..."}
                </pre>
              </div>
            )}

            {/* Tutorial Overlay */}
            {isLoaded && (
              <BlocklyTutorial
                isOpen={showTutorial}
                onClose={handleCloseTutorial}
                onStartTutorial={handleStartTutorial}
                activeTutorial={activeTutorial}
                currentStep={currentStep}
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
                completedSteps={completedSteps}
              />
            )}
          </div>

          {/* Output Console */}
          {output.length > 0 && (
            <div className="bg-[#0d0d1a] border-t border-cyan-400/20 p-3 max-h-32 overflow-auto">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold mb-2">
                <Volume2 className="h-4 w-4" />
                Output:
              </div>
              {output.map((line, i) => (
                <div key={i} className="text-white text-sm font-mono">
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlocklyEditor;
