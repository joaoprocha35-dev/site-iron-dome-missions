import styles from './FooterParticles.module.scss';

// Função matemática pura para gerar variações sem usar Math.random() (evita erros do ESLint)
function pseudoRandom(seed) {
  const x = Math.sin(seed * 9999 + 1) * 10000;
  return x - Math.floor(x);
}

// Geramos as partículas uma única vez de forma estática e pura fora do componente
const PARTICLES = Array.from({ length: 20 }).map((_, i) => {
  const r1 = pseudoRandom(i * 1 + 1);
  const r2 = pseudoRandom(i * 2 + 1);
  const r3 = pseudoRandom(i * 3 + 1);
  const r4 = pseudoRandom(i * 4 + 1);
  const r5 = pseudoRandom(i * 5 + 1);
  const r6 = pseudoRandom(i * 6 + 1);
  const r7 = pseudoRandom(i * 7 + 1);
  const r8 = pseudoRandom(i * 8 + 1);

  const type = r1 < 0.6 ? 'dot' : 'line';
  const baseOpacity = r2 * (0.35 - 0.1) + 0.1;
  const size = r3 * (5 - 2) + 2;
  const lineHeight = type === 'line' ? r4 * (28 - 12) + 12 : 0;
  const isLeftWing = r5 < 0.5;
  const leftPosition = isLeftWing ? r6 * 15 : r6 * (100 - 85) + 85;

  return {
    id: `fp-${i}`,
    type,
    style: {
      '--left': `${leftPosition}%`,
      '--top': `${r7 * 100}%`,
      '--delay': `${r8 * 4}s`,
      '--duration': `${r1 * (9 - 4) + 4}s`,
      '--size': `${size}px`,
      '--line-height': `${lineHeight}px`,
      '--opacity': baseOpacity,
      '--rotation': `${r2 * (70 - 20) + 20}deg`,
    },
  };
});

export default function FooterParticles() {
  return (
    <div className={styles['fp-container']} aria-hidden="true">
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className={`${styles['fp-particle']} ${styles[`fp-particle--${p.type}`]}`}
          style={p.style}
        />
      ))}
    </div>
  );
}