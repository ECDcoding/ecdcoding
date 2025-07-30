import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'All ECD Employers seeking to hire tech teachers are welcome to talk to us... It is however important to register as a Parent, and ECD School Manager, as well as a Tech Teacher candidate looking for employment.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

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
    
    if (lowerMessage.includes('job') || lowerMessage.includes('teacher')) {
      return 'I can help you find tech teacher opportunities! We have positions available for coding instructors, digital literacy teachers, and educational technology specialists. Would you like me to provide you with a job application form?';
    } else if (lowerMessage.includes('form') || lowerMessage.includes('application')) {
      return 'I can provide application forms for tech teachers, parents, and ECD managers. Which type of form do you need? You can also register directly on our platform.';
    } else if (lowerMessage.includes('advice') || lowerMessage.includes('help')) {
      return 'I provide guidance for various stakeholders: ECD managers can get help with technology integration, parents can learn about digital learning benefits, and tech teachers can get career advice. What specific area interests you?';
    } else {
      return 'Thank you for your message! I specialize in tech teacher job opportunities, application processes, and educational technology advice. Please let me know how I can help you with any of these areas.';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button with Waving Hand */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg z-50 group"
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

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;