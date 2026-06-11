// ============================================================
// FooterParticles.jsx — Sistema de Partículas do Footer
// Projeto: Iron Dome — Tactical Mission Design System
// ============================================================

import React, { useMemo } from 'react';
import styles from './FooterParticles.module.scss';

const FooterParticles = () => {
  const particles = useMemo(() => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const particleCount = isMobile ? 10 : 20; // Cota reduzida para não competir com o CTA
    const generatedParticles = [];

    for (let i = 0; i < particleCount; i++) {
      const type = Math.random() < 0.6 ? 'dot' : 'line';
      
      // Opacidades menores (0.1 a 0.35) para manter o foco no CTA principal
      const baseOpacity = Math.random() * (0.35 - 0.1) + 0.1;
      const opacity = isMobile ? baseOpacity * 0.7 : baseOpacity;

      const size = Math.random() * (5 - 2) + 2;
      const lineHeight = type === 'line' ? Math.random() * (28 - 12) + 12 : 0;

      // Concentração estrita nas bordas laterais (Left: 0-15% | Right: 85-100%)
      const isLeftWing = Math.random() < 0.5;
      const leftPosition = isLeftWing 
        ? Math.random() * 15 
        : Math.random() * (100 - 85) + 85;

      generatedParticles.push({
        id: `fp-${i}`,
        type,
        style: {
          '--left': `${leftPosition}%`,
          '--top': `${Math.random() * 100}%`,
          '--delay': `${Math.random() * 4}s`,
          '--duration': `${Math.random() * (9 - 4) + 4}s`,
          '--size': `${size}px`,
          '--line-height': `${lineHeight}px`,
          '--opacity': opacity,
          '--rotation': `${Math.random() * (70 - 20) + 20}deg`, // Rotação entre 20deg e 70deg
          '--will-change': isMobile ? 'auto' : 'transform',
        },
      });
    }

    return generatedParticles;
  }, []);

  return (
    <div 
      className={styles['fp-container']} 
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={`${styles['fp-particle']} ${styles[`fp-particle--${p.type}`]}`}
          style={p.style}
        />
      ))}
    </div>
  );
};

export default FooterParticles;