import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${portfolioData.personal.email}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSubmitted(true);
        e.target.reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '3rem',
        alignItems: 'start'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderRadius: '16px' }}>
            <a href={`mailto:${portfolioData.personal.email}`} style={{ 
              width: '56px', height: '56px', borderRadius: '14px', 
              background: 'var(--bg-color)', border: '1px solid var(--glass-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-color)', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease', textDecoration: 'none'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--accent-color)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
            >
              <Mail size={24} />
            </a>
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.25rem', color: 'var(--text-primary)' }}>Email Me</h3>
              <a href={`mailto:${portfolioData.personal.email}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.05rem' }} onMouseOver={(e) => e.target.style.color = 'var(--accent-color)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                {portfolioData.personal.email}
              </a>
            </div>
          </div>
          
          <div className="glass" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderRadius: '16px' }}>
            <div style={{ 
              width: '56px', height: '56px', borderRadius: '14px', 
              background: 'var(--bg-color)', border: '1px solid var(--glass-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-color)', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <MapPin size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.25rem', color: 'var(--text-primary)' }}>Location</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.05rem' }}>
                Remote / Global
              </p>
            </div>
          </div>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="glass" 
          style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '20px' }}
        >
          <input type="hidden" name="_subject" value="New Portfolio Message!" />
          
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              required
              style={{
                width: '100%', padding: '1rem', borderRadius: '12px',
                background: 'var(--bg-color)', border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s',
                fontSize: '1rem'
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent-color)'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              required
              style={{
                width: '100%', padding: '1rem', borderRadius: '12px',
                background: 'var(--bg-color)', border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s',
                fontSize: '1rem'
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent-color)'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <div>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>Message</label>
            <textarea 
              id="message"
              name="message"
              required
              rows="5"
              style={{
                width: '100%', padding: '1rem', borderRadius: '12px',
                background: 'var(--bg-color)', border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s', resize: 'vertical',
                fontSize: '1rem'
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent-color)'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'none'; }}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', 
              marginTop: '1rem', cursor: isSubmitting ? 'not-allowed' : 'pointer',
              border: 'none', padding: '1rem 2rem', borderRadius: '12px', background: 'var(--accent-gradient)',
              color: '#fff', fontSize: '1.05rem', fontWeight: 'bold', transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              opacity: isSubmitting ? 0.7 : 1
            }}
            onMouseOver={(e) => { if (!isSubmitting) e.currentTarget.style.filter = 'brightness(1.1)'; }}
            onMouseOut={(e) => { if (!isSubmitting) e.currentTarget.style.filter = 'brightness(1)'; }}
          >
            {isSubmitting ? 'Sending...' : (submitted ? 'Message Sent! ✨' : 'Send Message')}
            {(!isSubmitting && !submitted) && <Send size={18} />}
          </button>
        </form>
      </div>
    </section>
  );
}
