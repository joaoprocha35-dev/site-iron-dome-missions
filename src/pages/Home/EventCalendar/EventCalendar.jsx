// ============================================================
// EventCalendar/index.jsx — Galeria Cinema Premium (3 em 3)
// Otimizado: IntersectionObserver + reduced-motion + GPU
// ============================================================

import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './EventCalendar.module.scss';

// IMPORTS DAS IMAGENS DO SEU DIRETÓRIO LOCAL
import amigos01 from '../../../assets/imagensHome/amigos01.png';
import amigos02 from '../../../assets/imagensHome/amigos02.png';
import amigos03 from '../../../assets/imagensHome/amigos03.png';
import amigos04 from '../../../assets/imagensHome/amigos04.png';
import amigos05 from '../../../assets/imagensHome/amigos05.png';
import casaOracao from '../../../assets/imagensHome/casa-oracao.png';
import encontrista02 from '../../../assets/imagensHome/encontrista02.png';
import encontrista03 from '../../../assets/imagensHome/encontrista03.png';
import encontrista04 from '../../../assets/imagensHome/encontrista04.png';
import equipe1 from '../../../assets/imagensHome/equipe1.png';
import familia01 from '../../../assets/imagensHome/familia01.png';
import louvor02 from '../../../assets/imagensHome/louvor02.png';
import louvor03 from '../../../assets/imagensHome/louvor03.png';
import louvor04 from '../../../assets/imagensHome/louvor04.png';
import oracao04 from '../../../assets/imagensHome/oracao04.png';
import abraco01 from '../../../assets/imagensHome/abraco01.png';
import abraco02 from '../../../assets/imagensHome/abraco02.png';
import ministracao from '../../../assets/imagensHome/ministracao.png';
import ministracao02 from '../../../assets/imagensHome/ministracao02.png';
import familiaLider from '../../../assets/imagensHome/familia-lider.png';
import duda from '../../../assets/imagensHome/duda.png';
import mulherad from '../../../assets/imagensHome/mulher-ad.png'; 
import baterista01 from '../../../assets/imagensHome/baterista01.png';
import adoracao01 from '../../../assets/imagensHome/adoracao01.png';
import adoracao02 from '../../../assets/imagensHome/adoracao02.png'; 
import adoracao03 from '../../../assets/imagensHome/adoracao03.jpg'; 
import bastidores04 from '../../../assets/imagensHome/bastidores04.jpg';
import bastidores05 from '../../../assets/imagensHome/bastidores05.jpg';
import bastidores06 from '../../../assets/imagensHome/bastidores06.jpg';
import jovem from '../../../assets/imagensHome/jovem.jpg';
import jovem2 from '../../../assets/imagensHome/jovem2.jpg';
import jovem3 from '../../../assets/imagensHome/jovem3.jpg';

function useInViewport(options = { rootMargin: '120px', threshold: 0.05 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    io.observe(node);
    return () => io.disconnect();
  }, [options.rootMargin, options.threshold]);

  return [ref, inView];
}

function GridSlot({ src, href, caption, absoluteIndex, localIndex }) {
  const [ref, inView] = useInViewport();

  const cssVars = useMemo(() => ({
    '--item-index': absoluteIndex,
    '--local-index': localIndex,
    '--float-offset': `${(absoluteIndex % 4) * 0.45}s`,
    '--rotate-seed': `${((absoluteIndex % 3) - 1) * 0.5}deg`
  }), [absoluteIndex, localIndex]);

  return (
    <div
      ref={ref}
      className={`${styles.gridSlot} ${inView ? styles.isVisible : ''}`}
      style={cssVars}
    >
      <a href={href} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <img
            src={src}
            alt={caption}
            className={styles.tacticalImage}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.imageOverlay}>
            <p className={styles.imageCaptionMobile}>{caption}</p>
          </div>
        </div>
      </a>
      <p className={styles.imageCaptionDesktop}>{caption}</p>
    </div>
  );
}

function LegacySection({ absoluteIndex }) {
  const [ref, inView] = useInViewport({ rootMargin: '150px', threshold: 0.1 });
  const cssVars = useMemo(() => ({ '--item-index': absoluteIndex }), [absoluteIndex]);

  return (
    <section
      ref={ref}
      className={`${styles.legacySection} ${inView ? styles.isVisible : ''}`}
      style={cssVars}
    >
      <div className={styles.legacyContent}>
        <div className={styles.legacyImageFrame}>
          <img
            src={familiaLider}
            alt="Família Liderança Iron Dome"
            className={styles.legacyImage}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.legacyOverlay} />
        </div>

        <div className={styles.legacyTextContainer}>
          <span className={styles.legacyBadge}>ALICERCE DA VISÃO</span>
          <h3 className={styles.legacyTitle}>
            Deus gerou o propósito do <strong>Iron Dome</strong> através dessa família.
          </h3>
          <p className={styles.legacyCaption}>Conexão real além das reuniões.</p>
          
          {/* CARD INVITATION TÁTICO COM BORDA ANIMADA */}
          <div className={styles.historyCTA}>
            <p className={styles.ctaText}>Quer entender o início de tudo e quem faz parte dessa missão?</p>
            <a href="/historia" className={styles.ctaButton}>
              <span className={styles.ctaButtonContent}>
                Conhecer Nossa História 
                <span className={styles.ctaArrowWrapper}>
                  <span className={styles.ctaArrow}>→</span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SquadHeader({ title, groupIdx }) {
  const [ref, inView] = useInViewport({ rootMargin: '80px', threshold: 0.1 });
  const cssVars = useMemo(() => ({ '--group-index': groupIdx }), [groupIdx]);

  return (
    <header
      ref={ref}
      className={`${styles.squadHeader} ${inView ? styles.isVisible : ''}`}
      style={cssVars}
    >
      <h3 className={styles.squadGroupTitle}>
        <span className={styles.squadIndicator}>►</span> {title}
      </h3>
    </header>
  );
}

export default function EventCalendar() {
  return (
    <article className={styles.gallerySection}>
      <header className={styles.galleryHeader}>
        <h2 className={styles.galleryTitle}>
          <span className={styles.titlePrefix}>✦</span> Registro das Missões do Iron Dome
        </h2>
        <div className={styles.tacticalLine}></div>
      </header>

      {/* ================= SQUAD 01 ================= */}
      <section className={styles.squadBlock}>
        <SquadHeader title="SQUAD 01 // Grupo de Louvores e Adoradores" groupIdx={0} />
        <div className={styles.gridContainer}>
          <GridSlot src={louvor02} caption="Nossos voluntários servindo com alegria." absoluteIndex={0} localIndex={0} />
          <GridSlot src={louvor03} caption="Instruções e alinhamento do propósito." absoluteIndex={1} localIndex={1} />
          <GridSlot src={louvor04} caption="Cada membro é fundamental." absoluteIndex={2} localIndex={2} />
          <GridSlot src={duda} caption="Cada membro é fundamental." absoluteIndex={3} localIndex={3} />
          <GridSlot src={mulherad} caption="Cada membro é fundamental." absoluteIndex={4} localIndex={4} />
          <GridSlot src={baterista01} caption="Cada membro é fundamental." absoluteIndex={5} localIndex={5} />
        </div>
      </section>

      {/* ================= SQUAD 02 ================= */}
      <section className={styles.squadBlock}>
        <SquadHeader title="SQUAD 02 // O que acontece nos bastidores" groupIdx={1} />
        <div className={styles.gridContainer}>
          <GridSlot src={amigos04} caption="Servindo ao Próximo com alegria." absoluteIndex={6} localIndex={0} />
          <GridSlot src={amigos05} caption="Comunhão e amizade que fortalecem." absoluteIndex={7} localIndex={1} />
          <GridSlot src={amigos01} caption="Servindo com alegria e trabalho em equipe." absoluteIndex={8} localIndex={2} />
          <GridSlot src={bastidores04} caption="Servindo com alegria e trabalho em equipe." absoluteIndex={9} localIndex={3} />
          <GridSlot src={bastidores05} caption="Servindo com alegria e trabalho em equipe." absoluteIndex={10} localIndex={4} />
          <GridSlot src={bastidores06} caption="Servindo com alegria e trabalho em equipe." absoluteIndex={11} localIndex={5} />
        </div>
      </section>

      {/* ================= SQUAD 03 ================= */}
      <section className={styles.squadBlock}>
        <SquadHeader title="SQUAD 03 // ENGAJAMENTO E FORÇA JOVEM" groupIdx={2} />
        <div className={styles.gridContainer}>
          <GridSlot src={encontrista02} caption="União e força entre os jovens." absoluteIndex={12} localIndex={0} />
          <GridSlot src={encontrista03} caption="Alegria que contagia a todos." absoluteIndex={13} localIndex={1} />
          <GridSlot src={encontrista04} caption="Novas amizades, novas história" absoluteIndex={14} localIndex={2} />
          <GridSlot src={jovem} caption="Novas amizades, novas história" absoluteIndex={15} localIndex={3} />
          <GridSlot src={jovem2} caption="Novas amizades, novas história" absoluteIndex={16} localIndex={4} />
          <GridSlot src={jovem3} caption="Novas amizades, novas história" absoluteIndex={17} localIndex={5} />
        </div>
      </section>

      {/* ================= SQUAD 04 ================= */}
      <section className={styles.squadBlock}>
        <SquadHeader title="SQUAD 04 // ESTRATÉGIA MINISTERIAL E IDENTIDADE" groupIdx={3} />
        <div className={styles.gridContainer}>
          <GridSlot src={ministracao} caption="Alinhamento estratégico ministerial." absoluteIndex={18} localIndex={0} />
          <GridSlot src={ministracao02} caption="Fortalecendo nossa identidade em Deus." absoluteIndex={19} localIndex={1} />
          <GridSlot src={amigos03} caption="União tática das lideranças." absoluteIndex={20} localIndex={2} />
          <GridSlot src={adoracao01} caption="Cada membro é fundamental." absoluteIndex={21} localIndex={3} />
          <GridSlot src={adoracao02} caption="Cada membro é fundamental." absoluteIndex={22} localIndex={4} />
          <GridSlot src={adoracao03} caption="Cada membro é fundamental." absoluteIndex={23} localIndex={5} />
        </div>
      </section>

      {/* ================= SQUAD 05 ================= */}
      <section className={styles.squadBlock}>
        <SquadHeader title="SQUAD 05 // LINHA DE FRENTE: INTERCESSÃO E ADORAÇÃO" groupIdx={4} />
        <div className={styles.gridContainer}>
          <GridSlot src={abraco01} caption="Acolhimento e ministração profunda." absoluteIndex={24} localIndex={0} />
          <GridSlot src={ministracao} caption="O agir que quebra as barreiras." absoluteIndex={25} localIndex={1} />
          <GridSlot src={oracao04} caption="Firmes em oração sobre o mesmo fundamento." absoluteIndex={26} localIndex={2} />
        </div>
      </section>

      {/* SEÇÃO INFERIOR DO ALICERCE */}
      <LegacySection absoluteIndex={27} />
    </article>
  );
}