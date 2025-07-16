import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Mic, Bot, User, Loader2
} from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    type: 'bot',
    content: `Hello! I'm SwasthSetu AI Assistant. I can help you with health questions, interpret symptoms, and provide medical guidance. How can I assist you today?`,
    timestamp: new Date()
  }]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const prompt = `
You are an AI health assistant built for rural and semi-urban users in India.
A user has entered the following symptoms: "${content}".
Provide clear and non-alarming advice in Hinglish:
- 🤒 Possible Diseases
- 🩹 First-Aid Suggestions
- 🛡 Prevention Tips
- 🧑‍⚕ Doctor Advice
Keep it short, friendly and easy to understand.
`;

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        content: "Sorry! I couldn't process your symptoms right now. Please try again later.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN'; 
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
            <Bot className="w-4 h-4 mr-2" />
            AI-Powered Health Assistant
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            AI Health Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant health guidance and medical information from our AI-powered chatbot.
          </p>
        </motion.div>

        {/* Chat Window */}
        <div className="h-[600px] flex flex-col bg-white/90 backdrop-blur-sm shadow-2xl border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="border-b bg-gradient-to-r from-blue-50 to-purple-50 p-4 flex items-center">
            <Bot className="w-5 h-5 mr-2 text-blue-600" />
            DiagnoX AI Assistant
            <div className="ml-auto flex items-center text-sm text-green-600">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full mr-2"
              />
              Online
            </div>
          </div>

          {/* Scrollable Messages */}
          <div className="flex-1 overflow-y-auto p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] whitespace-pre-wrap break-words px-4 py-3 rounded-2xl shadow-md ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' ? (
                          <Bot className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        ) : (
                          <User className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                        )}
                        <div className="min-w-0 flex-1 text-sm">
                          {message.type === 'bot' ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: message.content
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\n/g, '<br />'),
                              }}
                            />
                          ) : (
                            <p>{message.content}</p>
                          )}
                          <p className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-xs px-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <div className="flex space-x-1">
                        {[0, 0.2, 0.4].map((delay, i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1.2, delay }}
                            className="w-2 h-2 bg-blue-400 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Fixed Input */}
          <div className="border-t p-4 bg-white">
            <div className="flex space-x-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your health question..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
                className="flex-1 border-2 focus:border-blue-400 px-3 py-2 rounded-md bg-white text-gray-900"
              />
              <button
                onClick={handleVoiceInput}
                disabled={isListening}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                {isListening ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => handleSendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          ⚠️ This AI assistant provides general health info only. For emergencies, consult doctors.
        </div>
      </div>
    </div>
  );
}
