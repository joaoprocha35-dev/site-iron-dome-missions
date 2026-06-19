// ============================================================
// EventCalendar/index.jsx — Galeria Cinema Premium (3 em 3)
// Otimizado: IntersectionObserver + reduced-motion + GPU
// ============================================================

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; // IMPORTAÇÃO DO LINK ADICIONADA AQUI
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
import duda from '../../../assets/imagensHome/duda.png'; // EXTENSÃO CORRIGIDA PARA .PNG MAIÚSCULO
import mulherad from '../../../assets/imagensHome/mulher-ad.png'; 
import baterista01 from '../../../assets/imagensHome/baterista01.jpg';
import adoracao01 from '../../../assets/imagensHome/adoracao01.jpg';
import adoracao02 from '../../../assets/imagensHome/amigos02.png'; 
import adoracao03 from '../../../assets/imagensHome/adoracao03.jpg'; 
import bastidores04 from '../../../assets/imagensHome/bastidores04.png';
import bastidores05 from '../../../assets/imagensHome/bastidores05.png';
import bastidores06 from '../../../assets/imagensHome/bastidores06.png';
import jovem from '../../../assets/imagensHome/jovem.jpg';
import jovem2 from '../../../assets/imagensHome/jovem2.jpg';
import jovem3 from '../../../assets/imagensHome/jovem3.jpg';
import intercessao01 from '../../../assets/imagensHome/intercessao01.png';
import intercessao02 from '../../../assets/imagensHome/intercessao02.jpg';
import intercessao03 from '../../../assets/imagensHome/intercessao03.png';
import intercessao04 from '../../../assets/imagensHome/intercessao04.jpg';


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
          
          {/* CARD INVITATION TÁTICO COM BORDA ANIMADA E NAVEGAÇÃO INTERNA CORRIGIDA */}
          <div className={styles.historyCTA}>
            <p className={styles.ctaText}>Quer entender o início de tudo e quem faz parte dessa missão?</p>
            <Link to="/historia" className={styles.ctaButton}>
              <span className={styles.ctaButtonContent}>
                Conhecer Nossa História 
                <span className={styles.ctaArrowWrapper}>
                  <span className={styles.ctaArrow}>→</span>
                </span>
              </span>
            </Link>
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
          {/* ADICIONADO: Troca do caractere ✦ pelo emoji tático de escudo 🛡️ solicitado pelo usuário */}
          <span className={styles.titlePrefix}>🛡️</span> Registro das Missões do Iron Dome
        </h2>
        <div className={styles.tacticalLine}></div>
      </header>

      {/* ================= SQUAD 01 ================= */}
      <section className={styles.squadBlock}>
        <SquadHeader title="SQUAD 01 // Grupo de Louvores e Adoradores" groupIdx={0} />
        <div className={styles.gridContainer}>
          <GridSlot src={louvor02} caption="Ministrando ao Senhor com foco e sensibilidade." absoluteIndex={0} localIndex={0} />
          <GridSlot src={louvor03} caption="Liderança no Altar: Conduzindo o Squad com o coração totalmente entregue." absoluteIndex={1} localIndex={1} />
          <GridSlot src={louvor04} caption="Sincronia Tática: Homens de Deus servindo juntos na linha de frente." absoluteIndex={2} localIndex={2} />
          <GridSlot src={duda} caption="Entrega Absoluta: Uma adoradora totalmente rendida à presença de Deus." absoluteIndex={3} localIndex={3} />
          <GridSlot src={mulherad} caption="Rede de Intercessão: Mãos levantadas e corações rendidos ao Criador." absoluteIndex={4} localIndex={4} />
          <GridSlot src={baterista01} caption="Ritmo e Devoção: Cada batida como um ato de entrega e adoração ao Rei." absoluteIndex={5} localIndex={5} />
        </div>
      </section>

      {/* ================= SQUAD 02 ================= */}
      <section className={styles.squadBlock}>
        <SquadHeader title="SQUAD 02 // O que acontece nos bastidores" groupIdx={1} />
        <div className={styles.gridContainer}>
          <GridSlot src={amigos04} caption="Cuidar dos detalhes mais simples é um ato de adoração." absoluteIndex={6} localIndex={0} />
          <GridSlot src={amigos05} caption="Lavando e servindo com a alegria que vem do Senhor." absoluteIndex={7} localIndex={1} />
          <GridSlot src={amigos01} caption="Servindo com Excelência: Cada detalhe preparado para abençoar o próximo." absoluteIndex={8} localIndex={2} />
          <GridSlot src={bastidores04} caption="Alegria no Serviço: Voluntários focados em fazer a diferença nos bastidores." absoluteIndex={9} localIndex={3} />
          <GridSlot src={bastidores05} caption="O Coração do Iron Dome: O exército de voluntários que faz a missão acontecer." absoluteIndex={10} localIndex={4} />
          <GridSlot src={bastidores06} caption="Descanso e Comunhão: Filhas unidas pela mesma missão e pelo mesmo amor." absoluteIndex={11} localIndex={5} />
        </div>
      </section>

      {/* ================= SQUAD 03 ================= */}
      <section className={styles.squadBlock}>
        <SquadHeader title="SQUAD 03 // FRUTOS DA MISSÃO: NOVA GERAÇÃO" groupIdx={2} />
        <div className={styles.gridContainer}>
          <GridSlot src={encontrista02} caption="Identidade Confirmada: Uma nova história iniciada no altar do Senhor." absoluteIndex={12} localIndex={0} />
          <GridSlot src={encontrista03} caption="Alegria do Resgate: A celebração de quem encontrou um novo propósito." absoluteIndex={13} localIndex={1} />
          <GridSlot src={encontrista04} caption="Posicionamento e Alinhamento: Homens curados para curar esta geração." absoluteIndex={14} localIndex={2} />
          <GridSlot src={jovem} caption="Legado que Permanece: Amizades geradas e firmadas na rocha eterna." absoluteIndex={15} localIndex={3} />
          <GridSlot src={jovem2} caption="Legado que Permanece: Amizades geradas e firmadas na rocha eterna." absoluteIndex={16} localIndex={4} />
          <GridSlot src={jovem3} caption="Novas amizades, novas história" absoluteIndex={17} localIndex={5} />
        </div>
      </section>

      {/* ================= SQUAD 04 ================= */}
      <section className={styles.squadBlock}>
        <SquadHeader title="SQUAD 04 // TRANSMISSÃO DE IDENTIDADE E CURA" groupIdx={3} />
        <div className={styles.gridContainer}>
          <GridSlot src={ministracao} caption="Direcionamento Estratégico: Ativação ministerial através do ensino e da Palavra." absoluteIndex={18} localIndex={0} />
          <GridSlot src={ministracao02} caption="Paternidade e Instrução: Conduzindo a liderança com clareza e autoridade espiritual." absoluteIndex={19} localIndex={1} />
          <GridSlot src={amigos03} caption="Cura e Acolhimento: O abraço que restaura a identidade e edifica a caminhada." absoluteIndex={20} localIndex={2} />
          <GridSlot src={adoracao01} caption="Intensidade no Altar: Uma ministra clamando e liberando a verdade de Deus sobre a igreja." absoluteIndex={21} localIndex={3} />
          <GridSlot src={adoracao02} caption="Fraternidade e Aliança: Líderes unidos pelo mesmo propósito em um abraço de alegria." absoluteIndex={22} localIndex={4} />
          <GridSlot src={adoracao03} caption="Mentoria e Cuidado: O suporte e a cobertura espiritual necessários para firmar os passos da nova geração." absoluteIndex={23} localIndex={5} />
        </div>
      </section>

      {/* ================= SQUAD 05 ================= */}
      <section className={styles.squadBlock}>
        <SquadHeader title="SQUAD 05 // LINHA DE FRENTE: INTERCESSÃO E ADORAÇÃO" groupIdx={4} />
        <div className={styles.gridContainer}>
          <GridSlot src={abraco01} caption="Acolhimento e Alívio: O momento em que o fardo é compartilhado e a cura acontece pelo abraço." absoluteIndex={24} localIndex={0} />
          <GridSlot src={intercessao01} caption="Clamor em Unidade: Jovens posicionados na brecha, intercedendo com o coração quebrantado." absoluteIndex={25} localIndex={1} />
          <GridSlot src={oracao04} caption="Total Dependência: Dobrando os joelhos no chão para erguer um escudo de proteção sobre a igreja." absoluteIndex={26} localIndex={2} />
          <GridSlot src={intercessao02} caption="Entrega e Rendição: Onde as fraquezas humanas encontram a força e o consolo do Pai." absoluteIndex={26} localIndex={2} />
          <GridSlot src={intercessao03} caption="Blindagem em Ação: Uma liderança posicionada e com os olhos fixos no trono da graça." absoluteIndex={26} localIndex={2} />
          <GridSlot src={intercessao04} caption="Sustentação Fraterna: O cuidado tático de um irmão que segura as pontas e ora pelo outro na batalha." absoluteIndex={26} localIndex={2} />
        </div>
      </section>

      {/* SEÇÃO INFERIOR DO ALICERCE */}
      <LegacySection absoluteIndex={27} />
    </article>
  );
}