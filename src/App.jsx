import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div style={{ position: 'relative' }}>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
      
      <footer style={{
        padding: '3rem 0',
        textAlign: 'center',
        borderTop: '1px solid var(--glass-border)',
        color: 'var(--text-secondary)',
        marginTop: '6rem',
        background: 'var(--glass-bg)'
      }}>
        <div className="container">
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} All rights reserved. Built with React & Vite.</p>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}

export default App;
