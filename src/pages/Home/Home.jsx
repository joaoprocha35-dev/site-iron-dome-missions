import React from 'react';

// Importações ajustadas: agora apontam diretamente para as pastas que estão ao lado do Home.jsx
import HeroBanner       from './HeroBanner/HeroBanner';
import VerseOfTheDay    from './VerseOfTheDay/VerseOfTheDay';
import DirectivesCard   from './DirectivesCard/DirectivesCard';
import SoldierSpotlight from './SoldierSpotlight/SoldierSpotlight';
import EventCalendar    from './EventCalendar/EventCalendar';

import styles from './Home.module.scss';

export default function Home() {
  return (
    <main className={styles.page}>

      {/* 1. Hero / Banner Principal */}
      <HeroBanner />

      {/* 2. Seção: Versículo do Dia */}
      <section className={styles.section} aria-label="Versículo do dia">
        <div className={styles.container}>
          <VerseOfTheDay />
        </div>
      </section>

      {/* 3. Seção: Painel de Comando (Grid das Diretrizes + Soldado) */}
      <section className={styles.section} aria-label="Painel de comando">
        <div className={`${styles.container} ${styles.gridDashboard}`}>
          <DirectivesCard />
          <SoldierSpotlight />
        </div>
      </section>

      {/* 4. Seção: Calendário de Eventos */}
      <section className={styles.section} aria-label="Calendário espiritual">
        <div className={styles.container}>
          <EventCalendar />
        </div>
      </section>

    </main>
  );
}