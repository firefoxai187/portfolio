import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi! I'm ${portfolioData.personal.name}'s AI assistant. Ask me anything about their experience or projects!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I am currently in demo mode! To fully activate my LLM brain, please create a `.env` file in the project root and add `VITE_GEMINI_API_KEY=your_key`." 
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Context about you: ${JSON.stringify(portfolioData)}. User says: ${userMessage}. Answer briefly as if you are the user representing themselves to a recruiter.` }]
          }]
        })
      });
      const data = await response.json();
      const textResponse = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { role: 'assistant', content: textResponse }]);
    } catch(err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Oops, I encountered an error connecting to my LLM provider. Please check the API key!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="glass animate-float"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          border: '1px solid var(--accent-glow)',
          cursor: 'pointer',
          zIndex: 100,
          background: 'var(--accent-gradient)'
        }}
      >
        <MessageSquare size={28} />
      </button>

      {isOpen && (
        <div className="glass animate-fade-in" style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '360px',
          height: '550px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          background: 'rgba(10, 10, 10, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <div style={{
            padding: '1.25rem',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--glass-bg)',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold' }}>
              <Bot size={24} color="var(--accent-color)" />
              {portfolioData.personal.name}'s AI
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: msg.role === 'user' ? 'var(--glass-bg)' : 'var(--accent-glow)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div style={{
                  padding: '0.875rem 1.125rem',
                  borderRadius: '16px',
                  borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                  borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                  background: msg.role === 'user' ? 'var(--accent-gradient)' : 'var(--glass-bg)',
                  maxWidth: '75%',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  color: '#fff'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Bot size={18} color="var(--text-secondary)" />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} style={{
            padding: '1.25rem',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            gap: '0.75rem',
            background: 'var(--glass-bg)',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px'
          }}>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              style={{
                flexGrow: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                padding: '0.875rem',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '0.95rem'
              }}
              onFocus={(e) => e.target.style.border = '1px solid var(--accent-color)'}
              onBlur={(e) => e.target.style.border = '1px solid var(--glass-border)'}
            />
            <button type="submit" disabled={!input.trim()} style={{
              background: 'var(--accent-gradient)',
              border: 'none',
              borderRadius: '8px',
              width: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              opacity: input.trim() ? 1 : 0.5
            }}>
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
