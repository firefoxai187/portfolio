import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on devices with a fine pointer (like a mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      // Check if we're hovering over a clickable element
      const target = e.target;
      const computedStyle = window.getComputedStyle(target);
      if (
        computedStyle.cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', () => setIsVisible(true));
    };
  }, [isVisible]);

  if (!isVisible && typeof window !== 'undefined' && window.innerWidth > 768) {
    return null; // hide when mouse leaves the window or on mobile
  }

  // Hide on touch devices or small screens natively via CSS, but this helps logic
  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '16px',
          height: '16px',
          color: 'var(--accent-color)',
          transform: `translate(${position.x - 8}px, ${position.y - 8}px) ${isHovering ? 'rotate(180deg) scale(1.2)' : 'rotate(0deg) scale(1)'}`,
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'transform 0.1s ease-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className="custom-cursor-dot"
      >
        <Star fill="currentColor" size={16} strokeWidth={1} />
      </div>
    </>
  );
}
