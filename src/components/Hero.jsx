import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section id="about" style={{ 
      minHeight: '90vh', 
      display: 'flex', 
      alignItems: 'center', 
      paddingTop: '100px',
      paddingBottom: '80px',
      borderBottom: '1px solid var(--glass-border)'
    }}>
      <div className="container" style={{ width: '100%' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '4rem', 
          alignItems: 'center' 
        }}>
          {/* Text Content */}
          <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
            <div className="glass-pill" style={{ display: 'inline-flex', marginBottom: '2rem', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}>
              🌸 Welcome to Uyen's world
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
              fontWeight: '700',
              lineHeight: '1.15',
              marginBottom: '1.5rem',
              color: 'var(--text-primary)'
            }}>
              <span className="gradient-text">Uyen's world</span> <br/>
              <span style={{ fontSize: '0.5em', fontWeight: '500', color: 'var(--text-secondary)' }}>{portfolioData.personal.role}</span>
            </h1>
            
            <p style={{ 
              fontSize: '1.15rem', 
              marginBottom: '3rem', 
              lineHeight: '1.8',
              color: 'var(--text-secondary)'
            }}>
              {portfolioData.personal.bio}
            </p>
            
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
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
              
              <a href="#projects" className="glass" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                borderRadius: '12px'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'var(--glass-hover-bg)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                View Projects <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Image Content */}
          <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', animationDelay: '0.2s' }}>
            <div style={{
              width: '100%',
              maxWidth: '380px',
              aspectRatio: '4/5',
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--glass-shadow)',
              border: '6px solid var(--bg-secondary)',
              transition: 'transform 0.4s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img 
                src={portfolioData.personal.image} 
                alt={portfolioData.personal.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
