import React, { useState, useEffect } from 'react';

const FLOWER_TYPES = ['🌸', '🌺', '🌼', '🌷', '🏵️', '💐', '🌻'];

export default function FlowerShower({ isRaining }) {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    if (isRaining) {
      // Create an array of 40 falling flowers
      const newFlowers = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        type: FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)],
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 4 + 3}s`,
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${Math.random() * 1.5 + 1}rem`
      }));
      setFlowers(newFlowers);
    } else {
      setFlowers([]);
    }
  }, [isRaining]);

  if (!isRaining) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 99998,
      overflow: 'hidden'
    }}>
      {flowers.map(flower => (
        <div key={flower.id} className="falling-flower" style={{
          position: 'absolute',
          top: '-10%',
          left: flower.left,
          fontSize: flower.fontSize,
          animationDuration: flower.animationDuration,
          animationDelay: flower.animationDelay
        }}>
          {flower.type}
        </div>
      ))}
    </div>
  );
}
