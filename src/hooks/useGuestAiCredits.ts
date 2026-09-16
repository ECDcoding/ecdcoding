import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Guest access rules for ECD AI:
 * - One free question per calendar week.
 * - Beyond that, a once-off R100 PayFast payment grants 50 credits.
 * - 1 credit is spent per minute of active chat time.
 * Registered (signed-in) users are not limited by this hook.
 */

const WEEK_KEY = "ecd_ai_guest_week";
const COUNT_KEY = "ecd_ai_guest_week_questions";
const CREDITS_KEY = "ecd_ai_guest_credits";
export const PENDING_CREDITS_KEY = "ecd_ai_pending_credits";
export const GUEST_CREDITS_PER_PURCHASE = 50;
export const FREE_QUESTIONS_PER_WEEK = 1;

const currentWeek = () => {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  const week = Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return `${now.getUTCFullYear()}-W${week}`;
};

const readNumber = (key: string) => {
  const raw = localStorage.getItem(key);
  const value = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(value) && value > 0 ? value : 0;
};

export const grantGuestCredits = (amount = GUEST_CREDITS_PER_PURCHASE) => {
  const next = readNumber(CREDITS_KEY) + amount;
  localStorage.setItem(CREDITS_KEY, String(next));
  return next;
};

export const useGuestAiCredits = (enabled: boolean) => {
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const [credits, setCredits] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Load / roll over the week on mount
  useEffect(() => {
    if (!enabled) return;
    const week = currentWeek();
    if (localStorage.getItem(WEEK_KEY) !== week) {
      localStorage.setItem(WEEK_KEY, week);
      localStorage.setItem(COUNT_KEY, "0");
      setQuestionsUsed(0);
    } else {
      setQuestionsUsed(readNumber(COUNT_KEY));
    }
    setCredits(readNumber(CREDITS_KEY));
  }, [enabled]);

  const refresh = useCallback(() => {
    setQuestionsUsed(readNumber(COUNT_KEY));
    setCredits(readNumber(CREDITS_KEY));
  }, []);

  const freeQuestionsLeft = Math.max(0, FREE_QUESTIONS_PER_WEEK - questionsUsed);
  const canAsk = !enabled || freeQuestionsLeft > 0 || credits > 0;

  const registerQuestion = useCallback(() => {
    if (!enabled) return;
    if (readNumber(COUNT_KEY) < FREE_QUESTIONS_PER_WEEK) {
      const next = readNumber(COUNT_KEY) + 1;
      localStorage.setItem(COUNT_KEY, String(next));
      setQuestionsUsed(next);
    }
  }, [enabled]);

  // Spend 1 credit per minute of active chat while the paid mode is in use
  const startSpending = useCallback(() => {
    if (!enabled || timerRef.current) return;
    timerRef.current = window.setInterval(() => {
      const remaining = Math.max(0, readNumber(CREDITS_KEY) - 1);
      localStorage.setItem(CREDITS_KEY, String(remaining));
      setCredits(remaining);
    }, 60_000);
  }, [enabled]);

  const stopSpending = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => stopSpending, [stopSpending]);

  return {
    credits,
    freeQuestionsLeft,
    canAsk,
    registerQuestion,
    startSpending,
    stopSpending,
    refresh,
  };
};
