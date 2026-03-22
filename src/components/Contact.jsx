import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="container animate-fade-in" style={{ padding: '6rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get in Touch</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Have a project in mind or want to collaborate? Feel free to reach out. I'll get back to you as soon as possible.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '3rem',
        alignItems: 'start'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass card animate-hover" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
            <div style={{ 
              width: '50px', height: '50px', borderRadius: '50%', 
              background: 'var(--accent-glow)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-color)', flexShrink: 0
            }}>
              <Mail size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Email Me</h3>
              <a href={`mailto:${portfolioData.personal.email}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--accent-color)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                {portfolioData.personal.email}
              </a>
            </div>
          </div>
          
          <div className="glass card animate-hover" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
            <div style={{ 
              width: '50px', height: '50px', borderRadius: '50%', 
              background: 'var(--accent-glow)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-color)', flexShrink: 0
            }}>
              <MapPin size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Location</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Remote / Global
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Name</label>
            <input 
              type="text" 
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%', padding: '1rem', borderRadius: '8px',
                background: 'var(--bg-color)', border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s'
              }}
              onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.borderColor = 'var(--accent-color)'; }}
              onBlur={(e) => { e.target.style.background = 'var(--bg-color)'; e.target.style.borderColor = 'var(--glass-border)'; }}
            />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
            <input 
              type="email" 
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                width: '100%', padding: '1rem', borderRadius: '8px',
                background: 'var(--bg-color)', border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s'
              }}
              onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.borderColor = 'var(--accent-color)'; }}
              onBlur={(e) => { e.target.style.background = 'var(--bg-color)'; e.target.style.borderColor = 'var(--glass-border)'; }}
            />
          </div>
          <div>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Message</label>
            <textarea 
              id="message"
              required
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              style={{
                width: '100%', padding: '1rem', borderRadius: '8px',
                background: 'var(--bg-color)', border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s', resize: 'vertical'
              }}
              onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.borderColor = 'var(--accent-color)'; }}
              onBlur={(e) => { e.target.style.background = 'var(--bg-color)'; e.target.style.borderColor = 'var(--glass-border)'; }}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', 
              marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer',
              border: 'none', padding: '1rem 2rem', borderRadius: '8px', background: 'var(--accent-gradient)',
              color: '#fff', fontSize: '1rem', fontWeight: 'bold'
            }}
          >
            {isSubmitting ? 'Sending...' : (submitted ? 'Message Sent!' : 'Send Message')}
            {!(isSubmitting || submitted) && <Send size={18} />}
          </button>
        </form>
      </div>
    </section>
  );
}
