import { useState } from "react";
import { Star } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type LessonPeriod = "day" | "week" | "month";

const periodLabels: Record<LessonPeriod, string> = {
  day: "Today's",
  week: "This Week's",
  month: "This Month's",
};

interface CardLessonFocusProps {
  focusedCard?: string | null;
  carouselCardData?: Record<string, { image?: string; title?: string; content?: React.ReactNode; borderColor: string }>;
  period?: LessonPeriod;
  onPeriodChange?: (period: LessonPeriod) => void;
  onCardClick?: (cardName: string) => void;
}

const CardLessonFocus = ({ focusedCard, carouselCardData, period, onPeriodChange, onCardClick }: CardLessonFocusProps) => {
  const [internalPeriod, setInternalPeriod] = useState<LessonPeriod>("day");
  const lessonPeriod = period ?? internalPeriod;
  const setLessonPeriod = (val: LessonPeriod) => {
    if (onPeriodChange) onPeriodChange(val);
    else setInternalPeriod(val);
  };

  const focusedCardData = focusedCard && carouselCardData ? carouselCardData[focusedCard] : null;

  return (
    <div className="mt-12 p-6 rounded-2xl" style={{ backgroundColor: "#395B50" }}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <h2
          className="text-2xl sm:text-3xl font-bold text-lime-400 text-center"
          style={{ fontFamily: '"Bungee Shade", cursive' }}
        >
          📋 Lesson of the
        </h2>
        <Select value={lessonPeriod} onValueChange={(val) => setLessonPeriod(val as LessonPeriod)}>
          <SelectTrigger className="w-[140px] bg-lime-400 text-gray-900 font-bold border-none rounded-xl text-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Focused Card Banner */}
      {focusedCard && focusedCardData ? (
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => onCardClick?.(focusedCard)}
            className="w-full bg-lime-400/20 border-2 border-lime-400 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 cursor-pointer transition-all duration-200 hover:bg-lime-400/30 hover:border-lime-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(163,230,53,0.5)] focus:outline-none focus:ring-4 focus:ring-lime-300/60 text-left animate-[pulse_3.5s_ease-in-out_infinite]"
            title="Click to launch this lesson"
          >
            <Star className="h-8 w-8 text-yellow-400 fill-yellow-400 flex-shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-lime-300 text-sm font-semibold uppercase tracking-wide">
                {periodLabels[lessonPeriod]} Focus Card · Click to launch
              </p>
              <h3 className="text-white text-xl font-bold">
                {focusedCardData.title || focusedCard}
              </h3>
            </div>
            {focusedCardData.image && (
              <img
                src={focusedCardData.image}
                alt={focusedCardData.title || focusedCard}
                className="w-24 h-24 object-cover rounded-lg border-2 border-white/30"
              />
            )}
          </button>
        </div>
      ) : (
        <p className="text-white/60 text-center text-lg">
          Click a card in the Verbal Testing Space below to set the focus lesson.
        </p>
      )}
    </div>
  );
};

export default CardLessonFocus;
