import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, X, Send, Loader2, Minimize2, Maximize2, ThumbsUp, ThumbsDown, Copy, Check, Mic, MicOff, Paperclip, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message as AiMessage, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputButton, PromptInputFooter, PromptInputSubmit, PromptInputTextarea, PromptInputTools } from "@/components/ai-elements/prompt-input";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useGuestAiCredits, GUEST_CREDITS_PER_PURCHASE } from "@/hooks/useGuestAiCredits";
import AiCreditsPaywallDialog from "@/components/AiCreditsPaywallDialog";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

type Message = { role: "user" | "assistant"; content: string; topic?: CopilotTopic };
type CopilotLanguage = "en" | "tn" | "af" | "zu" | "xh" | "ts" | "nso" | "st" | "ve" | "nr" | "ss";

const LANGUAGES: { code: CopilotLanguage; label: string; voiceLang: string }[] = [
  { code: "en", label: "English", voiceLang: "en-ZA" },
  { code: "tn", label: "Setswana", voiceLang: "tn-ZA" },
  { code: "af", label: "Afrikaans", voiceLang: "af-ZA" },
  { code: "zu", label: "isiZulu", voiceLang: "zu-ZA" },
  { code: "xh", label: "isiXhosa", voiceLang: "xh-ZA" },
  { code: "ts", label: "Xitsonga", voiceLang: "ts-ZA" },
  { code: "nso", label: "Sepedi", voiceLang: "nso-ZA" },
  { code: "st", label: "Sesotho", voiceLang: "st-ZA" },
  { code: "ve", label: "Tshivenda", voiceLang: "ve-ZA" },
  { code: "nr", label: "IsiNdebele", voiceLang: "nr-ZA" },
  { code: "ss", label: "siSwati", voiceLang: "ss-ZA" },
];
type CopilotTopic = "library" | "maths" | "flo" | "behaviour" | "ecology" | "coding" | "dbe";

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
    welcome: "Choose any of the above topics if you have any queries or issues.",
    tryAsking: "Frequently asked questions:",
    placeholder: "Ask about behaviour or lessons…",
    listening: "Listening…",
    thinking: "Thinking…",
    listenError: "Couldn't hear that — please try again.",
    voiceUnsupported: "Voice input isn't supported in this browser.",
    topicLabels: {
      library: "Knowledge Base Library",
      maths: "Mathematics",
      flo: "Foundational Learning Outcomes",
      behaviour: "Child Behavior",
      ecology: "Domestic Ecology Stories",
      coding: "Coding and Robotics",
      dbe: "Policy",
    },
    topicHints: {
      behaviour: "Ages and stages, individuality, moods, routines and school readiness.",
      maths: "Foundation Phase mathematics teaching, activities and proficiency.",
      lessons: "Literacy, numeracy, coding, road safety, science and life skills.",
    },
    overviewAction: "Ask ECD AI about this",
    topicGuides: {
      library: [
        { title: "Learning the Basics", summary: "Learners explore literacy and numeracy.", question: "Which Learning the Basics lesson should my child start with, and why?" },
        { title: "Verbal Testing Space", summary: "Learners present what they see verbally to improve their knowledge base.", question: "How should my child use the Verbal Testing Space?" },
      ],
      flo: [
        { title: "Learner Play Index", summary: "Observe six kinds of play on a 1–10 scale to understand strengths and choose the next playful activity.", question: "How should I use the Learner Play Index to observe my child?" },
        { title: "Learner Progress Report", summary: "Age-band reports for 04–05 and 06–07 bring play and number-sense observations together in one view.", question: "How do I read and use my child's Learner Progress Report?" },
        { title: "FLC Report", summary: "A 1–10 learning outcome summarises available evidence and suggests an appropriate way forward.", question: "How should I understand and use the FLC Report?" },
      ],
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
      ecology: [
        { title: "Real-World Knowledge", summary: "Domestic ecology stories connect everyday species and places to real-world observation and care.", question: "How do Domestic Ecology Stories build my child's real-world knowledge?" },
        { title: "Child Play Knowledge", summary: "Play stories reveal how your child explores, builds, imagines and solves problems.", question: "What can my child's play tell me about how they learn?" },
        { title: "Benchmark and Inter-Play Videos", summary: "Watch benchmark videos and share inter-play videos to record and compare observations over time.", question: "How should I use the Benchmark and Inter-Play Videos?" },
      ],
      coding: [
        { title: "Coding in Numbers and Alphabets", summary: "Turn letters and numbers into codes to build pattern recognition and early computational thinking.", question: "How can my child practise coding in numbers and alphabets?" },
        { title: "Scratch and Blockly", summary: "Visual block coding builds logic, creativity and step-by-step problem solving.", question: "Which Scratch or Blockly activity suits my child's age?" },
        { title: "Recycle My Robot", summary: "A one-day robotics event booked in advance where children build robots from recycled materials.", question: "How do I book the Recycle My Robot event for my child?" },
      ],
      dbe: [
        { title: "Policy and CAPS", summary: "How ECDcoding activities align with Department of Basic Education and CAPS expectations for the early grades.", question: "How does ECDcoding align with DBE and CAPS policy for young learners?" },
      ],
      maths: [
        { title: "A Play-Based Approach", summary: "Let your child discover mathematics through concrete play, exploration and guided discovery before formal written work.", question: "How can I use a play-based approach to teach my child mathematics?" },
        { title: "Developing the Number Sense", summary: "Use 1–10 observations as discussion aids for strengths and next activities, never as a diagnosis.", question: "How should I interpret Play Index and Number Sense Index observations and plan a way forward?" },
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
      library: [
        "Which Learning the Basics lesson suits my child's age?",
        "How does the Verbal Testing Space work?",
        "Where do I find the Knowledge Base Carousel?",
      ],
      flo: [
        "What is the Learner Play Index and how do I rate it?",
        "How do the 04–05 and 06–07 progress reports differ?",
        "How is the FLC Report put together?",
      ],
      behaviour: [
        "What developmental milestones should I expect at my child's age?",
        "How can I understand my child's individuality and behaviour patterns?",
        "How can I support healthy eating and sleeping habits?",
        "Are mood swings normal at my child's age?",
        "How can I strengthen our parent-child relationship?",
        "How can I tell if my child is ready for school?",
        "Do body types affect a child's development?",
      ],
      ecology: [
        "What are Domestic Ecology Stories?",
        "How do Benchmark and Inter-Play Videos work?",
        "What real-world knowledge does domestic ecology build?",
      ],
      coding: [
        "What coding lessons are available for 04–07 and 08–12?",
        "How does Blockly or Scratch help my child think?",
        "How do I book Recycle My Robot?",
      ],
      dbe: [
        "Does ECDcoding follow the CAPS curriculum?",
        "How does the programme prepare children for Grade R and Grade 1?",
        "Where can I learn more about DBE policy for early childhood?",
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
    },
  },
  tn: {
    welcomeTitle: "👋 Dumela! Ke ECD AI ya gago",
    welcome: "Tlhopha e nngwe ya ditlhogo tse di fa godimo fa o na le dipotso kgotsa mathata a mangwe.",
    tryAsking: "Dipotso tse di botswang gantsi:",
    placeholder: "Botsa ka boitshwaro kgotsa dithuto…",
    listening: "Ke reeditse…",
    thinking: "Ke a akanya…",
    listenError: "Ga ke a go utlwa — tsweetswee leka gape.",
    voiceUnsupported: "Go bua ka lentswe ga go tshegediwe mo sebatling seno.",
    topicLabels: {
      library: "Laeborari ya Kitso",
      maths: "Dipalo",
      flo: "Diphitlhelelo tsa Thuto ya Motheo",
      behaviour: "Boitshwaro",
      ecology: "Dinane tsa Ikoekelo ya Selegae",
      coding: "Khouto le Robotics",
      dbe: "Melawana",
    },
    topicHints: {
      behaviour: "Dingwaga le dikgato, botho, maikutlo, mekgwa le go siamela sekolo.",
      maths: "Go ruta dipalo tsa Foundation Phase le ditiro tsa tsona.",
      lessons: "Go bala, dipalo, khouto, pabalesego mo tseleng, saense le dikgono tsa botshelo.",
    },
    overviewAction: "Botsa ECD AI ka seno",
    topicGuides: {
      library: [
        { title: "Learning the Basics", summary: "Baithuti ba batlisisa go bala le dipalo.", question: "Ngwana wa me o tshwanetse go simolola ka thuto efe ya Learning the Basics, mme ka ntlha yang?" },
        { title: "Verbal Testing Space", summary: "Baithuti ba tlhagisa ka molomo se ba se bonang go tokafatsa kitso ya bona.", question: "Ngwana wa me o tshwanetse go dirisa jang Verbal Testing Space?" },
      ],
      flo: [
        { title: "Learner Play Index", summary: "Lemoga mofuta wa motshameko wa 1–10 go tlhaloganya bokgoni le tiro e e latelang.", question: "Nka dirisa jang Learner Play Index go lemoga ngwana wa me?" },
        { title: "Pego ya Kgatelopele ya Ngwana", summary: "Dipego tsa dingwaga tsa 04–05 le 06–07 di kopanya temogo ya motshameko le kutlwisiso ya dipalo.", question: "Nka buisana jang le Pego ya Kgatelopele ya ngwana wa me?" },
        { title: "Pego ya FLC", summary: "Sephetho sa 1–10 se sobokanya bosupi jo bo leng teng mme se tshitshinya tsela e e maleba ya go ya pele.", question: "Ke tshwanetse go tlhaloganya le go dirisa jang Pego ya FLC?" },
      ],
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
      ecology: [
        { title: "Kitso ya Ntle ya Sekolo", summary: "Dinane tsa ikoekelo ya selegae di golaganya ditshedi le mafelo a a kgaogantsweng le kitso ya mafatshe.", question: "Dinane tsa Ikoekelo ya Selegae di aga jang kitso ya mafatshe ya ngwana wa me?" },
        { title: "Kitso ya Motshameko wa Ngwana", summary: "Dinane tsa motshameko di bontsha gore ngwana o batlisisa, o aga, o akanya le go rarabolola mathata jang.", question: "Motshameko wa ngwana wa me o mpolelelang eng ka tsela a ithutang ka yona?" },
        { title: "Ditshwantsho tsa Benchmark le Inter-Play", summary: "Lebelela ditshwantsho tsa benchmark mme lo abolele tsa inter-play go gatisa temogo ka nako.", question: "Nka dirisa jang Ditshwantsho tsa Benchmark le Inter-Play?" },
      ],
      coding: [
        { title: "Khouto mo Dipalong le Makgakgweng", summary: "Fetola makgakgwa le dipalo go nna khouto go aga kutlwisiso ya mekgwa le go akanya ka khouto.", question: "Ngwana wa me a ka ikatisa jang khouto mo dipalong le makgakgweng?" },
        { title: "Scratch le Blockly", summary: "Khouto ya dibloke e godisa tlhaloganyo, boitlhamedi le go rarabolola mathata.", question: "Ke tiragatso efe ya Scratch kgotsa Blockly e e siametseng ngwana wa me?" },
        { title: "Recycle My Robot", summary: "Ketsahalo ya letsatsi le le lelwang kwa pele ya go aga maroboto ka dilo tse di recyclesweng.", question: "Nka berekisa jang Recycle My Robot go ngwana wa me?" },
      ],
      dbe: [
        { title: "Melawana le CAPS", summary: "Kamano ya ditiro tsa ECDcoding le melawana ya Lefapha la Thuto ya Motheo le CAPS mo dikeregeng tsa ntlha.", question: "ECDcoding e tsamaisana jang le melawana ya DBE le CAPS mo banneng?" },
      ],
      maths: [
        { title: "Tsamaiso ya Motshameko", summary: "Loisenyetsa ngwana dipalo ka motshameko, go batlisisa le go ithuta ka didiriswa tsa diatla pele ga mokgwa wa go kwala.", question: "Nka dirisa jang tsamaiso ya motshameko go ruta ngwana wa me dipalo?" },
        { title: "Tlhabololo ya Kutlwisiso ya Dipalo", summary: "Dirisa ditemogo tsa 1–10 go buisana ka bokgoni le tiro e e latelang, e seng jaaka tlhatlhobo ya bolwetse.", question: "Nka tlhaloganya jang Play Index le Number Sense Index le go rulaganya tsela e e yang pele?" },
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
      library: [
        "Ke thuto efe ya Learning the Basics e e siametseng ngwana wa me?",
        "Verbal Testing Space e dira jang?",
        "Nka fitlhela Knowledge Base Carousel kae?",
      ],
      flo: [
        "Learner Play Index ke eng mme nka e tlhoma jang?",
        "Dipego tsa 04–05 le 06–07 di farologana jang?",
        "Pego ya FLC e balwa jang?",
      ],
      behaviour: [
        "Ke dikgato dife tsa kgolo tse ke tshwanetseng go di lebelela mo dingwageng tsa ngwana wa me?",
        "Nka tlhaloganya jang botho le boitshwaro jwa ngwana wa me?",
        "Nka tshegetsa jang mekgwa e e siameng ya go ja le go robala?",
        "A go fetofetoga ga maikutlo go tlwaelegile mo dingwageng tsa ngwana wa me?",
        "Nka nonotsha jang kamano ya me le ngwana wa me?",
        "Nka itse jang gore ngwana wa me o siametse go simolola sekolo?",
        "A mefuta ya mmele e ama kgolo ya ngwana?",
      ],
      ecology: [
        "Dinane tsa Ikoekelo ya Selegae ke eng?",
        "Ditshwantsho tsa Benchmark le Inter-Play di dira jang?",
        "Ikoekelo ya selegae e aga kitso efe ya mafatshe?",
      ],
      coding: [
        "Ke dithuto dife tsa khouto mo 04–07 le 08–12?",
        "Blockly kgotsa Scratch e thusa ngwana jang go akanya?",
        "Nka berekisa jang Recycle My Robot?",
      ],
      dbe: [
        "A ECDcoding e latela thutopoelelo ya CAPS?",
        "Porojeke e lokisetsa ngwana jang Grade R le Grade 1?",
        "Nka ithuta kae gontlhe ka melawana ya DBE ya bongwana jwa thuto?",
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
    },
  },
} as const;

const TOPIC_ORDER: CopilotTopic[] = ["library", "maths", "flo", "behaviour", "ecology", "coding", "dbe"];


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
  const [displayedTopic, setDisplayedTopic] = useState<CopilotTopic>("behaviour");
  const [expandedTopic, setExpandedTopic] = useState<CopilotTopic | null>(null);
  const [attachment, setAttachment] = useState<{ name: string; text: string } | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { isAdmin } = useIsAdmin();
  // Admins are never capped, even while their session is still loading.
  const isGuest = !isAdmin && !authLoading && !user;
  const guest = useGuestAiCredits(isGuest);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
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

  const copy = COPILOT_COPY[language] ?? COPILOT_COPY.en;

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
    setMessages((prev) => [...prev, { role: "assistant", content: "", topic }]);

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
              updated[updated.length - 1] = { role: "assistant", content: assistantText, topic };
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

  const sendMessage = useCallback(async (text: string, fromGuide = false) => {
    if ((!text.trim() && !attachment) || isLoading) return;

    // Visitors: 1 free typed question per day (sub-topic overviews don't count)
    if (isGuest && !fromGuide) {
      if (!guest.canAsk) {
        setPaywallOpen(true);
        return;
      }
      guest.registerQuestion();
    }


    const content = attachment
      ? `${text.trim()}\n\n[Attached file: ${attachment.name}]\n${attachment.text}`.trim()
      : text;
    const userMsg: Message = { role: "user", content, topic };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setExpandedTopic(null); // collapse topic list so the chat (and answer) is visible
    setInput("");
    setAttachment(null);
    setIsLoading(true);

    try {
      await streamChat(newMessages, context);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(errMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: `Sorry, I encountered an error: ${errMsg}`, topic }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, context, isLoading, streamChat, attachment, isGuest, guest, topic]);

  // Rotate which single topic is visible in the picker (previous / next).
  const rotateTopic = useCallback((dir: 1 | -1) => {
    setDisplayedTopic((current) => {
      const idx = TOPIC_ORDER.indexOf(current);
      return TOPIC_ORDER[(idx + dir + TOPIC_ORDER.length) % TOPIC_ORDER.length];
    });
    setExpandedTopic(null); // user must click the rotated topic to open its sub-list
  }, []);

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
    recognition.lang = LANGUAGES.find((l) => l.code === language)?.voiceLang ?? "en-ZA";
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
    <div className={`fixed ${hideLauncher ? "bottom-24" : "bottom-6"} left-3 z-50 flex flex-col items-start gap-3 sm:left-6`}>
      {/* Chat Window */}
      {isOpen && (
        <Card
          className={`w-[min(38rem,calc(100vw-1.5rem))] overflow-hidden border border-primary/20 bg-card shadow-2xl transition-all duration-300 sm:w-[min(38rem,calc(100vw-3rem))] ${
            isMinimized ? "h-14" : "h-[min(700px,calc(100vh-7rem))]"
          } flex flex-col`}
        >
          {/* Header */}
          <CardHeader className="flex-shrink-0 rounded-t-lg bg-primary px-4 py-4 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-orange-400 rounded-full border border-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-base font-bold leading-none">ECD AI</p>
                  {context && (
                    <p className="mt-1 text-sm text-primary-foreground/80">
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
              <div className="mt-2">
                <Select value={language} onValueChange={(v) => setLanguage(v as CopilotLanguage)}>
                  <SelectTrigger className="h-12 w-full border-primary-foreground/30 bg-primary-foreground/10 px-4 text-sm text-primary-foreground hover:bg-primary-foreground/20">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l.code} value={l.code} className="text-xs">
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardHeader>

          {!isMinimized && (
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Rotating topic picker: one topic at a time, rotated with arrows. */}
              <div className="flex-shrink-0 border-b border-border bg-muted/40 px-3 py-3">
                <div aria-label="ECD AI topic guides">
                  <div className="flex items-stretch gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Previous topic"
                      onClick={() => rotateTopic(-1)}
                      className="h-12 w-10 shrink-0 rounded-md bg-muted text-foreground hover:bg-muted/80"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      aria-expanded={expandedTopic === displayedTopic}
                      onClick={() => {
                        setTopic(displayedTopic);
                        setExpandedTopic((current) => (current === displayedTopic ? null : displayedTopic));
                      }}
                      className={`h-12 flex-1 justify-between rounded-md px-3 text-sm ${topic === displayedTopic ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"}`}
                    >
                      {copy.topicLabels[displayedTopic]}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expandedTopic === displayedTopic ? "rotate-180" : ""}`} />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Next topic"
                      onClick={() => rotateTopic(1)}
                      className="h-12 w-10 shrink-0 rounded-md bg-muted text-foreground hover:bg-muted/80"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  {expandedTopic === displayedTopic && (
                    <div className="mt-2 max-h-48 space-y-1 overflow-y-auto rounded-md border border-border p-1.5">
                      {copy.topicGuides[displayedTopic].map((guide) => (
                        <Button
                          key={guide.title}
                          type="button"
                          variant="ghost"
                          onClick={() => sendMessage(guide.question, true)}
                          disabled={isLoading}
                          className="h-auto w-full items-start justify-start whitespace-normal rounded px-2 py-2 text-left"
                          title={copy.overviewAction}
                        >
                          <span className="block">
                            <span className="block text-[11px] font-semibold text-foreground">{guide.title}</span>
                            <span className="mt-0.5 block text-[10px] font-normal leading-snug text-muted-foreground">{guide.summary}</span>
                            <span className="mt-1 block text-[10px] font-semibold text-primary">{copy.overviewAction} →</span>
                          </span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Messages */}
              <Conversation className="bg-card">
                <ConversationContent className="gap-3 p-4">
                {!messages.some((m) => !m.topic || m.topic === displayedTopic) ? (
                    <div className="space-y-4">
                     <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">{copy.welcomeTitle}</p>
                      <p>{copy.welcome}</p>
                    </div>
                    <p className="text-xs text-muted-foreground px-1">
                      {copy.tryAsking} <span className="font-medium text-foreground">{copy.topicLabels[displayedTopic]}</span>
                    </p>
                  </div>

                ) : (
                  messages.map((msg, i) => (msg.topic && msg.topic !== displayedTopic) ? null : (
                    <AiMessage
                      key={i}
                      from={msg.role}
                    >
                      <MessageContent className={msg.role === "user" ? "bg-primary text-primary-foreground" : undefined}>
                        {msg.content ? <MessageResponse>{msg.content}</MessageResponse> : (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            {copy.thinking}
                          </span>
                        )}
                      </MessageContent>
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
                    </AiMessage>
                  ))
                )}
                  <div ref={messagesEndRef} />
                </ConversationContent>
                <ConversationScrollButton className="bottom-2" />
              </Conversation>

              {/* Input */}
              <div className="space-y-2 border-t border-border bg-muted/40 p-3">
                {attachment && (
                  <div className="flex items-center gap-2 text-xs bg-muted rounded-md px-2 py-1">
                    <Paperclip className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate flex-1">{attachment.name}</span>
                    <button aria-label="Remove attachment" onClick={() => setAttachment(null)}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.csv,.json,text/plain,application/json"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <PromptInput
                  onSubmit={() => sendMessage(input)}
                  className="rounded-md border-border bg-card shadow-none"
                >
                  <PromptInputTextarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? copy.listening : copy.placeholder}
                    className="min-h-12 text-sm"
                    disabled={isLoading}
                  />
                  <PromptInputFooter>
                    <PromptInputTools>
                      <PromptInputButton
                        aria-label="Attach file"
                        tooltip="Attach text file"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                      >
                        <Paperclip className="h-4 w-4" />
                      </PromptInputButton>
                      <PromptInputButton
                        aria-label={isListening ? "Stop voice input" : "Start voice input"}
                        tooltip={isListening ? "Stop voice input" : "Start voice input"}
                        onClick={toggleListening}
                        disabled={isLoading}
                        className={isListening ? "bg-primary text-primary-foreground" : undefined}
                      >
                        {isListening ? <MicOff className="h-4 w-4 animate-pulse" /> : <Mic className="h-4 w-4" />}
                      </PromptInputButton>
                    </PromptInputTools>
                    <PromptInputSubmit
                      aria-label="Send message"
                      status={isLoading ? "streaming" : "ready"}
                      disabled={isLoading || (!input.trim() && !attachment)}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </PromptInputSubmit>
                  </PromptInputFooter>
                </PromptInput>
                {isGuest && (
                  <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                    <span className={guest.isLowOnCredits ? "font-semibold text-destructive" : undefined}>
                      {guest.freeQuestionsLeft > 0
                        ? "1 free question today"
                        : guest.credits > 0
                          ? `${guest.credits} credits left (1 per minute)${
                              guest.creditsExpireAt
                                ? ` · expires ${guest.creditsExpireAt.toLocaleDateString()}`
                                : ""
                            }`
                          : "Free question used today — back tomorrow"}
                    </span>
                    {guest.freeQuestionsLeft === 0 && (
                      <button
                        type="button"
                        onClick={() => setPaywallOpen(true)}
                        className="font-semibold text-primary underline whitespace-nowrap"
                      >
                        About credits
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
