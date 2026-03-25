import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, MapPin, Calendar, Award } from 'lucide-react';

function ProjectImageCarousel({ images, title }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div style={{
        width: '100%',
        height: '280px',
        background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-color) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '14px',
        border: '1px solid var(--glass-border)'
      }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', opacity: 0.6 }}>📷 Images coming soon</span>
      </div>
    );
  }

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden' }}>
      <img
        src={images[currentIdx]}
        alt={`${title} - view ${currentIdx + 1}`}
        width="800"
        height="280"
        style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block', transition: 'opacity 0.3s ease' }}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            aria-label="Previous image"
            style={{
              position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.9)', border: 'none',
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#1c1917', borderRadius: '50%', boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s ease, background-color 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextImage}
            aria-label="Next image"
            style={{
              position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.9)', border: 'none',
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#1c1917', borderRadius: '50%', boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s ease, background-color 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
          >
            <ChevronRight size={18} />
          </button>

          <div style={{
            position: 'absolute', bottom: '0.75rem', left: '0', right: '0',
            display: 'flex', justifyContent: 'center', gap: '0.4rem'
          }}>
            {images.map((_, idx) => (
              <div
                key={idx}
                role="button"
                aria-label={`Go to image ${idx + 1}`}
                onClick={(e) => { e.stopPropagation(); setCurrentIdx(idx); }}
                style={{
                  width: idx === currentIdx ? '18px' : '7px',
                  height: '7px',
                  borderRadius: '4px',
                  background: idx === currentIdx ? '#fff' : 'rgba(255,255,255,0.5)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  transition: 'width 0.3s ease, background 0.2s ease',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="glass animate-fade-in"
      style={{
        padding: '2rem',
        borderRadius: '20px',
        animationDelay: `${index * 0.1}s`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
      }}
    >
      <ProjectImageCarousel images={project.images} title={project.title} />

      <div style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: '1.3rem', margin: 0, color: 'var(--text-primary)', flex: 1 }}>
            {project.title}
          </h3>
          {project.metrics && (
            <span className="glass-pill" style={{
              fontSize: '0.8rem',
              padding: '0.25rem 0.75rem',
              color: 'var(--accent-color)',
              whiteSpace: 'nowrap'
            }}>
              <Award size={12} style={{ marginRight: '4px', verticalAlign: '-1px' }} />
              {project.metrics}
            </span>
          )}
        </div>

        <p style={{
          color: 'var(--text-secondary)',
          margin: '1rem 0',
          fontSize: '0.95rem',
          lineHeight: '1.7'
        }}>
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--accent-color)', fontWeight: '600', fontSize: '0.9rem',
                padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem',
                transition: 'opacity 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              {expanded ? '▾ Hide Details' : '▸ View Details'}
            </button>

            {expanded && (
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0.75rem 0 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {project.highlights.map((item, i) => (
                  <li key={i} style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    paddingLeft: '1.25rem',
                    position: 'relative',
                    lineHeight: '1.6'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.1em',
                      color: 'var(--accent-color)',
                      fontSize: '0.7rem'
                    }}>●</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* External Links */}
        {project.links && project.links.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '0.5rem'
          }}>
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8rem',
                  color: 'var(--accent-color)',
                  textDecoration: 'none',
                  padding: '0.3rem 0.7rem',
                  borderRadius: '8px',
                  background: 'var(--bg-color)',
                  border: '1px solid var(--glass-border)',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'var(--bg-color)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <ExternalLink size={12} />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CompanyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const company = portfolioData.experience.find(exp => exp.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!company) {
    return (
      <div className="container" style={{ padding: '12rem 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Company not found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The page you're looking for doesn't exist.</p>
        <Link to="/" style={{
          color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '600',
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '6rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            fontWeight: '500',
            fontSize: '0.95rem',
            padding: '0.5rem 0',
            marginBottom: '2.5rem',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        {/* Company Header */}
        <div className="animate-fade-in" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: 1.2
            }}>
              {company.company}
            </h1>
            <a
              href={company.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none',
                color: 'var(--accent-color)',
                fontSize: '0.85rem',
                padding: '0.3rem 0.8rem',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ExternalLink size={13} /> Website
            </a>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '1rem',
            flexWrap: 'wrap'
          }}>
            <span style={{
              color: 'var(--accent-color)',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}>
              {company.role}
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-secondary)',
              fontSize: '0.95rem'
            }}>
              <Calendar size={14} />
              {company.period}
            </span>
          </div>

          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontSize: '1.05rem',
            margin: 0,
            maxWidth: '700px'
          }}>
            {company.description}
          </p>
        </div>

        {/* Projects Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            color: 'var(--text-primary)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            Projects
            <span style={{
              fontSize: '0.85rem',
              fontWeight: '500',
              color: 'var(--accent-color)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--glass-border)',
              borderRadius: '9999px',
              padding: '0.2rem 0.65rem'
            }}>
              {company.projects.length}
            </span>
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {company.projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
