import styles from './HeaderParticles.module.scss';

// Função matemática pura para gerar variações sem usar Math.random() (evita erros do ESLint)
function pseudoRandom(seed) {
  const x = Math.sin(seed * 9999 + 1) * 10000;
  return x - Math.floor(x);
}

// Geramos as partículas de forma estática e pura fora do componente
const PARTICLES = Array.from({ length: 30 }).map((_, i) => {
  const r1 = pseudoRandom(i * 1 + 1);
  const r2 = pseudoRandom(i * 2 + 1);
  const r3 = pseudoRandom(i * 3 + 1);
  const r4 = pseudoRandom(i * 4 + 1);
  const r5 = pseudoRandom(i * 5 + 1);
  const r6 = pseudoRandom(i * 6 + 1);
  const r7 = pseudoRandom(i * 7 + 1);
  const r8 = pseudoRandom(i * 8 + 1);
  const r9 = pseudoRandom(i * 9 + 1);

  const type = r1 < 0.6 ? 'dot' : 'line';
  const baseOpacity = r2 * (0.5 - 0.15) + 0.15;
  const size = r3 * (5 - 2) + 2;
  const lineHeight = type === 'line' ? r4 * (28 - 12) + 12 : 0;
  const drift = r5 * (60 - -60) + -60;

  return {
    id: `hp-${i}`,
    type,
    style: {
      '--left': `${r6 * 100}%`,
      '--top': `${r7 * 100}%`,
      '--delay': `${r8 * 4}s`,
      '--duration': `${r9 * (9 - 4) + 4}s`,
      '--size': `${size}px`,
      '--line-height': `${lineHeight}px`,
      '--opacity': baseOpacity,
      '--drift': `${drift}px`,
      '--rotation': `${r1 * 90 - 45}deg`,
      '--will-change': 'transform',
    },
  };
});

export default function HeaderParticles() {
  return (
    <div className={styles['hp-container']} aria-hidden="true">
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className={`${styles['hp-particle']} ${styles[`hp-particle--${p.type}`]}`}
          style={p.style}
        />
      ))}
    </div>
  );
}