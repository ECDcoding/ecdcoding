import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bot, X, Send, Loader2, Minimize2, Maximize2, ThumbsUp, ThumbsDown, Copy, Check, Mic, MicOff, Paperclip, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useGuestAiCredits, GUEST_CREDITS_PER_PURCHASE } from "@/hooks/useGuestAiCredits";
import AiCreditsPaywallDialog from "@/components/AiCreditsPaywallDialog";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

type Message = { role: "user" | "assistant"; content: string };
type CopilotLanguage = "en" | "tn";
type CopilotTopic = "behaviour" | "maths" | "lessons";

interface ExpoCopilotProps {
  /** The currently hovered/active section context, e.g. "Sponsorship", "Speakers" */
  context?: string;
  /** Hide the built-in floating launcher (when an external launcher controls it) */
  hideLauncher?: boolean;
  /** Controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const COPILOT_COPY = {
  en: {
    welcomeTitle: "👋 Hi! I'm your ECD AI",
    welcome: "Choose a topic below and I'll stay focused on it — child behaviour, Foundation Phase mathematics, or the lessons on offer.",
    tryAsking: "Frequently asked questions:",
    placeholder: "Ask about behaviour or lessons…",
    listening: "Listening…",
    thinking: "Thinking…",
    listenError: "Couldn't hear that — please try again.",
    voiceUnsupported: "Voice input isn't supported in this browser.",
    topicLabels: {
      behaviour: "Child Behavior",
      maths: "FP Mathematics",
      lessons: "Lessons",
    },
    topicHints: {
      behaviour: "Ages and stages, individuality, moods, routines and school readiness.",
      maths: "Foundation Phase mathematics teaching, activities and proficiency.",
      lessons: "Literacy, numeracy, coding, road safety, science and life skills.",
    },
    overviewAction: "Ask ECD AI about this",
    topicGuides: {
      behaviour: [
        { title: "Ages and Stages", summary: "A brief look at age-linked growth, communication, emotions and independence while recognising that every child develops differently.", question: "Please explain Ages and Stages for my child and help me understand what I may observe." },
        { title: "Individuality", summary: "Understand a child's unique temperament, interests, strengths, pace and preferred ways of learning.", question: "How can I understand and support my child's individuality?" },
        { title: "Body Types", summary: "Explore physical differences respectfully without using body shape to judge ability, health or development.", question: "How should I talk about body types and child development in a respectful way?" },
        { title: "Eating Habits", summary: "Review routines, food exploration and supportive ways to respond to common eating concerns.", question: "How can I support healthy eating habits without creating pressure?" },
        { title: "Sleeping", summary: "Consider age-appropriate routines, consistency and environmental factors that may affect sleep.", question: "How can I build a supportive sleeping routine for my child?" },
        { title: "Parent–Child Relationships", summary: "Strengthen connection through listening, predictable care, play, boundaries and shared routines.", question: "What practical steps can strengthen my relationship with my child?" },
        { title: "Mood Swings", summary: "Understand changing emotions as observations and learn calm, supportive responses without diagnosing.", question: "How should I respond to my child's mood swings?" },
        { title: "School Readiness", summary: "Look at physical, emotional, attention, social and early number-sense readiness alongside family and school support.", question: "Please help me understand my child's school readiness and suggest a way forward." },
      ],
      maths: [
        { title: "Learning Through Play", summary: "Use exploratory, construction, creative, physical, fantasy and word play to build mathematical ideas.", question: "How can I use the six kinds of play to support mathematical discovery?" },
        { title: "Number Sense", summary: "Build counting, number relationships, early operations and confidence before formal procedures.", question: "How can I build and observe my child's number sense?" },
        { title: "Counting Skills", summary: "Develop number names, one-to-one counting, cardinality and movement from concrete objects to abstract ideas.", question: "What activities can develop my child's counting skills at the right level?" },
        { title: "Problem Solving", summary: "Give children time, concrete materials and open questions so they can reason, make mistakes and explain strategies.", question: "Please suggest a play-based Foundation Phase mathematics problem-solving activity." },
        { title: "Five Learning Phases", summary: "Move through engagement, exploration, explanation, elaboration and evaluation in a child-centred lesson.", question: "How can I use the five learning phases in a Foundation Phase mathematics activity?" },
        { title: "Play and Number Sense Index", summary: "Use 1–10 observations as discussion aids for strengths and next activities, never as a diagnosis.", question: "How should I interpret Play Index and Number Sense Index observations and plan a way forward?" },
      ],
      lessons: [
        { title: "Verbal Testing Space", summary: "Learners describe carousel items to practise observation, communication, confidence and following instructions.", question: "How should my child use the Verbal Testing Space?" },
        { title: "Assignments", summary: "Age-appropriate tasks help learners apply ideas while parents and ECD managers observe understanding.", question: "How can Assignments help me understand and support my child's learning?" },
        { title: "FLC Report", summary: "A 1–10 learning outcome summarises available evidence and suggests an appropriate way forward.", question: "How should I understand and use the FLC Report?" },
        { title: "Coding and Technology", summary: "Coding, Blockly, Scratch and Micro:bit activities develop logic, creativity and future-focused problem solving.", question: "Which ECDcoding technology lesson is appropriate for my child's age?" },
        { title: "Users' Reviews", summary: "Parents, teachers and the ECD community share observations and constructive guidance around learner progress.", question: "How should I use Users' Reviews to support my child's progress?" },
        { title: "Learning the Basics", summary: "Explore literacy, numeracy, road safety, transport, science, life skills and age-appropriate technology.", question: "Which Learning the Basics lesson should my child start with, and why?" },
      ],
    },
    faqs: {
      behaviour: [
        "What developmental milestones should I expect at my child's age?",
        "How can I understand my child's individuality and behaviour patterns?",
        "How can I support healthy eating and sleeping habits?",
        "Are mood swings normal at my child's age?",
        "How can I strengthen our parent-child relationship?",
        "How can I tell if my child is ready for school?",
        "Do body types affect a child's development?",
      ],
      maths: [
        "How do young children build mathematical understanding?",
        "What hands-on activities teach counting and number sense?",
        "How do I help my child explain their own method instead of memorising?",
        "What is procedural fluency at ages 4–7, and how do I build it?",
        "How do I use the five-phase learning cycle in a maths activity?",
        "How do I build my child's confidence in mathematics?",
        "How should I respond when my child makes a maths mistake?",
      ],
      lessons: [
        "Which ECDcoding lessons suit my child's age and needs?",
        "What is in the Verbal Testing Space and how does it work?",
        "How does the FLC Report show my child's progress?",
        "What coding lessons are available for 04–07 and 08–12?",
        "Which road safety and transport lessons should we start with?",
        "What does Science Discovery cover?",
      ],
    },
  },
  tn: {
    welcomeTitle: "👋 Dumela! Ke ECD AI ya gago",
    welcome: "Tlhopha setlhogo fa tlase mme ke tla tsepamisa mogopolo mo go sona — boitshwaro jwa ngwana, dipalo tsa Foundation Phase, kgotsa dithuto tse di leng teng.",
    tryAsking: "Dipotso tse di botswang gantsi:",
    placeholder: "Botsa ka boitshwaro kgotsa dithuto…",
    listening: "Ke reeditse…",
    thinking: "Ke a akanya…",
    listenError: "Ga ke a go utlwa — tsweetswee leka gape.",
    voiceUnsupported: "Go bua ka lentswe ga go tshegediwe mo sebatling seno.",
    topicLabels: {
      behaviour: "Boitshwaro",
      maths: "Dipalo (FP)",
      lessons: "Dithuto",
    },
    topicHints: {
      behaviour: "Dingwaga le dikgato, botho, maikutlo, mekgwa le go siamela sekolo.",
      maths: "Go ruta dipalo tsa Foundation Phase le ditiro tsa tsona.",
      lessons: "Go bala, dipalo, khouto, pabalesego mo tseleng, saense le dikgono tsa botshelo.",
    },
    overviewAction: "Botsa ECD AI ka seno",
    topicGuides: {
      behaviour: [
        { title: "Dingwaga le Dikgato", summary: "Tebokakaretso ya kgolo, puisano, maikutlo le boikemelo go ya ka dingwaga, go dumela gore ngwana mongwe le mongwe o gola ka tsela ya gagwe.", question: "Tsweetswee tlhalosa Dingwaga le Dikgato tsa ngwana wa me le se nka se lemogang." },
        { title: "Botho jo bo Kgethegileng", summary: "Tlhaloganya botho, dikgatlhego, bokgoni, lebelo le tsela e ngwana a ratang go ithuta ka yone.", question: "Nka tlhaloganya le go tshegetsa jang botho jo bo kgethegileng jwa ngwana wa me?" },
        { title: "Mefuta ya Mmele", summary: "Bua ka dipharologano tsa mmele ka tlotlo, ntle le go atlhola bokgoni kgotsa kgolo ka sebopego.", question: "Nka bua jang ka mefuta ya mmele le kgolo ya ngwana ka tlotlo?" },
        { title: "Mekgwa ya go Ja", summary: "Sekaseka mekgwa, go leka dijo le ditsela tse di bonolo tsa go araba matshwenyego a go ja.", question: "Nka tshegetsa jang mekgwa e e siameng ya go ja ntle le go gatelela ngwana?" },
        { title: "Go Robala", summary: "Akanya ka mekgwa e e maleba ya dingwaga, go tlhomama le tikologo e e ka amang boroko.", question: "Nka aga jang mokgwa o o tshegetsang wa go robala wa ngwana wa me?" },
        { title: "Kamano ya Motsadi le Ngwana", summary: "Nonotsha kamano ka go reetsa, tlhokomelo e e tlhomameng, motshameko, melelwane le mekgwa e e kopanetsweng.", question: "Ke dikgato dife tse nka di tsayang go nonotsha kamano ya me le ngwana?" },
        { title: "Go Fetofetoga ga Maikutlo", summary: "Tlhaloganya maikutlo a a fetogang jaaka dilo tse di lemogwang, mme o arabe ka kagiso ntle le go dira tlhatlhobo ya bolwetse.", question: "Ke tshwanetse go araba jang go fetofetoga ga maikutlo ga ngwana wa me?" },
        { title: "Go Siamela Sekolo", summary: "Leba mmele, maikutlo, tlhokomelo, botsalano le kitso ya dipalo mmogo le tshegetso ya lelapa le sekolo.", question: "Nthuse go tlhaloganya go siamela sekolo ga ngwana wa me le tsela e re ka tswelelang ka yone." },
      ],
      maths: [
        { title: "Go Ithuta ka Motshameko", summary: "Dirisa mefuta e merataro ya motshameko go aga dikakanyo tsa dipalo.", question: "Nka dirisa jang mefuta e merataro ya motshameko go tshegetsa go ribolola dipalo?" },
        { title: "Kutlwisiso ya Dipalo", summary: "Aga go bala, dikamano tsa dipalo, ditiro tsa ntlha le boitshepo pele ga mekgwa ya semmuso.", question: "Nka aga le go lemoga jang kutlwisiso ya dipalo ya ngwana wa me?" },
        { title: "Bokgoni jwa go Bala", summary: "Tlhabolola maina a dipalo, go bala selo ka sengwe, palogotlhe le go tswa mo dilong go ya mo kakanyong.", question: "Ke ditiro dife tse di ka godisang bokgoni jwa ngwana wa me jwa go bala?" },
        { title: "Tharabololo ya Mathata", summary: "Naya bana nako, didiriswa le dipotso tse di bulegileng gore ba akanye, ba dire diphoso le go tlhalosa mekgwa.", question: "Ntsenye tirong ya motshameko ya go rarabolola bothata jwa dipalo tsa Foundation Phase." },
        { title: "Dikgato tse Tlhano tsa go Ithuta", summary: "Tsamaea ka kgatlhego, patlisiso, tlhaloso, katoloso le tlhatlhobo mo thutong e e tsepameng mo ngwaneng.", question: "Nka dirisa jang dikgato tse tlhano tsa go ithuta mo tirong ya dipalo?" },
        { title: "Play le Number Sense Index", summary: "Dirisa ditemogo tsa 1–10 go buisana ka bokgoni le tiro e e latelang, e seng jaaka tlhatlhobo ya bolwetse.", question: "Nka tlhaloganya jang Play Index le Number Sense Index le go rulaganya tsela e e yang pele?" },
      ],
      lessons: [
        { title: "Verbal Testing Space", summary: "Baithuti ba tlhalosa ditshwantsho go ikatisa go lemoga, puisano, boitshepo le go latela ditaelo.", question: "Ngwana wa me o tshwanetse go dirisa jang Verbal Testing Space?" },
        { title: "Assignments", summary: "Ditiro tse di maleba tsa dingwaga di thusa bana go dirisa dikakanyo fa bagolo ba lemoga tlhaloganyo.", question: "Assignments di ka nthusa jang go tlhaloganya le go tshegetsa go ithuta ga ngwana?" },
        { title: "Pego ya FLC", summary: "Sephetho sa 1–10 se sobokanya bosupi jo bo leng teng mme se tshitshinya tsela e e maleba ya go ya pele.", question: "Ke tshwanetse go tlhaloganya le go dirisa jang Pego ya FLC?" },
        { title: "Khouto le Thekenoloji", summary: "Khouto, Blockly, Scratch le Micro:bit di godisa tlhaloganyo, boitlhamedi le tharabololo ya mathata.", question: "Ke thuto efe ya thekenoloji ya ECDcoding e e siametseng dingwaga tsa ngwana wa me?" },
        { title: "Users' Reviews", summary: "Batsadi, barutabana le baagi ba ECD ba arolelana ditemogo le kaelo e e agang ka kgatelopele.", question: "Nka dirisa jang Users' Reviews go tshegetsa kgatelopele ya ngwana wa me?" },
        { title: "Learning the Basics", summary: "Sekaseka go bala, dipalo, pabalesego mo tseleng, dipalangwa, saense, dikgono tsa botshelo le thekenoloji.", question: "Ngwana wa me o tshwanetse go simolola ka thuto efe ya Learning the Basics, mme ka ntlha yang?" },
      ],
    },
    faqs: {
      behaviour: [
        "Ke dikgato dife tsa kgolo tse ke tshwanetseng go di lebelela mo dingwageng tsa ngwana wa me?",
        "Nka tlhaloganya jang botho le boitshwaro jwa ngwana wa me?",
        "Nka tshegetsa jang mekgwa e e siameng ya go ja le go robala?",
        "A go fetofetoga ga maikutlo go tlwaelegile mo dingwageng tsa ngwana wa me?",
        "Nka nonotsha jang kamano ya me le ngwana wa me?",
        "Nka itse jang gore ngwana wa me o siametse go simolola sekolo?",
        "A mefuta ya mmele e ama kgolo ya ngwana?",
      ],
      maths: [
        "Bana ba bannye ba aga jang tlhaloganyo ya dipalo?",
        "Ke ditiro dife tsa diatla tse di ruta go bala le go tlhaloganya dipalo?",
        "Nka thusa jang ngwana wa me go tlhalosa mokgwa wa gagwe go na le go tshwara ka pelo?",
        "Bokgoni jwa mekgwa ya dipalo ke eng mo dingwageng di le 4–7, mme nka bo aga jang?",
        "Nka dirisa jang dikgato tse tlhano tsa go ithuta mo tirong ya dipalo?",
        "Nka aga jang boitshepo jwa ngwana wa me mo dipalong?",
        "Ke tshwanetse go arabela jang fa ngwana wa me a dira phoso mo dipalong?",
      ],
      lessons: [
        "Ke dithuto dife tsa ECDcoding tse di siametseng dingwaga le ditlhoko tsa ngwana wa me?",
        "Verbal Testing Space e na le eng mme e dira jang?",
        "Pego ya FLC e bontsha jang kgatelopele ya ngwana wa me?",
        "Ke dithuto dife tsa khouto tse di leng teng mo 04–07 le 08–12?",
        "Re tshwanetse go simolola ka dithuto dife tsa pabalesego mo tseleng le dipalangwa?",
        "Science Discovery e akaretsa eng?",
      ],
    },
  },
} as const;

const TOPIC_ORDER: CopilotTopic[] = ["behaviour", "maths", "lessons"];


const ExpoCopilot = ({ context, hideLauncher, open, onOpenChange }: ExpoCopilotProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setIsOpen = (value: boolean) => {
    onOpenChange ? onOpenChange(value) : setInternalOpen(value);
  };
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [feedback, setFeedback] = useState<Record<number, "up" | "down">>({});
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<CopilotLanguage>("en");
  const [topic, setTopic] = useState<CopilotTopic>("behaviour");
  const [expandedTopic, setExpandedTopic] = useState<CopilotTopic | null>("behaviour");
  const [attachment, setAttachment] = useState<{ name: string; text: string } | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const isGuest = !authLoading && !user;
  const guest = useGuestAiCredits(isGuest);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Animate in after mount
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Visitors on paid credits spend 1 credit per minute of open chat
  useEffect(() => {
    if (isGuest && isOpen && !isMinimized && guest.freeQuestionsLeft === 0 && guest.credits > 0) {
      guest.startSpending();
    } else {
      guest.stopSpending();
    }
  }, [isGuest, isOpen, isMinimized, guest.freeQuestionsLeft, guest.credits, guest.startSpending, guest.stopSpending]);

  const copy = COPILOT_COPY[language];

  const streamChat = useCallback(async (userMessages: Message[], ctx?: string) => {
    const resp = await fetch(`${SUPABASE_URL}/functions/v1/expo-copilot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages, context: ctx, language, topic }),
    });

    if (!resp.ok || !resp.body) {
      const data = await resp.json().catch(() => ({}));
      if (resp.status === 429) throw new Error("Rate limit exceeded. Please try again shortly.");
      if (resp.status === 402) throw new Error(data.error || "Service unavailable.");
      throw new Error(data.error || "Failed to connect to Copilot.");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantText = "";
    let done = false;

    // Seed assistant message
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (!done) {
      const { done: streamDone, value } = await reader.read();
      if (streamDone) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIdx: number;
      while ((newlineIdx = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIdx);
        textBuffer = textBuffer.slice(newlineIdx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") { done = true; break; }
        try {
          const parsed = JSON.parse(json);
          const chunk = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (chunk) {
            assistantText += chunk;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: assistantText };
              return updated;
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  }, [language, topic]);

  const sendMessage = useCallback(async (text: string) => {
    if ((!text.trim() && !attachment) || isLoading) return;

    // Visitors: 1 free question per week, then R100 once off for 50 credits
    if (isGuest && !guest.canAsk) {
      setPaywallOpen(true);
      return;
    }
    if (isGuest) guest.registerQuestion();


    const content = attachment
      ? `${text.trim()}\n\n[Attached file: ${attachment.name}]\n${attachment.text}`.trim()
      : text;
    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setAttachment(null);
    setIsLoading(true);

    try {
      await streamChat(newMessages, context);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(errMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: `Sorry, I encountered an error: ${errMsg}` }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, context, isLoading, streamChat, attachment, isGuest, guest]);

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error(copy.voiceUnsupported);
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language === "tn" ? "tn-ZA" : "en-ZA";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join(" ");
      setInput(transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
      toast.error(copy.listenError);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  // Words/phrases that make a file unsuitable for a child-education assistant
  const BLOCKED_TERMS = [
    "porn", "pornographic", "xxx", "nsfw", "nude", "nudes", "naked", "sex", "sexual", "sexy",
    "erotic", "erotica", "fetish", "escort", "brothel", "orgy", "masturbat", "genital", "penis",
    "vagina", "boobs", "rape", "incest", "paedophil", "pedophil", "child porn", "bestiality",
    "kill yourself", "suicide method", "self-harm", "cutting myself", "behead", "gore", "snuff",
    "terrorist attack", "bomb making", "how to make a bomb", "pipe bomb", "explosive device",
    "buy a gun illegally", "cocaine", "heroin", "meth", "methamphetamine", "ecstasy pills",
    "weed dealer", "gambling site", "betting tips", "credit card dump", "hack a password",
    "malware", "ransomware", "keylogger", "phishing kit", "fuck", "shit", "bitch", "cunt",
    "nigger", "faggot", "kaffir", "whore", "slut",
  ];

  const findBlockedTerm = (value: string) => {
    const lower = value.toLowerCase();
    return BLOCKED_TERMS.find((term) => lower.includes(term));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    // 1. Refuse pictures, music, videos and any other non-text media outright
    const mediaLike =
      /^(image|audio|video)\//.test(file.type) ||
      /\.(jpg|jpeg|png|gif|webp|bmp|tif|tiff|heic|heif|svg|ico|psd|ai|mp3|wav|m4a|aac|ogg|flac|wma|mid|midi|mp4|mov|avi|mkv|webm|wmv|flv|3gp|exe|dmg|apk|msi|bat|sh|zip|rar|7z|iso)$/i.test(
        file.name,
      );
    if (mediaLike) {
      toast.error("Pictures, music, videos and app files can't be attached. Please attach a text file (.txt, .md, .csv, .json) only.");
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error("Please attach a file smaller than 1 MB.");
      return;
    }

    const readable = /^(text\/|application\/json)/.test(file.type) || /\.(txt|md|csv|json)$/i.test(file.name);
    if (!readable) {
      toast.error("Only text files (.txt, .md, .csv, .json) can be attached to ECD AI.");
      return;
    }

    // 2. Refuse inappropriate file names
    if (findBlockedTerm(file.name)) {
      toast.error("That file name isn't appropriate for a children's learning assistant, so it was not accepted.");
      return;
    }

    try {
      const text = await file.text();

      // 3. Refuse files that are not really text (binary content disguised as text)
      // eslint-disable-next-line no-control-regex
      if (/[\u0000-\u0008\u000E-\u001F]/.test(text.slice(0, 4000))) {
        toast.error("That file isn't readable text, so it was not accepted.");
        return;
      }

      // 4. Refuse inappropriate content inside the file
      const blocked = findBlockedTerm(text.slice(0, 20000));
      if (blocked) {
        toast.error("This file contains content that isn't appropriate for a children's learning assistant, so it was refused.");
        return;
      }

      setAttachment({ name: file.name, text: text.slice(0, 8000) });
      toast.success(`Attached ${file.name}`);
    } catch {
      toast.error("Could not read that file.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleCopy = async (idx: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx((c) => (c === idx ? null : c)), 1500);
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  };

  const handleFeedback = (idx: number, value: "up" | "down") => {
    setFeedback((prev) => {
      const next = { ...prev };
      if (next[idx] === value) {
        delete next[idx];
        return next;
      }
      next[idx] = value;
      return next;
    });
    if (feedback[idx] !== value) {
      toast.success(value === "up" ? "Thanks for the thumbs up!" : "Thanks — we'll use this to improve.");
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed ${hideLauncher ? "bottom-28" : "bottom-6"} left-6 z-50 flex flex-col items-start gap-3`}>
      {/* Chat Window */}
      {isOpen && (
        <Card
          className={`w-[min(24rem,calc(100vw-3rem))] shadow-2xl border border-primary/20 bg-card transition-all duration-300 ${
            isMinimized ? "h-14 overflow-hidden" : "h-[min(600px,calc(100vh-8rem))]"
          } flex flex-col`}
        >
          {/* Header */}
          <CardHeader className="py-3 px-4 bg-primary text-primary-foreground rounded-t-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-orange-400 rounded-full border border-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-none">ECD AI</p>
                  {context && (
                    <p className="text-xs text-primary-foreground/70 mt-0.5">
                      Context: {context}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsMinimized((m) => !m)}
                >
                  {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            {!isMinimized && (
              <div className="mt-2 grid grid-cols-2 gap-1 rounded-md border border-primary-foreground/30 p-0.5" role="group" aria-label="ECD AI language">
                <button
                  type="button"
                  aria-pressed={language === "en"}
                  onClick={() => setLanguage("en")}
                  className={`h-7 rounded text-[11px] font-medium transition-colors ${language === "en" ? "bg-primary-foreground text-primary" : "text-primary-foreground hover:bg-primary-foreground/20"}`}
                >
                  English
                </button>
                <button
                  type="button"
                  aria-pressed={language === "tn"}
                  onClick={() => setLanguage("tn")}
                  className={`h-7 rounded text-[11px] font-medium transition-colors ${language === "tn" ? "bg-primary-foreground text-primary" : "text-primary-foreground hover:bg-primary-foreground/20"}`}
                >
                  Setswana
                </button>
              </div>
            )}
          </CardHeader>

          {!isMinimized && (
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Expandable topic guides keep questions focused on one aspect. */}
              <div className="flex-shrink-0 border-b border-border bg-muted/40 px-2 py-2">
                <div className="space-y-1" aria-label="ECD AI topic guides">
                  {TOPIC_ORDER.map((t) => (
                    <div key={t} className="overflow-hidden rounded-md border border-border bg-background">
                      <Button
                        type="button"
                        variant="ghost"
                        aria-expanded={expandedTopic === t}
                        onClick={() => {
                          setTopic(t);
                          setExpandedTopic((current) => current === t ? null : t);
                        }}
                        className={`h-8 w-full justify-between rounded-none px-2 text-[11px] ${topic === t ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "text-muted-foreground"}`}
                      >
                        {copy.topicLabels[t]}
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expandedTopic === t ? "rotate-180" : ""}`} />
                      </Button>
                      {expandedTopic === t && (
                        <div className="max-h-48 space-y-1 overflow-y-auto border-t border-border p-1.5">
                          <p className="px-1 pb-1 text-[10px] leading-snug text-muted-foreground">{copy.topicHints[t]}</p>
                          {copy.topicGuides[t].map((guide) => (
                            <Button
                              key={guide.title}
                              type="button"
                              variant="ghost"
                              onClick={() => sendMessage(guide.question)}
                              disabled={isLoading}
                              className="h-auto w-full items-start justify-start whitespace-normal rounded px-2 py-2 text-left"
                              title={copy.overviewAction}
                            >
                              <span className="block">
                                <span className="block text-[11px] font-semibold text-foreground">{guide.title}</span>
                                <span className="mt-0.5 block text-[10px] font-normal leading-snug text-muted-foreground">{guide.summary}</span>
                              </span>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="space-y-3">
                    <div className="bg-muted rounded-xl p-3 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">{copy.welcomeTitle}</p>
                      <p>{copy.welcome}</p>
                    </div>
                    <p className="text-xs text-muted-foreground px-1">
                      {copy.tryAsking} <span className="font-medium text-foreground">{copy.topicLabels[topic]}</span>
                    </p>
                  </div>

                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                      >
                        {msg.content || (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            {copy.thinking}
                          </span>
                        )}
                      </div>
                      {msg.role === "assistant" && msg.content && (
                        <div className="flex items-center gap-1 mt-1 ml-1">
                          <button
                            aria-label="Helpful"
                            onClick={() => handleFeedback(i, "up")}
                            className={`p-1 rounded-md transition-colors hover:bg-muted ${
                              feedback[i] === "up" ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            aria-label="Not helpful"
                            onClick={() => handleFeedback(i, "down")}
                            className={`p-1 rounded-md transition-colors hover:bg-muted ${
                              feedback[i] === "down" ? "text-destructive" : "text-muted-foreground"
                            }`}
                          >
                            <ThumbsDown className="h-3.5 w-3.5" />
                          </button>
                          <button
                            aria-label="Copy response"
                            onClick={() => handleCopy(i, msg.content)}
                            className="p-1 rounded-md text-muted-foreground transition-colors hover:bg-muted"
                          >
                            {copiedIdx === i ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border space-y-2">
                {attachment && (
                  <div className="flex items-center gap-2 text-xs bg-muted rounded-md px-2 py-1">
                    <Paperclip className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate flex-1">{attachment.name}</span>
                    <button aria-label="Remove attachment" onClick={() => setAttachment(null)}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.csv,.json,text/plain,application/json"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Attach file"
                  className="h-9 w-9 flex-shrink-0"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  variant={isListening ? "default" : "outline"}
                  size="icon"
                  aria-label={isListening ? "Stop voice input" : "Start voice input"}
                  className="h-9 w-9 flex-shrink-0"
                  onClick={toggleListening}
                  disabled={isLoading}
                >
                  {isListening ? <MicOff className="h-4 w-4 animate-pulse" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                   placeholder={isListening ? copy.listening : copy.placeholder}
                  className="flex-1 text-sm h-9 min-w-0"
                  disabled={isLoading}
                />
                <Button
                  size="icon"
                  className="h-9 w-9 flex-shrink-0"
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || (!input.trim() && !attachment)}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
                </div>
                {isGuest && (
                  <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                    <span className={guest.isLowOnCredits ? "font-semibold text-destructive" : undefined}>
                      {guest.freeQuestionsLeft > 0
                        ? "1 free question this week"
                        : guest.credits > 0
                          ? `${guest.credits} credits left (1 per minute)${
                              guest.isLowOnCredits ? " — please refill to carry on" : ""
                            }${
                              guest.creditsExpireAt
                                ? ` · expires ${guest.creditsExpireAt.toLocaleDateString()}`
                                : ""
                            }`
                          : "Free question used"}
                    </span>
                    {(guest.credits === 0 || guest.isLowOnCredits) && (
                      <button
                        type="button"
                        onClick={() => setPaywallOpen(true)}
                        className="font-semibold text-primary underline whitespace-nowrap"
                      >
                        {guest.credits === 0 ? "Get" : "Refill"} {GUEST_CREDITS_PER_PURCHASE} credits — R100
                      </button>
                    )}
                  </div>
                )}

              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Trigger Button */}
      {!hideLauncher && (
      <Button
        onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
        aria-label={isOpen ? "Close ECD AI" : "ECD AI"}
        title={isOpen ? "Close ECD AI" : "ECD AI"}
        className="h-20 w-20 rounded-full shadow-xl bg-black hover:bg-black/80 relative"
        size="icon"
      >
        {isOpen ? (
          <X className="h-8 w-8 text-white" />
        ) : (
          <>
            <Bot className="h-14 w-14 text-white" />
            <span className="absolute -top-1 -right-1 h-6 w-6 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">ASK</span>
            </span>
          </>
        )}
      </Button>
      )}

      <AiCreditsPaywallDialog open={paywallOpen} onOpenChange={setPaywallOpen} />
    </div>
  );
};

export default ExpoCopilot;
