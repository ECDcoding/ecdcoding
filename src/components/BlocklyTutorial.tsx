import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Sparkles, 
  Trophy, 
  Rocket,
  CheckCircle2,
  Circle,
  Play,
  BookOpen,
  Lightbulb,
  PartyPopper
} from "lucide-react";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: "beginner" | "easy" | "medium";
  steps: TutorialStep[];
}

interface TutorialStep {
  title: string;
  instruction: string;
  hint: string;
  blockCategory?: string;
  blockType?: string;
  expectedAction: string;
  celebration: string;
}

const tutorials: Tutorial[] = [
  {
    id: "hello-world",
    title: "Say Hello! 👋",
    description: "Learn to make your computer talk!",
    icon: <Sparkles className="h-6 w-6 text-yellow-400" />,
    difficulty: "beginner",
    steps: [
      {
        title: "Welcome, Young Coder! 🌟",
        instruction: "You're about to create your very first program! We'll make the computer say 'Hello World!' - the first thing every coder learns!",
        hint: "Click 'Next' to begin your coding adventure!",
        expectedAction: "ready",
        celebration: "🎉 Let's go!"
      },
      {
        title: "Step 1: Find the Text Category 📝",
        instruction: "Look at the menu on the LEFT side. Find the category that says '📝 Text' and click on it!",
        hint: "It's the brown/orange colored category with a pencil emoji!",
        blockCategory: "Text",
        expectedAction: "open_category",
        celebration: "🌟 You found it! Great job!"
      },
      {
        title: "Step 2: Drag the Print Block",
        instruction: "Now drag the block that says 'print' and drop it into the workspace (the gray area in the middle)!",
        hint: "Click and hold on the 'print' block, then move your mouse to the gray area and let go!",
        blockType: "text_print",
        expectedAction: "drag_block",
        celebration: "⭐ Amazing! You placed your first block!"
      },
      {
        title: "Step 3: Add Your Message 💬",
        instruction: "Find the '📝 Text' category again and drag a 'text' block (it looks like two quotes). Connect it to the 'print' block!",
        hint: "The text block should snap into the hole on the print block!",
        blockType: "text",
        expectedAction: "connect_block",
        celebration: "🎯 Perfect connection!"
      },
      {
        title: "Step 4: Type Your Message ⌨️",
        instruction: "Click on the empty text block and type: Hello World!",
        hint: "Click inside the quotes and start typing!",
        expectedAction: "type_text",
        celebration: "✨ You wrote your first message!"
      },
      {
        title: "Step 5: Run Your Code! 🚀",
        instruction: "Now click the green 'Run' button at the top to see your program work!",
        hint: "The Run button has a play triangle on it!",
        expectedAction: "run_code",
        celebration: "🎊 CONGRATULATIONS! You just wrote your first program!"
      }
    ]
  },
  {
    id: "counting-fun",
    title: "Counting Fun! 🔢",
    description: "Make the computer count for you!",
    icon: <Star className="h-6 w-6 text-purple-400" />,
    difficulty: "easy",
    steps: [
      {
        title: "Let's Count Together! 🔢",
        instruction: "In this tutorial, you'll create a program that counts from 1 to 5. Computers are great at counting!",
        hint: "Click 'Next' when you're ready!",
        expectedAction: "ready",
        celebration: "🚀 Here we go!"
      },
      {
        title: "Step 1: Open Game Actions 🎮",
        instruction: "Click on the '🎮 Game Actions' category in the menu. This is where we find loops!",
        hint: "A loop lets us repeat something many times without copying it!",
        blockCategory: "Game Actions",
        expectedAction: "open_category",
        celebration: "🎯 You found the loops!"
      },
      {
        title: "Step 2: Drag the Count Loop",
        instruction: "Drag the 'count with' block into the workspace. This block will count numbers for us!",
        hint: "It says 'count with i from 1 to 10' - we'll change the numbers!",
        blockType: "controls_for",
        expectedAction: "drag_block",
        celebration: "⭐ Great choice!"
      },
      {
        title: "Step 3: Set Count to 5",
        instruction: "Change the number 10 to 5, so it counts from 1 to 5!",
        hint: "Click on the number 10 and change it to 5!",
        expectedAction: "modify_block",
        celebration: "🌟 Perfect! Now it counts 1, 2, 3, 4, 5!"
      },
      {
        title: "Step 4: Add Print Inside",
        instruction: "Go to '📝 Text', drag a 'print' block and put it INSIDE the loop (between the top and bottom of the count block)!",
        hint: "The print block should snap inside the count block!",
        blockType: "text_print",
        expectedAction: "connect_block",
        celebration: "✨ Blocks working together!"
      },
      {
        title: "Step 5: Print the Number",
        instruction: "Go to '📦 Variables' and drag the 'i' variable block into the print block!",
        hint: "The 'i' holds the current count number!",
        blockCategory: "Variables",
        expectedAction: "use_variable",
        celebration: "🎉 Now it will print each number!"
      },
      {
        title: "Step 6: Run and Watch! 🎬",
        instruction: "Click the green 'Run' button to see your counting program!",
        hint: "Watch the output - it will show 1, 2, 3, 4, 5!",
        expectedAction: "run_code",
        celebration: "🏆 WOW! You made a counting program!"
      }
    ]
  },
  {
    id: "magic-math",
    title: "Magic Math! ✨",
    description: "Do math like a wizard!",
    icon: <Rocket className="h-6 w-6 text-cyan-400" />,
    difficulty: "easy",
    steps: [
      {
        title: "Math Magic Time! 🧙‍♂️",
        instruction: "Did you know computers can do math super fast? Let's add two numbers together!",
        hint: "Get ready to become a math wizard!",
        expectedAction: "ready",
        celebration: "🔮 Magic awaits!"
      },
      {
        title: "Step 1: Start with Print 📝",
        instruction: "Go to '📝 Text' and drag a 'print' block to the workspace first!",
        hint: "We need print to show our answer!",
        blockType: "text_print",
        expectedAction: "drag_block",
        celebration: "⭐ Good start!"
      },
      {
        title: "Step 2: Find the Numbers 🔢",
        instruction: "Click on the '🔢 Numbers' category!",
        hint: "It's the green category with math blocks!",
        blockCategory: "Numbers",
        expectedAction: "open_category",
        celebration: "🌟 You found the math!"
      },
      {
        title: "Step 3: Drag the + Block",
        instruction: "Drag the block that shows 'number + number' into the print block!",
        hint: "This block can add, subtract, multiply, or divide!",
        blockType: "math_arithmetic",
        expectedAction: "connect_block",
        celebration: "✨ Now we can do math!"
      },
      {
        title: "Step 4: Pick Your Numbers",
        instruction: "Change the numbers! Try making it show 5 + 3!",
        hint: "Click on each number and type a new one!",
        expectedAction: "modify_block",
        celebration: "🎯 5 + 3 = something magical!"
      },
      {
        title: "Step 5: Run the Magic! ✨",
        instruction: "Click 'Run' to see the computer calculate 5 + 3!",
        hint: "What do you think the answer will be?",
        expectedAction: "run_code",
        celebration: "🎊 8! The computer did the math instantly!"
      }
    ]
  },
  {
    id: "decision-maker",
    title: "Smart Decisions! 🤔",
    description: "Teach your computer to think!",
    icon: <Lightbulb className="h-6 w-6 text-orange-400" />,
    difficulty: "medium",
    steps: [
      {
        title: "Teaching Computers to Think! 🧠",
        instruction: "Computers can make decisions just like you! IF something is true, THEN do something. Let's try it!",
        hint: "This is called 'conditional logic' - fancy words for making choices!",
        expectedAction: "ready",
        celebration: "🤖 Let's make smart code!"
      },
      {
        title: "Step 1: Find the IF Block 🎮",
        instruction: "Go to '🎮 Game Actions' and find the 'if' block. Drag it to the workspace!",
        hint: "The if block lets your program make decisions!",
        blockType: "controls_if",
        expectedAction: "drag_block",
        celebration: "⭐ You found the thinking block!"
      },
      {
        title: "Step 2: Add a Comparison 🎨",
        instruction: "Go to '🎨 Logic' and drag the comparison block (it shows = sign) into the IF block's diamond shape!",
        hint: "This checks if something is equal to something else!",
        blockCategory: "Logic",
        blockType: "logic_compare",
        expectedAction: "connect_block",
        celebration: "🧩 Logic connected!"
      },
      {
        title: "Step 3: Add Numbers to Compare",
        instruction: "Go to '🔢 Numbers' and drag number blocks into both sides of the comparison!",
        hint: "Put the same number on both sides to see what happens!",
        expectedAction: "modify_block",
        celebration: "✨ Now it can compare!"
      },
      {
        title: "Step 4: Add the Action",
        instruction: "Go to '📝 Text' and add a 'print' block INSIDE the if block. Make it say 'Yes, they match!'",
        hint: "This will only run if the comparison is true!",
        blockType: "text_print",
        expectedAction: "add_action",
        celebration: "🎯 Action added!"
      },
      {
        title: "Step 5: Test Your Logic! 🧪",
        instruction: "Click 'Run'! If your numbers match, you'll see the message. Try changing one number and run again!",
        hint: "Experiment with different numbers!",
        expectedAction: "run_code",
        celebration: "🎊 You taught the computer to think!"
      }
    ]
  }
];

interface BlocklyTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTutorial: (tutorialId: string) => void;
  activeTutorial: string | null;
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  completedSteps: number[];
}

const BlocklyTutorial = ({
  isOpen,
  onClose,
  onStartTutorial,
  activeTutorial,
  currentStep,
  onNextStep,
  onPrevStep,
  completedSteps
}: BlocklyTutorialProps) => {
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentTutorialData = tutorials.find(t => t.id === activeTutorial);
  const currentStepData = currentTutorialData?.steps[currentStep];
  const isLastStep = currentTutorialData && currentStep === currentTutorialData.steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Tutorial Selection View
  if (!activeTutorial) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-blue-900/95 z-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <BookOpen className="h-10 w-10 text-yellow-400 animate-bounce" />
              Coding Tutorials
              <Sparkles className="h-10 w-10 text-yellow-400 animate-pulse" />
            </h2>
            <p className="text-xl text-cyan-200">Choose a tutorial to start your coding adventure!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tutorials.map((tutorial) => (
              <Card
                key={tutorial.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  selectedTutorial === tutorial.id 
                    ? "border-yellow-400 bg-gradient-to-br from-yellow-400/20 to-orange-500/20" 
                    : "border-cyan-400/30 bg-gradient-to-br from-[#1e1e3f]/80 to-[#252045]/80 hover:border-cyan-400/60"
                }`}
                onClick={() => setSelectedTutorial(tutorial.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-xl">
                    {tutorial.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{tutorial.title}</h3>
                    <p className="text-cyan-200 text-sm mb-3">{tutorial.description}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tutorial.difficulty === "beginner" 
                          ? "bg-green-500/30 text-green-300"
                          : tutorial.difficulty === "easy"
                          ? "bg-blue-500/30 text-blue-300"
                          : "bg-orange-500/30 text-orange-300"
                      }`}>
                        {tutorial.difficulty === "beginner" ? "🌱 Beginner" : 
                         tutorial.difficulty === "easy" ? "⭐ Easy" : "🚀 Medium"}
                      </span>
                      <span className="text-xs text-gray-400">{tutorial.steps.length} steps</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-500 text-gray-300 hover:bg-gray-500/20"
            >
              Skip Tutorial
            </Button>
            <Button
              onClick={() => selectedTutorial && onStartTutorial(selectedTutorial)}
              disabled={!selectedTutorial}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Tutorial!
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Active Tutorial Step View
  return (
    <div className="absolute bottom-4 left-4 right-4 z-50 pointer-events-none">
      <Card className="bg-gradient-to-r from-[#1e1e3f]/95 to-[#252045]/95 border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/20 pointer-events-auto max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="px-4 pt-3">
          <div className="flex items-center gap-2 mb-2">
            {currentTutorialData?.steps.map((_, index) => (
              <div key={index} className="flex items-center">
                {completedSteps.includes(index) ? (
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                ) : index === currentStep ? (
                  <div className="h-4 w-4 rounded-full bg-yellow-400 animate-pulse" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-500" />
                )}
                {index < (currentTutorialData?.steps.length || 0) - 1 && (
                  <div className={`w-6 h-0.5 mx-1 ${
                    completedSteps.includes(index) ? "bg-green-400" : "bg-gray-600"
                  }`} />
                )}
              </div>
            ))}
            <span className="ml-auto text-xs text-cyan-300">
              Step {currentStep + 1} of {currentTutorialData?.steps.length}
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            {isLastStep && <PartyPopper className="h-5 w-5 text-yellow-400 animate-bounce" />}
            {currentStepData?.title}
          </h3>
          <p className="text-cyan-100 mb-3">{currentStepData?.instruction}</p>
          
          {/* Hint Box */}
          <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-200 text-sm">{currentStepData?.hint}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevStep}
              disabled={isFirstStep}
              className="border-gray-500 text-gray-300 hover:bg-gray-500/20"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200"
              >
                Exit Tutorial
              </Button>
              <Button
                onClick={isLastStep ? onClose : onNextStep}
                size="sm"
                className={isLastStep 
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600" 
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                }
              >
                {isLastStep ? (
                  <>
                    <Trophy className="h-4 w-4 mr-1" />
                    Complete!
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlocklyTutorial;
export { tutorials };
export type { Tutorial, TutorialStep };
