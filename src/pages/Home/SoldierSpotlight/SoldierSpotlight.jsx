// ============================================================
// SoldierSpotlight/index.jsx (Com Barras e Números Animados)
// ============================================================
import { useEffect, useState } from 'react';
import styles from './SoldierSpotlight.module.scss';

// Componente interno para gerenciar a animação individual de cada setor
function AnimatedSector({ sector, targetLevel }) {
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    // Tempo total da animação em milissegundos (1.5 segundos)
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      // Calcula o progresso de 0 a 1
      const progress = Math.min(elapsedTime / duration, 1);

      // Efeito de desaceleração suave (Ease Out)
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      // Calcula o valor atual do número
      const value = Math.floor(easeProgress * targetLevel);

      setCurrentLevel(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetLevel]);

  return (
    <div className={styles.sectorItem}>
      <div className={styles.sectorInfo}>
        <span className={styles.sectorName}>{sector}</span>
        {/* O número sobe de forma animada */}
        <span className={styles.sectorPercentage}>{currentLevel}%</span>
      </div>
      <div className={styles.meterContainer}>
        {/* A largura da barra acompanha o estado animado */}
        <div
          className={styles.meterFill}
          style={{ width: `${currentLevel}%` }}
        />
      </div>
    </div>
  );
}

export default function SoldierSpotlight() {
  const defenseSystems = [
    { id: 1, sector: 'Resgate de Identidade', level: 94 },
    { id: 2, sector: 'Escudo de Intercessão', level: 88 },
    { id: 3, sector: 'Suporte e Acolhimento', level: 91 },
  ];

  return (
    <article className={styles.commandCard}>

      {/* Subclube do Header dentro do SoldierSpotlight/index.jsx */}
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <span className={styles.radarPulse} aria-hidden="true"></span>
          <h2 className={styles.title}>SISTEMA DE DEFESA ATIVA</h2>
        </div>

        {/* ATUALIZADO: Agora com a bolinha pulsante interna */}
        <span className={styles.systemStatus}>
          <span className={styles.onlineDot}></span>
          ONLINE
        </span>
      </header>

      <div className={styles.gridSectors}>
        {defenseSystems.map((sys) => (
          <AnimatedSector
            key={sys.id}
            sector={sys.sector}
            targetLevel={sys.level}
          />
        ))}
      </div>

      <div className={styles.operationFeed}>
        <div className={styles.feedHeader}>
          <span className={styles.feedIcon}>⚡</span>
          <span>ÚLTIMA DIRETRIZ MONITORADA</span>
        </div>
        <p className={styles.feedText}>
          Sentinelas posicionados em toda região. Operação de resgate emocional ativa para o próximo encontro.
        </p>
      </div>

    </article>
  );
}