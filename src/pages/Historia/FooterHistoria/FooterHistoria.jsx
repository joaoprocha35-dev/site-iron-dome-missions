import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './FooterHistoria.module.scss';

export default function FooterHistoria() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const fireColors = ['#ff4500', '#ff8c00', '#ffd700'];

    const generatedParticles = Array.from({ length: 40 }).map((_, index) => ({
      id: `particle-${index}`,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 5,
      size: Math.random() * 4 + 2,
      color: fireColors[Math.floor(Math.random() * fireColors.length)]
    }));

    setParticles(generatedParticles);
  }, []);

  return (
    <section className={styles.footerSection}>
      {/* SISTEMA DE PARTICULAS (FIRE SPARKS) */}
      <div className={styles.particleContainer} aria-hidden={true}>
        {particles.map((p) => (
          <div
            key={p.id}
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
            {/* BADGE TATICO */}
            <span className={styles.badgeFooter}>DIRETRIZES IRON DOME</span>

            {/* TITULO PRINCIPAL */}
            <h2 className={styles.title}>
              Vidas Marcadas por um <br />
              <span className={styles.highlight}>Encontro Inabalável</span>
            </h2>

            {/* SUBTITULO */}
            <p className={styles.subtitle}>
              A verdadeira transformação começa quando você assume o seu posto e redefine a sua trajetória. Conheça as histórias reais de quem aceitou a convocação, passou pelo Encontro e hoje vive com a identidade blindada.
            </p>

            {/* CONTAINER DAS ACOES TATICAS */}
            <div className={styles.actionBlockContainer}>
              {/* BOTAO PRINCIPAL COM BORDA INFINITA */}
              <div className={styles.actionBlock}>
                <Link href="/testemunho" className={styles.tacticalButton}>
                  <span className={styles.tacticalButtonContent}>
                    <span className={styles.btnText}>ACESSAR TESTEMUNHOS</span>
                    <span className={`${styles.btnIcon} ${styles.floatingIcon}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="13 17 18 12 13 7" />
                        <polyline points="6 17 11 12 6 7" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </div>

              {/* CTA SECUNDARIO E ESTRATEGICO: RETORNO A HOME */}
              <div className={styles.backHomeBlock}>
                <Link href="/home" className={styles.backHomeLink}>
                  <span className={styles.backHomeIcon}>←</span>
                  RETORNAR ÀS COORDENADAS INICIAIS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}