import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ isDark, toggleTheme, toggleRain }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    if (isHome) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + hash);
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 50,
      transition: 'padding 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
      padding: scrolled ? '1.5rem 0' : '2.5rem 0',
      background: scrolled ? 'var(--bg-color)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link
          to="/"
          style={{
            fontWeight: '800',
            fontSize: '1.5rem',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            transition: 'opacity 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          {portfolioData.personal.name}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', fontSize: '0.95rem', fontWeight: '500' }}>
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
             onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>About</a>
          <a href="#experience" onClick={(e) => handleNavClick(e, '#experience')} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
             onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Experience</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
             onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Contact</a>
          
          <button 
            onClick={toggleRain}
            aria-label="Toggle flower rain effect"
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: '1.2rem', padding: '0.25rem', transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.4) rotate(15deg)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
            title="Make it rain flowers!"
          >
            🌸
          </button>
          
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </div>
      </div>
    </nav>
  );
}
