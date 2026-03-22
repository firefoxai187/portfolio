import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

function ProjectCard({ project }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const images = project.images || [project.image]; // fallback

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="glass" style={{
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
      e.currentTarget.style.border = '1px solid var(--accent-glow)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
      e.currentTarget.style.border = '1px solid var(--glass-border)';
    }}
    >
      <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={images[currentIdx]} 
          alt={`${project.title} - view ${currentIdx + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              style={{
                position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '50%',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#000', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextImage}
              style={{
                position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '50%',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#000', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'}
            >
              <ChevronRight size={20} />
            </button>

            {/* Pagination Dots */}
            <div style={{
              position: 'absolute', bottom: '0.75rem', left: '0', right: '0', 
              display: 'flex', justifyContent: 'center', gap: '0.4rem', zIndex: 10
            }}>
              {images.map((_, idx) => (
                <div key={idx} style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: idx === currentIdx ? 'var(--accent-color)' : 'rgba(255,255,255,0.8)',
                  boxShadow: '0 0 2px rgba(0,0,0,0.2)',
                  transition: 'background 0.2s ease',
                  transform: idx === currentIdx ? 'scale(1.2)' : 'scale(1)'
                }} />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
        <p style={{ marginBottom: '1.5rem', flexGrow: 1 }}>{project.description}</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.75rem',
              padding: '0.35rem 0.85rem',
              background: 'var(--glass-hover-bg)',
              borderRadius: '9999px',
              color: 'var(--text-primary)'
            }}>
              {tag}
            </span>
          ))}
        </div>
        
        <a href={project.link} target="_blank" rel="noreferrer" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--accent-color)',
          textDecoration: 'none',
          fontWeight: '600',
          marginTop: 'auto'
        }}>
          View Project <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '6rem 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          Featured <span className="gradient-text">Work</span>
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          padding: '2rem 0'
        }}>
          {portfolioData.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
