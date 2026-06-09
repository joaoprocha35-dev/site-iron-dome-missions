import React, { useMemo } from 'react';
import styles from './FooterHistoria.module.scss';

export default function FooterHistoria() {
  // Gerador Tático de Partículas (Executado apenas na montagem para máxima performance)
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      x: Math.random() * 100, // Posição horizontal aleatória
      delay: Math.random() * 5, // Delay para não subirem todas juntas
      duration: Math.random() * 10 + 8, // Tempo de voo entre 8s e 18s
      size: Math.random() * 4 + 2, // Tamanho entre 2px e 6px
    }));
  }, []);

  return (
    <section className={styles.footerSection}>
      
      {/* ─── SISTEMA DE PARTÍCULAS (GREEN NEON) ─── */}
      <div className={styles.particleContainer} aria-hidden="true">
        {particles.map((p, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${p.x}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.contentWrapper}`}>
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-9 col-lg-8">
            
            {/* BADGE TÁTICO */}
            <span className={styles.badgeFooter}>ARSENAL DESBLOQUEADO</span>
            
            {/* TÍTULO PRINCIPAL */}
            <h2 className={styles.title}>
              O Batismo de Fogo Exige a <br />
              <span className={styles.highlight}>Armadura Certa</span>
            </h2>
            
            {/* SUBTÍTULO */}
            <p className={styles.subtitle}>
              A partir do momento em que você é convocado, a sua farda define a sua sobrevivência. Conheça as peças oficiais e o equipamento tático que nossos operadores usam no campo de batalha.
            </p>
            
            {/* BOTÃO DE AÇÃO TÁTICO (DIRECIONA PARA PRODUTOS) */}
            <div className={styles.actionBlock}>
              <a href="/produtos" className={styles.tacticalButton}>
                <span className={styles.btnText}>ACESSAR ARSENAL</span>
                <span className={styles.btnIcon}>
                  {/* Ícone de Seta/Alvo */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <div className={styles.scanline}></div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}