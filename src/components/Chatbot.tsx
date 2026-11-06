import { useState, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MessageCircle, X, Mic, MicOff, Send } from 'lucide-react';

interface ChatbotProps {
  onVoiceModeChange?: (isActive: boolean) => void;
  /** Hide the built-in floating launcher (when an external launcher controls it) */
  hideLauncher?: boolean;
  /** Controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Chatbot = ({ onVoiceModeChange, hideLauncher, open, onOpenChange }: ChatbotProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setIsOpen = (value: boolean) => {
    onOpenChange ? onOpenChange(value) : setInternalOpen(value);
  };
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; content: string }[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const [textOnlyMode, setTextOnlyMode] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [useVoiceMode, setUseVoiceMode] = useState(false);

  // Check if terms were previously accepted
  useEffect(() => {
    const accepted = localStorage.getItem('chatbot-terms-accepted');
    if (accepted === 'true') {
      setTermsAccepted(true);
    }
  }, []);

  // When opened from an external launcher, ask for terms first
  useEffect(() => {
    if (isOpen && !termsAccepted) {
      setShowTerms(true);
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, termsAccepted]);

  const handleChatOpen = () => {
    if (!termsAccepted) {
      setShowTerms(true);
    } else {
      setIsOpen(true);
    }
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    localStorage.setItem('chatbot-terms-accepted', 'true');
    setShowTerms(false);
    setIsOpen(true);
  };

  const conversation = useConversation({
    onConnect: () => {
      setUseVoiceMode(true);
      setIsConnecting(false);
      onVoiceModeChange?.(true);
    },
    onDisconnect: (details) => {
      setUseVoiceMode(false);
      setIsConnecting(false);
      onVoiceModeChange?.(false);
      if (details.reason === 'error') {
        setVoiceError(details.message || 'Reception disconnected. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Voice agent error:', error);
      setUseVoiceMode(false);
      setIsConnecting(false);
      onVoiceModeChange?.(false);
      setVoiceError(typeof error === 'string' ? error : 'Reception could not connect. Please try again.');
    },
    onMessage: (message) => {
      // Add voice messages to the chat - both transcriptions and responses
      if (message.message && message.message.trim()) {
        setMessages(prev => [...prev, { role: message.source === 'user' ? 'user' : 'bot', content: message.message }]);
      }
    }
  });

  useEffect(() => {
    if (!isOpen) {
      void conversation.endSession().catch(() => undefined);
      setUseVoiceMode(false);
      onVoiceModeChange?.(false);
    }
    // The SDK owns session cleanup; closing Reception must also release the mic.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const languages = [
    "English", "Afrikaans", "isiZulu", "isiXhosa", "isiSwati", 
    "Setswana", "Sepedi", "Xitsonga", "Venda"
  ];

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: inputMessage }]);
      
      // Send message to voice agent if voice mode is active
      if (useVoiceMode && conversation.status === 'connected') {
        try {
          // Send the text message to the voice agent
          await conversation.sendUserMessage(inputMessage);
        } catch (error) {
          console.error('Failed to send message to voice agent:', error);
        }
      }
      
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };


  const toggleVoiceMode = async () => {
    if (useVoiceMode) {
      try {
        await conversation.endSession();
      } finally {
        setUseVoiceMode(false);
        onVoiceModeChange?.(false);
      }
    } else {
      setVoiceError('');
      setIsConnecting(true);
      try {
        // Clear any existing messages when starting voice mode
        setMessages([]);
        const agentId = 'agent_6301k2pnhhvyf5dak5nh4bnzxpez';
        let micReady = false;
        try {
          if (navigator.mediaDevices?.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach((t) => t.stop());
            micReady = true;
          }
        } catch {
          micReady = false;
        }
        setTextOnlyMode(!micReady);
        // Voice chat as usual; if the mic is blocked, still let the user chat by typing.
        await conversation.startSession({
          agentId,
          connectionType: micReady ? 'webrtc' : 'websocket',
          textOnly: !micReady,
          // Use the agent's configured greeting and reception knowledge base.
          // This public agent rejects client-side prompt and greeting overrides.
        });
      } catch (error) {
        console.error('Failed to start voice conversation:', error);
        setUseVoiceMode(false);
        onVoiceModeChange?.(false);
        setVoiceError(error instanceof DOMException && error.name === 'NotAllowedError'
          ? 'Please allow microphone access to speak with Reception.'
          : error instanceof Error ? error.message : 'Reception could not connect. Please try again.');
      } finally {
        setIsConnecting(false);
      }
    }
  };

  return (
    <>
      {/* Chat Button with Waving Hand */}
      {!hideLauncher && (
      <Button
        onClick={handleChatOpen}
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
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] h-96 shadow-xl z-50 flex flex-col overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-32 h-8 bg-lime-500 text-black border-lime-600 hover:bg-lime-600">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-[60]">
                  {languages.map((language) => (
                    <SelectItem key={language} value={language} className="hover:bg-gray-100">
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Close Reception"
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="min-h-0 flex-1 flex flex-col p-4">
            {/* Voice Toggle */}
            <div className="mb-4">
              <Button
                onClick={toggleVoiceMode}
                variant={useVoiceMode ? "destructive" : "secondary"}
                className="w-full"
                disabled={isConnecting || conversation.status === 'connecting'}
              >
                {useVoiceMode ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    End Voice Chat
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    {isConnecting ? 'Connecting...' : 'Start Voice Chat'}
                  </>
                )}
              </Button>
              {!useVoiceMode && !isConnecting && !voiceError && (
                <p className="mt-2 text-center text-sm text-muted-foreground">Allow the microphone to talk, or skip it and type instead.</p>
              )}
              {voiceError && <p role="alert" className="mt-2 text-sm text-destructive">{voiceError}</p>}
              
              {useVoiceMode && (
                <div className="text-center text-sm text-muted-foreground">
                  {textOnlyMode ? 'Microphone off — type your message below.' : conversation.isSpeaking ? '🗣️ Agent is speaking...' : '🎤 Listening...'}
                </div>
              )}
            </div>

            {/* Messages - Now visible in voice mode too */}
            <div className="min-h-0 flex-1 overflow-y-auto space-y-3 mb-4">
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

            {/* Text Input */}
            <div className="flex shrink-0 gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={!useVoiceMode}
                className="flex-1"
              />
              <Button onClick={sendMessage} size="icon" variant="default" disabled={!useVoiceMode || !inputMessage.trim()} aria-label="Send to Reception">
                <Send className="h-4 w-4" />
              </Button>
            </div>

          </CardContent>
        </Card>
      )}

      {/* Terms and Conditions Dialog */}
      <Dialog open={showTerms} onOpenChange={() => {}}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Terms and Conditions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              By clicking "Accept," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as described in the Privacy Policy. If you do not wish to have your conversations recorded, please refrain from using this service.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowTerms(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Decline
              </Button>
              <Button
                onClick={handleAcceptTerms}
                className="bg-lime-500 hover:bg-lime-600 text-white"
              >
                Accept
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;