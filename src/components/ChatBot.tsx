'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

// Static responses for the chatbot
const staticResponses: Record<string, string> = {
  "What are your main skills?": 
    "I specialize in Next.js, React, and TypeScript for building performant web applications. On the backend, I work with Node.js, PostgreSQL, and have experience with both REST and GraphQL APIs. I'm also proficient in cloud infrastructure (AWS, Vercel) and CI/CD pipelines.",
  
  "Tell me about your experience": 
    "I have 5+ years of experience building production applications. I've led frontend architecture decisions, mentored junior developers, and delivered projects from concept to deployment. My recent work focuses on server components, edge computing, and optimizing Core Web Vitals.",
  
  "What projects have you worked on?": 
    "I've built e-commerce platforms handling thousands of daily transactions, real-time collaboration tools, and developer tooling. I'm passionate about DX and have contributed to open-source projects in the React ecosystem.",
};

const suggestionQuestions = [
  "What are your main skills?",
  "Tell me about your experience",
  "What projects have you worked on?",
];

const GREETING = "Hi! I'm a senior full stack developer passionate about building performant, scalable web applications with modern technologies. Feel free to ask me anything!";

const FALLBACK_RESPONSE = "That's a great question! Feel free to ask about my skills, experience, or projects using the suggestions above, or type your own question.";

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with greeting
  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true);
      typeMessage(GREETING, true);
    }
  }, [hasStarted]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, displayedText]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const typeMessage = (text: string, isGreeting = false) => {
    setIsTyping(true);
    setDisplayedText('');
    
    let index = 0;
    typingIntervalRef.current = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'assistant', content: text }]);
        setDisplayedText('');
      }
    }, 20);
  };

  const getResponse = (question: string): string => {
    // Check for exact match first
    if (staticResponses[question]) {
      return staticResponses[question];
    }
    
    // Check for partial match
    const lowerQuestion = question.toLowerCase();
    for (const [key, value] of Object.entries(staticResponses)) {
      if (lowerQuestion.includes(key.toLowerCase().split(' ').slice(0, 2).join(' '))) {
        return value;
      }
    }
    
    return FALLBACK_RESPONSE;
  };

  const sendMessage = (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || isTyping) return;

    const userMessage = { role: 'user' as const, content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowSuggestions(false);

    // Get static response and type it out
    const response = getResponse(text);
    setTimeout(() => {
      typeMessage(response);
    }, 300);
  };

  const handleSuggestionClick = (question: string) => {
    sendMessage(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full">
      <div className="h-[500px] overflow-y-auto mb-4 p-6 border rounded-2xl transition-all backdrop-blur-xl border-border/50 bg-card/60">
        {/* Messages */}
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-4 rounded-2xl max-w-[85%] transition-all ${
              message.role === 'user' 
                ? 'bg-accent text-accent-foreground' 
                : 'bg-muted/80 text-foreground border border-border/50'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        
        {/* Typing animation */}
        {isTyping && displayedText && (
          <div className="text-left mb-4">
            <div className="inline-block p-4 rounded-2xl max-w-[85%] bg-muted/80 text-foreground border border-border/50">
              {displayedText}
              <span className="inline-block w-0.5 h-4 ml-0.5 bg-foreground animate-pulse" />
            </div>
          </div>
        )}

        {/* Suggestion Questions - shown after greeting, before first user message */}
        {showSuggestions && messages.length > 0 && !isTyping && (
          <div className="mt-6 space-y-3">
            {suggestionQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(question)}
                className="block w-full text-left p-4 rounded-xl border border-border/50 bg-background/50 text-muted-foreground hover:bg-hover hover:border-border-hover hover:text-foreground transition-all duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 p-4 border rounded-xl transition-all backdrop-blur-sm focus:outline-none bg-input/80 text-foreground border-input-border/50 placeholder-muted-foreground focus:border-input-focus"
          disabled={isTyping}
        />
        <button
          onClick={() => sendMessage()}
          disabled={isTyping || !input.trim()}
          className="px-6 py-4 rounded-xl transition-all backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed bg-accent text-accent-foreground hover:bg-accent-hover"
        >
          Send
        </button>
      </div>
    </div>
  );
}
