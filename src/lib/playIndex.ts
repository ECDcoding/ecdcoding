/**
 * Shared Learner Play Index / Number Sense Index model.
 * Ratings are stored per age band so that each Learner Progress Report
 * (04 - 05 and 06 - 07) can be aligned with its own index results.
 */

export const AGE_BANDS = ["04-05", "06-07"] as const;
export type AgeBand = (typeof AGE_BANDS)[number];

export const AGE_BAND_LABELS: Record<AgeBand, string> = {
  "04-05": "04 - 05 years",
  "06-07": "06 - 07 years",
};

export const isAgeBand = (value: string | null | undefined): value is AgeBand =>
  AGE_BANDS.includes((value || "") as AgeBand);

export const PLAY_AREAS = [
  "Exploratory Play",
  "Construction Play",
  "Creative Play",
  "Physical & Locomotive Play",
  "Fantasy Play",
  "Word Play",
] as const;
export type PlayArea = (typeof PLAY_AREAS)[number];

export const PLAY_LABELS: Record<PlayArea, string> = {
  "Exploratory Play": "Exploratory",
  "Construction Play": "Construction",
  "Creative Play": "Creative",
  "Physical & Locomotive Play": "Physical",
  "Fantasy Play": "Fantasy",
  "Word Play": "Word",
};

export const NUMBER_SENSE_AREAS = [
  "Problem-solving skills",
  "Sound number sense",
  "Use of technology",
  "Use of numbers, objects, shapes and colours",
  "Levels of maturity",
  "Use of mathematical ideas",
  "Use of the environment for counting",
  "Verbal and object counting",
  "Fluency with counting forwards and backwards",
  "Finding answers through addition, subtraction, multiplication and division",
] as const;
export type NumberSenseArea = (typeof NUMBER_SENSE_AREAS)[number];

export const NUMBER_SENSE_LABELS: Record<NumberSenseArea, string> = {
  "Problem-solving skills": "Problem-solving",
  "Sound number sense": "Number sense",
  "Use of technology": "Technology",
  "Use of numbers, objects, shapes and colours": "Maths resources",
  "Levels of maturity": "Maturity",
  "Use of mathematical ideas": "Maths ideas",
  "Use of the environment for counting": "Environment",
  "Verbal and object counting": "Counting",
  "Fluency with counting forwards and backwards": "Counting fluency",
  "Finding answers through addition, subtraction, multiplication and division": "Operations",
};

export type IndexAssessment = {
  observed: string[];
  playLevels: Record<PlayArea, number>;
  numberSenseLevels: Record<NumberSenseArea, number>;
};

export const initialPlayLevels = () =>
  Object.fromEntries(PLAY_AREAS.map((area) => [area, 1])) as Record<PlayArea, number>;

export const initialNumberSenseLevels = () =>
  Object.fromEntries(NUMBER_SENSE_AREAS.map((area) => [area, 1])) as Record<NumberSenseArea, number>;

export const emptyAssessment = (): IndexAssessment => ({
  observed: [],
  playLevels: initialPlayLevels(),
  numberSenseLevels: initialNumberSenseLevels(),
});

const storageKey = (band: AgeBand) => `ecd_play_index_${band}`;

const clamp = (value: unknown) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return 1;
  return Math.min(10, Math.max(1, Math.round(n)));
};

export const loadAssessment = (band: AgeBand): IndexAssessment => {
  const base = emptyAssessment();
  try {
    const raw = localStorage.getItem(storageKey(band));
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<IndexAssessment>;
    return {
      observed: Array.isArray(parsed.observed) ? parsed.observed.filter((x) => typeof x === "string") : [],
      playLevels: Object.fromEntries(
        PLAY_AREAS.map((area) => [area, clamp((parsed.playLevels as any)?.[area])]),
      ) as Record<PlayArea, number>,
      numberSenseLevels: Object.fromEntries(
        NUMBER_SENSE_AREAS.map((area) => [area, clamp((parsed.numberSenseLevels as any)?.[area])]),
      ) as Record<NumberSenseArea, number>,
    };
  } catch {
    return base;
  }
};

export const saveAssessment = (band: AgeBand, assessment: IndexAssessment) => {
  try {
    localStorage.setItem(storageKey(band), JSON.stringify(assessment));
  } catch {
    /* storage unavailable */
  }
};

export const average = (values: number[]) =>
  values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : 0;

export const getIndexLevelLabel = (value: number) => {
  if (value >= 8) return "Highly developed";
  if (value >= 6) return "Developing strongly";
  if (value >= 4) return "Emerging";
  return "Beginning";
};
