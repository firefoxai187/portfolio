import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Contact from './components/Contact';
import CompanyPage from './components/CompanyPage';
import Chatbot from './components/Chatbot';
import CustomCursor from './components/CustomCursor';
import FlowerShower from './components/FlowerShower';

function HomePage() {
  return (
    <main>
      <Hero />
      <Experience />
      <Contact />
    </main>
  );
}

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);
  return null;
}

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isRaining, setIsRaining] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

  const toggleRain = () => setIsRaining(!isRaining);

  return (
    <BrowserRouter>
      <div style={{ position: 'relative' }}>
        <CustomCursor />
        <FlowerShower isRaining={isRaining} />
        <ScrollToHash />
        <Navbar isDark={isDark} toggleTheme={toggleTheme} toggleRain={toggleRain} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/company/:slug" element={<CompanyPage />} />
        </Routes>
        
        <footer style={{
          padding: '3rem 0',
          textAlign: 'center',
          borderTop: '1px solid var(--glass-border)',
          color: 'var(--text-secondary)',
          marginTop: '6rem',
          background: 'var(--bg-secondary)'
        }}>
          <div className="container">
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} All rights reserved. Built with React & Vite.</p>
          </div>
        </footer>

        <Chatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;
