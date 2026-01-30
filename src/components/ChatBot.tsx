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

  const handleClear = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setIsTyping(false);
    setDisplayedText('');
    setMessages([]);
    setShowSuggestions(true);
    setInput('');
    setTimeout(() => typeMessage(GREETING, true), 0);
  };

  return (
    <div className="w-full font-mono text-sm">
      <div className="h-[500px] mb-4 flex flex-col border border-border rounded-md bg-card overflow-hidden">
        {/* Terminal header — green accent, blinking on left, Clear button */}
        <div className="shrink-0 flex items-center gap-2 border-b border-border bg-muted px-4 py-2.5">
          <span className="inline-block w-2.5 h-3.5 bg-terminal cursor-blink shrink-0" aria-hidden />
          <span className="text-terminal font-medium">Chat</span>
          <span className="flex-1" />
          <button
            type="button"
            onClick={handleClear}
            className="px-2 py-1 text-muted-foreground hover:text-terminal hover:bg-terminal/10 focus:outline-none focus:text-terminal focus:bg-terminal/10 rounded transition-colors"
            aria-label="Clear chat"
          >
            Clear
          </button>
          <span className="text-muted-foreground">~/portfolio</span>
        </div>

        {/* Messages — scrollable, terminal style */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 scroll-smooth">
          {messages.map((message, index) => (
            <div key={index} className="mb-3 text-left">
              <span className="text-terminal select-none">
                {message.role === 'user' ? '$ ' : '> '}
              </span>
              <span className="text-foreground wrap-break-word">{message.content}</span>
            </div>
          ))}

          {/* Typing animation with blinking cursor */}
          {isTyping && displayedText && (
            <div className="mb-3 text-left">
              <span className="text-terminal select-none">{'> '}</span>
              <span className="text-foreground">{displayedText}</span>
              <span className="inline-block w-2.5 h-4 ml-0.5 bg-terminal cursor-blink align-middle" />
            </div>
          )}

          {/* Suggestion commands — terminal style */}
          {showSuggestions && messages.length > 0 && !isTyping && (
            <div className="mt-4 space-y-1.5">
              {suggestionQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="block w-full text-left py-1.5 px-0 text-muted-foreground hover:text-terminal hover:bg-terminal/10 focus:outline-none focus:text-terminal focus:bg-terminal/10 rounded transition-colors"
                >
                  <span className="text-terminal select-none">$ </span>
                  {question}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Terminal prompt line — blinking left, $ green, input, Send (green hover), blinking cursor */}
        <div className="shrink-0 flex items-center gap-2 border-t border-border bg-card px-4 py-2.5">
          <span className="inline-block w-2.5 h-4 bg-terminal cursor-blink shrink-0" aria-hidden />
          <span className="text-terminal select-none">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder=""
            className="flex-1 min-w-0 bg-transparent text-foreground focus:outline-none focus:ring-0 placeholder-muted-foreground"
            disabled={isTyping}
            aria-label="Terminal input"
          />
          <button
            type="button"
            onClick={() => sendMessage()}
            disabled={isTyping || !input.trim()}
            className="shrink-0 px-3 py-1.5 text-foreground hover:text-terminal hover:bg-terminal/10 focus:outline-none focus:text-terminal focus:bg-terminal/10 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            aria-label="Send"
          >
            Send
          </button>
          <span className="inline-block w-2.5 h-4 bg-terminal cursor-blink shrink-0" aria-hidden />
        </div>
      </div>
    </div>
  );
}
