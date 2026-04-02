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
}

const CardLessonFocus = ({ focusedCard, carouselCardData }: CardLessonFocusProps) => {
  const [lessonPeriod, setLessonPeriod] = useState<LessonPeriod>("day");

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
          <div className="bg-lime-400/20 border-2 border-lime-400 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
            <Star className="h-8 w-8 text-yellow-400 fill-yellow-400 flex-shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-lime-300 text-sm font-semibold uppercase tracking-wide">
                {periodLabels[lessonPeriod]} Focus Card
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
          </div>
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
