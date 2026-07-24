import styles from './FooterHistoria.module.scss';

// Função matemática pura para gerar variação pseudo-aleatória sem usar Math.random()
function pseudoRandom(seed) {
  const x = Math.sin(seed * 9999 + 1) * 10000;
  return x - Math.floor(x);
}

const FIRE_COLORS = ['#ff4500', '#ff8c00', '#ffd700'];

// As partículas são geradas uma única vez de forma estática e pura fora do componente
const PARTICLES = Array.from({ length: 40 }).map((_, index) => {
  const r1 = pseudoRandom(index * 1 + 1);
  const r2 = pseudoRandom(index * 2 + 1);
  const r3 = pseudoRandom(index * 3 + 1);
  const r4 = pseudoRandom(index * 4 + 1);
  const r5 = pseudoRandom(index * 5 + 1);

  return {
    id: `particle-${index}`,
    x: r1 * 100,
    delay: r2 * 5,
    duration: r3 * 6 + 5,
    size: r4 * 4 + 2,
    color: FIRE_COLORS[Math.floor(r5 * FIRE_COLORS.length)]
  };
});

export default function FooterHistoria() {
  return (
    <section className={styles.footerSection}>
      {/* SISTEMA DE PARTICULAS (FIRE SPARKS) */}
      <div className={styles.particleContainer} aria-hidden={true}>
        {PARTICLES.map((p) => (
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
                <a href="/testemunho" className={styles.tacticalButton}>
                  <span className={styles.tacticalButtonContent}>
                    <span className={styles.btnText}>ACESSAR TESTEMUNHOS</span>
                    <span className={`${styles.btnIcon} ${styles.floatingIcon}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="13 17 18 12 13 7" />
                        <polyline points="6 17 11 12 6 7" />
                      </svg>
                    </span>
                  </span>
                </a>
              </div>

              {/* CTA SECUNDARIO E ESTRATEGICO: RETORNO A HOME */}
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