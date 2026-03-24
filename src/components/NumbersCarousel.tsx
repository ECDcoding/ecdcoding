import { useState } from "react";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import numbers1to10 from "@/assets/numbers-1-to-10.jpg";
import numbers11to20 from "@/assets/numbers-11-to-20.jpg";
import numbers21to30 from "@/assets/numbers-21-to-30.jpg";
import numbers31to40 from "@/assets/numbers-31-to-40.jpg";

const pages = [
  { range: "1 – 10", image: numbers1to10, start: 1, end: 10, bg: "bg-blue-50", accent: "text-blue-600" },
  { range: "11 – 20", image: numbers11to20, start: 11, end: 20, bg: "bg-green-50", accent: "text-green-600" },
  { range: "21 – 30", image: numbers21to30, start: 21, end: 30, bg: "bg-yellow-50", accent: "text-yellow-600" },
  { range: "31 – 40", image: numbers31to40, start: 31, end: 40, bg: "bg-pink-50", accent: "text-pink-600" },
];

const numberWords = [
  "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
  "eighteen", "nineteen", "twenty", "twenty-one", "twenty-two", "twenty-three",
  "twenty-four", "twenty-five", "twenty-six", "twenty-seven", "twenty-eight",
  "twenty-nine", "thirty", "thirty-one", "thirty-two", "thirty-three", "thirty-four",
  "thirty-five", "thirty-six", "thirty-seven", "thirty-eight", "thirty-nine", "forty",
];

const NumbersCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const goNext = () => setCurrentPage((p) => Math.min(p + 1, pages.length - 1));
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 0));

  const speakNumber = (num: number) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(numberWords[num]);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const page = pages[currentPage];

  return (
    <div className="mt-12 p-6 rounded-2xl" style={{ backgroundColor: "#395B50" }}>
      <h2
        className="text-3xl font-bold text-lime-400 text-center mb-6"
        style={{ fontFamily: '"Bungee Shade", cursive' }}
      >
        🔢 Numbers Carousel
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Navigation */}
        <Button
          variant="outline"
          size="icon"
          onClick={goPrev}
          disabled={currentPage === 0}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full h-10 w-10 shadow-lg"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={goNext}
          disabled={currentPage === pages.length - 1}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full h-10 w-10 shadow-lg"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Card */}
        <div className={`${page.bg} rounded-xl p-6 shadow-lg transition-all duration-300`}>
          <h3 className={`text-2xl font-bold ${page.accent} text-center mb-4`}>
            Numbers {page.range}
          </h3>

          <img
            src={page.image}
            alt={`Numbers ${page.range}`}
            className="w-full max-h-[400px] object-contain rounded-lg mb-6"
            loading="lazy"
            width={1024}
            height={768}
          />

          {/* Interactive number buttons */}
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: page.end - page.start + 1 }, (_, i) => {
              const num = page.start + i;
              return (
                <button
                  key={num}
                  onClick={() => speakNumber(num)}
                  className="flex items-center justify-center gap-1 bg-white hover:bg-lime-100 border-2 border-lime-400 rounded-xl py-3 px-2 font-bold text-xl text-gray-800 shadow-md hover:scale-105 transition-all active:scale-95"
                >
                  {num}
                  <Volume2 className="h-4 w-4 text-lime-500" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-3 w-3 rounded-full transition-all ${
                i === currentPage ? "bg-lime-400 scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumbersCarousel;
