import React from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, ArrowRight } from 'lucide-react';

export default function Experience() {
  const { experience } = portfolioData;
  const navigate = useNavigate();

  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" style={{ padding: '8rem 0', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '1rem',
          color: 'var(--text-primary)',
          textAlign: 'center'
        }}>
          Work <span className="gradient-text">Experience</span>
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginBottom: '3rem',
          fontSize: '1.05rem'
        }}>
          Click on a company to explore projects & highlights
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {experience.map((job, index) => (
            <div
              key={job.id}
              className="glass animate-fade-in"
              role="button"
              tabIndex={0}
              aria-label={`View ${job.company} projects`}
              onClick={() => navigate(`/company/${job.slug}`)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/company/${job.slug}`); } }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                borderRadius: '20px',
                cursor: 'pointer',
                animationDelay: `${index * 0.1}s`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)';
                e.currentTarget.style.background = 'var(--glass-hover-bg)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
                e.currentTarget.style.background = 'var(--glass-bg)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', border: '1px solid var(--glass-border)' }}>
                    <Briefcase size={20} color="var(--accent-color)" />
                  </div>
                  {job.company}
                </h3>
                <span className="glass-pill" style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.85rem',
                  padding: '0.3rem 0.8rem'
                }}>
                  {job.period}
                </span>
              </div>
              
              <div style={{ 
                color: 'var(--accent-color)', 
                marginBottom: '0.75rem',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                {job.role}
              </div>
              
              <p style={{ margin: '0 0 1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {job.description}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid var(--glass-border)'
              }}>
                <span style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '500'
                }}>
                  {job.projectCount} project{job.projectCount !== 1 ? 's' : ''}
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--accent-color)',
                  fontWeight: '600',
                  fontSize: '0.92rem',
                  transition: 'gap 0.2s ease'
                }}>
                  View Projects <ArrowRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
