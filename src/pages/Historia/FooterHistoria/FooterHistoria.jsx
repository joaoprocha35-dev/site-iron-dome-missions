import React, { useMemo } from 'react';
import styles from './FooterHistoria.module.scss';

export default function FooterHistoria() {
  // Gerador de Fagulhas de Fogo (Variação de tamanho, velocidade e cores quentes)
  const particles = useMemo(() => {
    const fireColors = ['#ff4500', '#ff8c00', '#ffd700']; // Tons de fogo: Laranja-avermelhado, Laranja e Dourado

    return Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 100, // Posição horizontal
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 5, // Mais rápido para simular chamas (5s a 11s)
      size: Math.random() * 4 + 2,
      color: fireColors[Math.floor(Math.random() * fireColors.length)]
    }));
  }, []);

  return (
    <section className={styles.footerSection}>

      {/* ─── SISTEMA DE PARTÍCULAS (FIRE SPARKS) ─── */}
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
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}80`
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.contentWrapper}`}>
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-9 col-lg-8">

            {/* BADGE TÁTICO */}
            <span className={styles.badgeFooter}>DIRETRIZES IRON DOME</span>

            {/* TÍTULO PRINCIPAL */}
            <h2 className={styles.title}>
              Vidas Marcadas por um <br />
              <span className={styles.highlight}>Encontro Inabalável</span>
            </h2>

            {/* SUBTÍTULO */}
            <p className={styles.subtitle}>
              A verdadeira transformação começa quando você assume o seu posto e redefine a sua trajetória. Conheça as histórias reais de quem aceitou a convocação, passou pelo Encontro e hoje vive com a identidade blindada.
            </p>

            {/* CONTAINER DAS AÇÕES TÁTICAS */}
            <div className={styles.actionBlockContainer}>
              {/* BOTÃO PRINCIPAL COM BORDA INFINITA */}
              <div className={styles.actionBlock}>
                <a href="/testemunho" className={styles.tacticalButton}>
                  <span className={styles.tacticalButtonContent}>
                    <span className={styles.btnText}>ACESSAR TESTEMUNHOS</span>
                    <span className={`${styles.btnIcon} ${styles.floatingIcon}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="13 17 18 12 13 7"></polyline>
                        <polyline points="6 17 11 12 6 7"></polyline>
                      </svg>
                    </span>
                  </span>
                </a>
              </div>

              {/* CTA SECUNDÁRIO E ESTRATÉGICO: RETORNO À HOME */}
              <div className={styles.backHomeBlock}>
                <a href="/home" className={styles.backHomeLink}>
                  <span className={styles.backHomeIcon}>←</span>
                  RETORNAR ÀS COORDENADAS INICIAIS
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}