import React from 'react';
import { Lock } from 'lucide-react'; // Ícone de cadeado para a identidade "Restrita" do Quartel
import styles from './BannerRestrito.module.scss';

/**
 * @component BannerRestrito
 * @description Seção Hero premium com efeito Neon-Glow volumétrico e 
 * sistema de micro-poeira flutuante de alta fidelidade (UX/UI Sênior).
 */
export default function BannerRestrito() {
  return (
    <section className={styles.heroSection}>
      {/* Camadas de Iluminação Avançada (Simula o efeito Neon da referência) */}
      <div className={styles.vignetteOverlay}></div>
      <div className={styles.neonCoreGlow}></div>
      <div className={styles.flareLight}></div>

      {/* Sistema Sênior de Micro-Poeira Flutuante */}
      <div className={styles.particlesContainer}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`${styles.dustParticle} ${styles[`p${i + 1}`]}`} />
        ))}
      </div>

      <div className="container text-center position-relative">
        
        {/* SUB-BLOCO: BADGE TÁTICO */}
        <div className={`${styles.badgeWrapper} mx-auto mb-4`}>
          <div className={styles.pulseRing}></div>
          <span className={styles.badgeText}>
            <Lock size={12} className={styles.lockIcon} />
            ACESSO RESTRITO: QUARTEL DE ELITE
          </span>
        </div>

        {/* SUB-BLOCO: TÍTULO PRINCIPAL */}
        <h1 className={styles.mainTitle}>
          EQUIPAMENTO EXCLUSIVO <br />
          PARA O <span className={styles.highlightText}>CORPO DE SERVIÇO</span>
        </h1>

        {/* SUB-BLOCO: TEXTO DESCRITIVO */}
        <p className={styles.supportText}>
          Nossas vestes não são apenas tecidos, são armaduras de propósito. 
          Forjadas para aqueles que atendem ao chamado e servem ativamente na missão Iron Dome.
        </p>

        {/* SUB-BLOCO: BOTÃO DE AÇÃO */}
        <div className="mt-4">
          <button className={styles.actionButton}>
            ACESSAR O QUARTEL
          </button>
        </div>

      </div>
    </section>
  );
}