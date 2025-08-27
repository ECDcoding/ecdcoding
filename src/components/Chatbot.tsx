import { useState } from 'react';
import { useConversation } from '@11labs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'All ECD Employers seeking to hire tech teachers are welcome to talk to us... It is however important to register as a Parent, and ECD School Manager, as well as a Tech Teacher candidate looking for employment.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [useVoiceMode, setUseVoiceMode] = useState(false);

  const conversation = useConversation({
    onConnect: () => console.log('Voice agent connected'),
    onDisconnect: () => console.log('Voice agent disconnected'),
    onError: (error) => console.error('Voice agent error:', error),
    onMessage: (message) => {
      // Add voice messages to the chat
      setMessages(prev => [...prev, { role: 'bot', content: message.message }]);
    }
  });

  const languages = [
    "English", "Afrikaans", "isiZulu", "isiXhosa", "isiSwati", 
    "Setswana", "Sepedi", "Xitsonga", "Venda"
  ];

  const translations = {
    "English": {
      notice: "All ECD Employers seeking to hire tech teachers are welcome to talk to us... It is however important to register as a Parent, and ECD School Manager, as well as a Tech Teacher candidate looking for employment.",
      jobResponse: "I can help you find tech teacher opportunities! We have positions available for coding instructors, digital literacy teachers, and educational technology specialists. Would you like me to provide you with a job application form?",
      formResponse: "I can provide application forms for tech teachers, parents, and ECD managers. Which type of form do you need? You can also register directly on our platform.",
      adviceResponse: "I provide guidance for various stakeholders: ECD managers can get help with technology integration, parents can learn about digital learning benefits, and tech teachers can get career advice. What specific area interests you?",
      defaultResponse: "Thank you for your message! I specialize in tech teacher job opportunities, application processes, and educational technology advice. Please let me know how I can help you with any of these areas.",
      placeholder: "Type your message..."
    },
    "Afrikaans": {
      notice: "Alle VKO Werkgewers wat tegnologie onderwysers wil huur is welkom om met ons te praat... Dit is egter belangrik om te registreer as 'n Ouer, en VKO Skool Bestuurder, asook 'n Tegnologie Onderwyser kandidaat wat werk soek.",
      jobResponse: "Ek kan jou help om tegnologie onderwyser geleenthede te vind! Ons het posisies beskikbaar vir kodering instrukteurs, digitale geletterdheid onderwysers, en opvoedkundige tegnologie spesialiste. Wil jy hê ek moet 'n werk aansoek vorm vir jou voorsien?",
      formResponse: "Ek kan aansoek vorms voorsien vir tegnologie onderwysers, ouers, en VKO bestuurders. Watter tipe vorm benodig jy? Jy kan ook direk op ons platform registreer.",
      adviceResponse: "Ek verskaf leiding vir verskeie belanghebbendes: VKO bestuurders kan hulp kry met tegnologie integrasie, ouers kan leer oor digitale leer voordele, en tegnologie onderwysers kan loopbaan advies kry. Watter spesifieke area interesseer jou?",
      defaultResponse: "Dankie vir jou boodskap! Ek spesialiseer in tegnologie onderwyser werk geleenthede, aansoek prosesse, en opvoedkundige tegnologie advies. Laat my asseblief weet hoe ek jou kan help met enige van hierdie areas.",
      placeholder: "Tik jou boodskap..."
    },
    "isiZulu": {
      notice: "Bonke abaqashi be-ECD abafuna ukuqasha othisha bobuchwepheshe bamukelekile ukuthi bakhulume nathi... Kodwa kubalulekile ukubhalisa njengomzali, nePhahlwa leSikole se-ECD, kanye nomuntu ofuna umsebenzi wokufundisa ubuchwepheshe.",
      jobResponse: "Ngingakusiza ukuthola amathuba wokufundisa ubuchwepheshe! Sinezindawo ezikhona zabafundisi bokuhlela amakhodi, othisha bokufunda kudijithali, kanye nochwepheshe wezemfundo nobuchwepheshe. Ungathanda ukuthi nginikeze ifomu lesicelo somsebenzi?",
      formResponse: "Nginganikezela ngamafomu esicelo sothisha bobuchwepheshe, abazali, nabaphathi be-ECD. Hlobo luni lwefomu olidingayo? Ungakwazi futhi ukubhalisa ngqo ku-platform yethu.",
      adviceResponse: "Nginikeza isiqondiso kwababandakanyeka abahlukahlukene: abaphathi be-ECD bangathola usizo ngokuhlanganisa ubuchwepheshe, abazali bangafunda ngokuthi ukufunda kudijithali kunenzuzo, kanti othisha bobuchwepheshe bangathola izeluleko ngemisebenzi. Yiliphi indawo ethile ekukuthakazelayo?",
      defaultResponse: "Ngiyabonga ngomlayezo wakho! Ngichwepheshe emtholampilo wothisha bobuchwepheshe, izinqubo zokucela, nezeluleko zobuchwepheshe bezemfundo. Ake ungazise ukuthi ngingakusiza kanjani kwenye yalezi zindawo.",
      placeholder: "Thayipha umlayezo wakho..."
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user', content: inputMessage },
      { role: 'bot', content: getBotResponse(inputMessage) }
    ];

    setMessages(newMessages);
    setInputMessage('');
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    const currentTranslations = translations[selectedLanguage as keyof typeof translations] || translations.English;
    
    if (lowerMessage.includes('job') || lowerMessage.includes('teacher') || lowerMessage.includes('werk') || lowerMessage.includes('umsebenzi')) {
      return currentTranslations.jobResponse;
    } else if (lowerMessage.includes('form') || lowerMessage.includes('application') || lowerMessage.includes('aansoek') || lowerMessage.includes('isicelo')) {
      return currentTranslations.formResponse;
    } else if (lowerMessage.includes('advice') || lowerMessage.includes('help') || lowerMessage.includes('hulp') || lowerMessage.includes('usizo')) {
      return currentTranslations.adviceResponse;
    } else {
      return currentTranslations.defaultResponse;
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    const currentTranslations = translations[language as keyof typeof translations] || translations.English;
    setMessages([
      { role: 'bot', content: currentTranslations.notice }
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleVoiceMode = async () => {
    if (useVoiceMode) {
      await conversation.endSession();
      setUseVoiceMode(false);
    } else {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        await conversation.startSession({
          agentId: 'agent_6301k2pnhhvyf5dak5nh4bnzxpez'
        });
        setUseVoiceMode(true);
      } catch (error) {
        console.error('Failed to start voice conversation:', error);
        alert('Please allow microphone access to use voice mode.');
      }
    }
  };

  return (
    <>
      {/* Chat Button with Waving Hand */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-lime-500 hover:bg-lime-600 shadow-lg z-50 group"
        size="icon"
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6 text-white" />
          <div className="absolute -top-1 -right-1 text-lg animate-[wave_1s_ease-in-out_infinite]">
            👋
          </div>
        </div>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Important Notice</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-4">
            {/* Language Dropdown and Voice Toggle */}
            <div className="mb-4 space-y-2">
              <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full bg-lime-500 text-black border-lime-600 hover:bg-lime-600">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  {languages.map((language) => (
                    <SelectItem key={language} value={language} className="hover:bg-gray-100">
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                onClick={toggleVoiceMode}
                variant={useVoiceMode ? "destructive" : "secondary"}
                className="w-full"
                disabled={conversation.status === 'connecting'}
              >
                {useVoiceMode ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    End Voice Chat
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Start Voice Chat
                  </>
                )}
              </Button>
              
              {useVoiceMode && (
                <div className="text-center text-sm text-muted-foreground">
                  {conversation.isSpeaking ? '🗣️ Agent is speaking...' : '🎤 Listening...'}
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input - Only show when not in voice mode */}
            {!useVoiceMode && (
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={(translations[selectedLanguage as keyof typeof translations] || translations.English).placeholder}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;