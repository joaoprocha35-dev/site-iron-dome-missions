// ============================================================
// headerParticles.jsx — Sistema de Partículas do Header
// Projeto: Iron Dome — Tactical Mission Design System
// ============================================================

import React, { useMemo } from 'react';
import styles from './HeaderParticles.module.scss';

const HeaderParticles = () => {
  // Configuração de performance e responsividade calculada na montagem
  const particles = useMemo(() => {
    // Verificação de viewport para otimização mobile em tempo de execução
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const particleCount = isMobile ? 15 : 30;
    const generatedParticles = [];

    for (let i = 0; i < particleCount; i++) {
      // Proporção estrita de 60% bolinhas (dot) e 40% traços (line)
      const type = Math.random() < 0.6 ? 'dot' : 'line';
      
      // Cálculo de opacidade com atenuação tática de 30% para telas mobile
      const baseOpacity = Math.random() * (0.5 - 0.15) + 0.15;
      const opacity = isMobile ? baseOpacity * 0.7 : baseOpacity;

      // Dimensões customizadas por tipo de elemento
      const size = Math.random() * (5 - 2) + 2; // 2px a 5px
      const lineHeight = type === 'line' ? Math.random() * (28 - 12) + 12 : 0; // 12px a 28px

      // Deslocamento lateral senoidal (drift) para as bolinhas
      const drift = Math.random() * (60 - -60) + -60; // -60px a 60px

      generatedParticles.push({
        id: `hp-${i}`,
        type,
        style: {
          '--left': `${Math.random() * 100}%`,
          '--top': `${Math.random() * 100}%`,
          '--delay': `${Math.random() * 4}s`,
          '--duration': `${Math.random() * (9 - 4) + 4}s`,
          '--size': `${size}px`,
          '--line-height': `${lineHeight}px`,
          '--opacity': opacity,
          '--drift': `${drift}px`,
          '--rotation': `${Math.random() * 90 - 45}deg`, // Rotação diagonal entre -45deg e 45deg
          '--will-change': isMobile ? 'auto' : 'transform', // Otimização de GPU: desativado em mobile
        },
      });
    }

    return generatedParticles;
  }, []);

  return (
    <div 
      className={styles['hp-container']} 
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={`${styles['hp-particle']} ${styles[`hp-particle--${p.type}`]}`}
          style={p.style}
        />
      ))}
    </div>
  );
};

export default HeaderParticles;