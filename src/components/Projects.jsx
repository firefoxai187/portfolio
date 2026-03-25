import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

function ProjectCard({ project }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const images = project.images || [project.image]; 

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="glass animate-fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
      e.currentTarget.style.background = 'var(--glass-hover-bg)';
      const img = e.currentTarget.querySelector('.proj-img');
      if (img) img.style.transform = 'scale(1.03)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
      e.currentTarget.style.background = 'var(--glass-bg)';
      const img = e.currentTarget.querySelector('.proj-img');
      if (img) img.style.transform = 'scale(1)';
    }}
    >
      <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
        <img 
          className="proj-img"
          src={images[currentIdx]} 
          alt={`${project.title} - view ${currentIdx + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              style={{
                position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.8)', border: 'none',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#0f172a', zIndex: 10,
                transition: 'background 0.2s', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'}
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={nextImage}
              style={{
                position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.8)', border: 'none',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#0f172a', zIndex: 10,
                transition: 'background 0.2s', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'}
            >
              <ChevronRight size={18} />
            </button>

            <div style={{
              position: 'absolute', bottom: '0.75rem', left: '0', right: '0', 
              display: 'flex', justifyContent: 'center', gap: '0.4rem', zIndex: 10
            }}>
              {images.map((_, idx) => (
                <div key={idx} style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: idx === currentIdx ? '#fff' : 'rgba(255,255,255,0.5)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  transition: 'background 0.2s ease, transform 0.2s'
                }} />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div style={{ padding: '1.5rem 2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{project.title}</h3>
        
        <p style={{ marginBottom: '1.5rem', flexGrow: 1, fontSize: '1rem', color: 'var(--text-secondary)' }}>{project.description}</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.8rem',
              fontWeight: '500',
              padding: '0.35rem 0.85rem',
              background: 'var(--bg-color)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
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
          marginTop: 'auto',
          fontSize: '0.95rem'
        }}>
          View Project <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '8rem 0', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', color: 'var(--text-primary)' }}>
          Featured <span className="gradient-text">Work</span>
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {portfolioData.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
