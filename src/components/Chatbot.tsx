import { useState } from 'react';
import { useConversation } from '@11labs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, X, Mic, MicOff } from 'lucide-react';

const Chatbot = ({ onVoiceModeChange }: { onVoiceModeChange?: (isActive: boolean) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [messages, setMessages] = useState([]);
  
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

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };


  const toggleVoiceMode = async () => {
    if (useVoiceMode) {
      await conversation.endSession();
      setUseVoiceMode(false);
      onVoiceModeChange?.(false);
    } else {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        await conversation.startSession({
          agentId: 'agent_6301k2pnhhvyf5dak5nh4bnzxpez'
        });
        setUseVoiceMode(true);
        onVoiceModeChange?.(true);
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
        <Card className="fixed bottom-24 right-6 w-80 h-52 shadow-xl z-50 flex flex-col">
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

          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;