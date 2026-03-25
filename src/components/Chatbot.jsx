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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
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
        className="animate-fade-in glass"
        style={{
          position: 'fixed',
          bottom: '2.5rem',
          right: '2.5rem',
          height: '56px',
          padding: '0 1.5rem',
          borderRadius: '28px',
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 100,
          background: 'var(--accent-gradient)',
          border: 'none',
          boxShadow: 'var(--glass-shadow)',
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
      >
        <MessageSquare size={24} />
        <span style={{ fontWeight: '600', fontSize: '1rem', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
          Chat with Uyen
        </span>
      </button>

      {isOpen && (
        <div className="glass animate-fade-in" style={{
          position: 'fixed',
          bottom: '2.5rem',
          right: '2.5rem',
          width: '360px',
          height: '600px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: 'var(--glass-shadow)',
        }}>
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--glass-bg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
              <div style={{ background: 'var(--accent-gradient)', padding: '6px', borderRadius: '10px', display: 'flex' }}>
                <Bot size={20} color="#fff" />
              </div>
              {portfolioData.personal.name.split(' ')[0]}'s Assistant
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '32px', height: '32px', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--glass-border)'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'var(--bg-secondary)'; }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            background: 'var(--bg-secondary)'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} className="animate-fade-in" style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-end',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: msg.role === 'user' ? 'var(--text-primary)' : 'var(--accent-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: 'white'
                }}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div style={{
                  padding: '0.875rem 1.125rem',
                  borderRadius: '16px',
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                  background: msg.role === 'user' ? 'var(--bg-color)' : 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  maxWidth: '80%',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  color: 'var(--text-primary)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', paddingLeft: '2.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} style={{
            padding: '1rem',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            gap: '0.75rem',
            background: 'var(--glass-bg)',
          }}>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flexGrow: 1,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '0.875rem 1rem',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)'
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent-color)'; e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.02)'; }}
            />
            <button type="submit" disabled={!input.trim()} style={{
              background: 'var(--accent-color)',
              border: 'none',
              borderRadius: '12px',
              width: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              opacity: input.trim() ? 1 : 0.5,
              transition: 'all 0.2s',
              boxShadow: input.trim() ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
            }}
            onMouseOver={(e) => { if(input.trim()) e.currentTarget.style.filter = 'brightness(1.1)'; }}
            onMouseOut={(e) => { if(input.trim()) e.currentTarget.style.filter = 'brightness(1)'; }}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
