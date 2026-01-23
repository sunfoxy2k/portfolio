'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6 text-foreground">Ask me about my background</h2>
      
      <div className="h-64 overflow-y-auto mb-4 p-4 border rounded-lg transition-all backdrop-blur-xl border-border/50 bg-card/80">
        {messages.length === 0 && (
          <p className="text-center transition-colors text-muted-foreground">
            Start a conversation by asking about my experience, skills, or projects.
          </p>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md transition-all backdrop-blur-sm ${
              message.role === 'user' 
                ? 'bg-accent/80 text-accent-foreground' 
                : 'bg-muted/80 text-foreground border border-border/50'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="text-left">
            <div className="inline-block p-3 rounded-lg border transition-all backdrop-blur-sm bg-muted/80 text-muted-foreground border-border/50">
              Typing...
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about my professional background..."
          className="flex-1 p-3 border rounded-lg resize-none transition-all backdrop-blur-sm focus:outline-none bg-input/80 text-foreground border-input-border/50 placeholder-muted-foreground focus:border-input-focus"
          rows={2}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 rounded-lg transition-all backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed bg-accent/80 text-accent-foreground hover:bg-accent/90"
        >
          Send
        </button>
      </div>
    </div>
  );
}
