import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section id="about" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative',
      paddingTop: '80px',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'var(--accent-glow)',
        filter: 'blur(120px)',
        borderRadius: '50%',
        zIndex: -1,
        animation: 'pulse-glow 8s ease-in-out infinite'
      }} />

      <div className="container" style={{ width: '100%' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '4rem', 
          alignItems: 'center' 
        }}>
          {/* Text Content */}
          <div className="animate-fade-in">
            <div className="glass-pill" style={{ display: 'inline-flex', marginBottom: '1.5rem', color: 'var(--accent-color)', fontWeight: '600' }}>
              👋🏼 Welcome to my portfolio
            </div>
            
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', marginBottom: '1rem' }}>
              Hi, I'm {portfolioData.personal.name} <br/>
              <span className="gradient-text">{portfolioData.personal.role}</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.8' }}>
              {portfolioData.personal.bio}
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#projects" className="glass" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.5rem',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'background 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--glass-hover-bg)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'var(--glass-bg)'}
              >
                View Projects <ArrowRight size={18} />
              </a>
              
              <div style={{ display: 'flex', gap: '1.25rem', marginLeft: '1rem' }}>
                {portfolioData.personal.github && (
                  <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                    <Github size={24} />
                  </a>
                )}
                <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  <Linkedin size={24} />
                </a>
                <a href={`mailto:${portfolioData.personal.email}`} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="animate-fade-in" style={{ position: 'relative', display: 'flex', justifyContent: 'center', animationDelay: '0.2s' }}>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '4/5',
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--glass-shadow)',
              border: '8px solid white',
              background: 'var(--glass-bg)'
            }}>
              <img 
                src={portfolioData.personal.image} 
                alt={portfolioData.personal.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
            {/* Soft backdrop decorator for the image */}
            <div style={{
              position: 'absolute',
              top: '-3%',
              right: '2%',
              width: '100%',
              maxWidth: '400px',
              height: '100%',
              background: 'var(--accent-gradient)',
              borderRadius: '24px',
              opacity: 0.2,
              zIndex: -1,
              transform: 'rotate(4deg)'
            }} />
          </div>
          
        </div>
      </div>
    </section>
  );
}
