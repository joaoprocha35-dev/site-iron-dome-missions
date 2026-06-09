import React from 'react';
import styles from './HeaderArsenal.module.scss';

/**
 * @component HeaderArsenal
 * @description Componente intermediário de fundamentação com ecossistema visual Neon-Glow.
 */
export default function HeaderArsenal() {
  return (
    <header className={styles.heroSection}>
      {/* Camadas de Iluminação Avançada */}
      <div className={styles.vignetteOverlay}></div>
      <div className={styles.ambientOverlay}></div>
      <div className={styles.neonCoreGlow}></div>

      {/* Sistema de Micro-Poeira Flutuante */}
      <div className={styles.particlesContainer}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`${styles.dustParticle} ${styles[`p${i + 1}`]}`} />
        ))}
      </div>

      {/* MARCA D'ÁGUA DE FUNDO: Centralizada de forma absoluta */}
      <div className={styles.bgTitleContainer}>
        <span className={styles.bgTitle}>IRON DOME TACTICAL</span>
      </div>

      {/* CONTAINER DE CONTEÚDO: Preserva o alinhamento central absoluto */}
      <div className="container-fluid text-center position-relative w-100" style={{ zIndex: 2 }}>
        <div className="row justify-content-center position-relative m-0">
          <div className="col-12 col-md-10 col-lg-8 d-flex flex-column align-items-center p-0">
            
            {/* CONTAINER CITANTE */}
            <div className={styles.quoteBlock}>
              <p className={styles.verseText}>
                Revesti-vos de toda a armadura de Deus, para que possais resistir às ciladas do diabo.
              </p>
              <span className={styles.verseReference}>— EFÉSIOS 6:11</span>
            </div>
            
            {/* TEXTO COMPLEMENTAR */}
            <p className={styles.descriptionText}>
              Cada peça do nosso quartel é uma ferramenta de combate espiritual para o cotidiano do cristão moderno. Prepare-se para a missão urbana.
            </p>
            
          </div>
        </div>
      </div>
    </header>
  );
}