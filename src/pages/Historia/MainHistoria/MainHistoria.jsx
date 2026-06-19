/**
 * MainHistoria.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * ENGINE DE ANIMAÇÃO CRONOLÓGICA & PARALLAX DE PARTÍCULAS — IRON DOME
 * * ARQUITETURA DE CÓDIGO ABERTO (ANTI-ABSTRAÇÃO / NÃO-AUTOMATIZADO):
 * O corpo da linha do tempo foi estruturado de forma explicitamente linear. 
 * A eliminação de loops iterativos dinâmicos (.map) no JSX mitiga overheads de
 * reconciliação do Virtual DOM e garante que cada nó de renderização possua
 * escopo fixo e chamadas diretas aos imports de mídia alocados em memória.
 *
 * ENGINE DE RISCOS TÁTICOS (CHUVA DE NEON CADENTE COM DISSIPAÇÃO):
 * Camada computacional nativa em Canvas que renderiza um sistema de partículas
 * cadentes lineares em posições pseudo-aleatórias através de todo o plano de fundo.
 * O efeito de sumiço ("fade-out") e translação vertical reage ao ciclo de animação
 * contínuo e às proporções dinâmicas de dimensionamento da seção.
 *
 * ATUALIZAÇÃO — MÍDIA EXPANDIDA:
 * O texto descritivo de cada card foi movido para dentro do .imageWrapper,
 * sobreposto à própria imagem (com gradiente de legibilidade definido no SCSS),
 * eliminando o espaço vazio que sobrava abaixo da imagem em cada card.
 *
 * ATUALIZAÇÃO 2 — TEXTO ABAIXO DA IMAGEM, DENTRO DO CARD (MOBILE):
 * A <p className={styles.mediaDescription}> deixou de ficar DENTRO do
 * .imageWrapper (que tem overflow:hidden e, no mobile, altura fixa — o que
 * cortaria o texto). Agora ela é irmã do .imageWrapper, ambas dentro do
 * .mediaContainer, que por sua vez já está dentro do .timelineContentWrapper
 * (o card). Resultado: a imagem mantém altura fixa e a descrição flui
 * normalmente abaixo dela, sem ser cortada e sem vazar para fora do card.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './MainHistoria.module.scss';

// ─── IMPORTAÇÃO MANUAL DO ACERVO DE MÍDIA CRIPTOGRAFADO ──────────────────────
import Lideranca from '../../../assets/imagensHistoria/lideranca.png';
import CasaOracao from '../../../assets/imagensHistoria/casa-oracao.png';
import Familia01 from '../../../assets/imagensHistoria/familia01.png';
import Oracao04 from '../../../assets/imagensHistoria/oracao04.png';
import Adoracao03 from '../../../assets/imagensHistoria/adoracao03.jpg';
import foto01 from '../../../assets/imagensHistoria/foto01.png';
import foto02 from '../../../assets/imagensHistoria/foto02.png';
import foto03 from '../../../assets/imagensHistoria/foto03.png';
import foto04 from '../../../assets/imagensHistoria/foto04.png';
import foto05 from '../../../assets/imagensHistoria/foto05.png';
import foto06 from '../../../assets/imagensHistoria/foto06.png';

// Parâmetros estáticos de calibração fina da interface
const HYSTERESIS = 6;

export default function MainHistoria() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const rafRef = useRef(null);
  const canvasRef = useRef(null);

  // Estados de controle de renderização e visibilidade tática
  const [isVisible, setIsVisible] = useState(false);
  const [fillProgress, setFillProgress] = useState(0);

  // Inicialização explícita da máquina de estados (card por card) para evitar re-layouts cíclicos
  const [activeItems, setActiveItems] = useState({
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined
  });

  /**
   * FIX: ENGINE DE AUTO-RESET DE ROLAGEM DE PÁGINA
   * Garante que sempre que o usuário alternar de rotas e retornar para a tela
   * da história, a janela do navegador limpe o cache de scroll e retorne ao topo.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instantâneo para evitar flickers visuais na renderização dos primeiros nós
    });
  }, []);

  /**
   * ENGINE DE PARTÍCULAS EM CANVAS (BACKGROUND CHROMATIC STREAKS)
   * Controla a inicialização, redimensionamento e loop de animação do fundo em tempo real.
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particleAnimationId;
    let particles = [];

    const resizeCanvas = () => {
      if (sectionRef.current) {
        canvas.width = sectionRef.current.offsetWidth;
        canvas.height = sectionRef.current.offsetHeight;
      }
    };

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; // Distribuição inicial vertical
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -80;
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 4 + 2;
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.y += this.speed;
        if (this.y - this.length > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(this.x, this.y - this.length, this.x, this.y);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.7, `rgba(0, 255, 102, ${this.opacity})`);
        gradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.moveTo(this.x, this.y - this.length);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
      }
    }

    const initEngine = () => {
      resizeCanvas();
      particles = [];
      const particleCount = Math.min(Math.floor(canvas.width / 25), 70);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const runEngine = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      particleAnimationId = requestAnimationFrame(runEngine);
    };

    initEngine();
    runEngine();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(particleAnimationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  /**
   * INTERPOLAÇÃO VETORIAL DO SCROLL E PROCESSAMENTO DA HISTERESE
   * Executa os cálculos geométricos de posicionamento e atualiza as flags de animação.
   */
  const computeScroll = useCallback(() => {
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const vh = window.innerHeight;

    // Ponto de partida do progresso (cruzamento do gatilho a 66% da tela)
    const triggerTop = rect.top - vh / 1.5;
    let progress = 0;

    if (triggerTop < 0) {
      progress = Math.min(Math.max((Math.abs(triggerTop) / rect.height) * 100, 0), 100);
    }

    setFillProgress(progress);

    // Avaliação individualizada por threshold e amortecimento por margem de tolerância
    setActiveItems(prev => {
      const next = { ...prev };
      let changed = false;

      // ITEM 1 (Threshold: 0%)
      if (progress >= 0 && prev[0] !== true) { next[0] = true; changed = true; }
      else if (progress < 0 && prev[0] === true) { next[0] = false; changed = true; }

      // ITEM 2 (Threshold: 12%)
      if (progress >= 12 && prev[1] !== true) { next[1] = true; changed = true; }
      else if (progress < 12 && prev[1] === true && progress < (12 - HYSTERESIS)) { next[1] = false; changed = true; }

      // ITEM 3 (Threshold: 24%)
      if (progress >= 24 && prev[2] !== true) { next[2] = true; changed = true; }
      else if (progress < 24 && prev[2] === true && progress < (24 - HYSTERESIS)) { next[2] = false; changed = true; }

      // ITEM 4 (Threshold: 36%)
      if (progress >= 36 && prev[3] !== true) { next[3] = true; changed = true; }
      else if (progress < 36 && prev[3] === true && progress < (36 - HYSTERESIS)) { next[3] = false; changed = true; }

      // ITEM 5 (Threshold: 50%)
      if (progress >= 50 && prev[4] !== true) { next[4] = true; changed = true; }
      else if (progress < 50 && prev[4] === true && progress < (50 - HYSTERESIS)) { next[4] = false; changed = true; }

      // ITEM 6 (Threshold: 62%)
      if (progress >= 62 && prev[5] !== true) { next[5] = true; changed = true; }
      else if (progress < 62 && prev[5] === true && progress < (62 - HYSTERESIS)) { next[5] = false; changed = true; }

      // ITEM 7 (Threshold: 74%)
      if (progress >= 74 && prev[6] !== true) { next[6] = true; changed = true; }
      else if (progress < 74 && prev[6] === true && progress < (74 - HYSTERESIS)) { next[6] = false; changed = true; }

      // ITEM 8 (Threshold: 86%)
      if (progress >= 86 && prev[7] !== true) { next[7] = true; changed = true; }
      else if (progress < 86 && prev[7] === true && progress < (86 - HYSTERESIS)) { next[7] = false; changed = true; }

      // ITEM 9 (Threshold: 98%)
      if (progress >= 98 && prev[8] !== true) { next[8] = true; changed = true; }
      else if (progress < 98 && prev[8] === true && progress < (98 - HYSTERESIS)) { next[8] = false; changed = true; }

      return changed ? next : prev;
    });
  }, []);

  // Blindagem contra jank e layout thrashing via RequestAnimationFrame
  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(computeScroll);
  }, [computeScroll]);

  // Monitor de entrada na Viewport nativa
  const triggerIfVisible = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      setIsVisible(true);
    }
  }, []);

  // Ciclo de gerenciamento global de eventos de interface
  useEffect(() => {
    triggerIfVisible();

    const delayedCheck = setTimeout(() => {
      triggerIfVisible();
      computeScroll();
    }, 150);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        triggerIfVisible();
        computeScroll();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    computeScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(delayedCheck);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, computeScroll, triggerIfVisible]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.historiaSection} py-5 px-3 w-100 ${isVisible ? styles.animate : ''}`}
      aria-label="Linha do tempo Iron Dome"
    >
      {/* Camada do Canvas */}
      <canvas ref={canvasRef} className={styles.particleCanvasSky} aria-hidden="true" />

      <div className="container-fluid" style={{ position: 'relative', zIndex: 3 }}>

        {/* ─── HEADER DA SEÇÃO ─── */}
        <div className="row align-items-start justify-content-between gy-5 mb-5" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
          <div className="col-12 col-lg-6 text-start">
            <span className={`${styles.badgeTactical} ${styles.animTopDown} text-uppercase mb-4 d-inline-block`}>
              Origem &amp; Propósito
            </span>

            <h2 className={`${styles.sectionTitle} ${styles.animLeftRight} text-white mb-4`}>
              Fortalecidos pela Fé. <br />
              Guiados pelo Amor de Cristo.
            </h2>

            <p className={`${styles.textContent} ${styles.animBottomUp} ${styles.delayText1} text-white-50 mb-4`}>
              O Iron Dome nasceu em Botucatu com o propósito de ser um refúgio
              espiritual para pessoas que precisam de esperança, direção e acolhimento.
            </p>

            <p className={`${styles.textContent} ${styles.animBottomUp} ${styles.delayText2} text-white-50`}>
              Através da palavra de Deus, ações sociais e comunhão profunda,
              buscando levar a luz de Jesus onde houver dor, medo ou solidão.
            </p>
          </div>

          <div className="col-12 col-lg-5">
            <div className="row g-3">
              <div className="col-12">
                <div className={`${styles.cardEntrance} ${styles.delayCard1}`}>
                  <div className={`${styles.metricCard} ${styles.floating} ${styles.floatDelay1} p-4 text-center`}>
                    <h3 className={styles.greenNumber}>2024</h3>
                    <p className="text-uppercase text-white-50 small m-0" style={{ letterSpacing: '2px' }}>
                      Ano de Fundação
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className={`${styles.cardEntrance} ${styles.delayCard2}`}>
                  <div className={`${styles.metricCard} ${styles.floating} ${styles.floatDelay2} p-4 text-center`}>
                    <h4 className={styles.greenNumberSmall}>500+</h4>
                    <p className="small text-white-50 m-0">Membros Ativos</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className={`${styles.cardEntrance} ${styles.delayCard3}`}>
                  <div className={`${styles.metricCard} ${styles.floating} ${styles.floatDelay3} p-4 text-center`}>
                    <h4 className={styles.greenNumberSmall}>12</h4>
                    <p className="small text-white-50 m-0">Missões Cumpridas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── CORPO DA TIMELINE EXPLICITA ─── */}
        <div className="row mt-5 pt-3 justify-content-center" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
          <div className="col-12 col-xl-10">
            <div ref={timelineRef} className={styles.timelineContainer}>

              <div className={styles.timelineLineBase} aria-hidden="true">
                <div
                  className={styles.timelineLineProgress}
                  style={{ height: `${fillProgress}%` }}
                />
              </div>

              {/* ITEM 1: JANEIRO 2024 (LEFT) */}
              <div
                data-index="0"
                className={`${styles.timelineItem} ${styles.timelineItemLeft} ${activeItems[0] === true ? styles.itemActive : activeItems[0] === false ? styles.itemCollapsed : ''}`}
                style={{ '--item-index': 0, '--card-enter-x': '-22px' }}
              >
                <div className={`${styles.timelineNode} ${fillProgress >= 0 ? styles.nodeActive : ''}`}>
                  <div className={styles.nodeInnerCircle} />
                </div>
                <div className={styles.timelineContentWrapper}>
                  <div className={styles.cardDateBlock}>
                    <span className={styles.timelineYear}>2024</span>
                    <h4 className={styles.timelineMonth}>Janeiro</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={Lideranca} alt="Primeiros encontros" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[DIRETRIZ CORE]:</strong> Início dos primeiros encontros e alinhamento da visão em Botucatu.
                    </p>
                  </div>
                </div>
              </div>

              {/* ITEM 2: MARÇO 2024 (RIGHT) */}
              <div
                data-index="1"
                className={`${styles.timelineItem} ${styles.timelineItemRight} ${activeItems[1] === true ? styles.itemActive : activeItems[1] === false ? styles.itemCollapsed : ''}`}
                style={{ '--item-index': 1, '--card-enter-x': '22px' }}
              >
                <div className={`${styles.timelineNode} ${fillProgress >= 12 ? styles.nodeActive : ''}`}>
                  <div className={styles.nodeInnerCircle} />
                </div>
                <div className={styles.timelineContentWrapper}>
                  <div className={styles.cardDateBlock}>
                    <span className={styles.timelineYear}>2008</span>
                    <h4 className={styles.timelineMonth}>Setembro</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={foto01} alt="Casa de Oração" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[ESTRUTURAÇÃO]:</strong>[CONCEPÇÃO DA VISÃO]: O marco zero onde a intenção e o desenho estratégico do Iron Dome começaram a ganhar forma.
                    </p>
                  </div>
                </div>
              </div>

              {/* ITEM 3: JULHO 2024 (LEFT) */}
              <div
                data-index="2"
                className={`${styles.timelineItem} ${styles.timelineItemLeft} ${activeItems[2] === true ? styles.itemActive : activeItems[2] === false ? styles.itemCollapsed : ''}`}
                style={{ '--item-index': 2, '--card-enter-x': '-22px' }}
              >
                <div className={`${styles.timelineNode} ${fillProgress >= 24 ? styles.nodeActive : ''}`}>
                  <div className={styles.nodeInnerCircle} />
                </div>
                <div className={styles.timelineContentWrapper}>
                  <div className={styles.cardDateBlock}>
                    <span className={styles.timelineYear}>2012</span>
                    <h4 className={styles.timelineMonth}>Julho</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={foto02} alt="Liderança João" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[MISSÃO EM MOVIMENTO]:</strong>O trabalho nos bastidores e a dedicação prática que transportaram os alicerces do Iron Dome.
                    </p>
                  </div>
                </div>
              </div>

              {/* ITEM 4: DEZEMBRO 2024 (RIGHT) */}
              <div
                data-index="3"
                className={`${styles.timelineItem} ${styles.timelineItemRight} ${activeItems[3] === true ? styles.itemActive : activeItems[3] === false ? styles.itemCollapsed : ''}`}
                style={{ '--item-index': 3, '--card-enter-x': '22px' }}
              >
                <div className={`${styles.timelineNode} ${fillProgress >= 36 ? styles.nodeActive : ''}`}>
                  <div className={styles.nodeInnerCircle} />
                </div>
                <div className={styles.timelineContentWrapper}>
                  <div className={styles.cardDateBlock}>
                    <span className={styles.timelineYear}>2005</span>
                    <h4 className={styles.timelineMonth}>Dezembro</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={foto03} alt="Família" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[INFRAESTRUTURA TÁTICA]:</strong>A montagem técnica de som e os ajustes iniciais que deram voz aos primeiros passos da nossa caminhada.
                    </p>
                  </div>
                </div>
              </div>

              {/* ITEM 5: MAIO 2025 (LEFT) */}
              <div
                data-index="4"
                className={`${styles.timelineItem} ${styles.timelineItemLeft} ${activeItems[4] === true ? styles.itemActive : activeItems[4] === false ? styles.itemCollapsed : ''}`}
                style={{ '--item-index': 4, '--card-enter-x': '-22px' }}
              >
                <div className={`${styles.timelineNode} ${fillProgress >= 50 ? styles.nodeActive : ''}`}>
                  <div className={styles.nodeInnerCircle} />
                </div>
                <div className={styles.timelineContentWrapper}>
                  <div className={styles.cardDateBlock}>
                    <span className={styles.timelineYear}>2025</span>
                    <h4 className={styles.timelineMonth}>Setembro</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={foto04} alt="Ação de Oração" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[COMUNHÃO E FRUTOS]:</strong>A celebração dos batismos e a união da família Iron Dome colhendo os frutos da nossa missão.
                    </p>
                  </div>
                </div>
              </div>

              {/* ITEM 6: SETEMBRO 2025 (RIGHT) */}
              <div
                data-index="5"
                className={`${styles.timelineItem} ${styles.timelineItemRight} ${activeItems[5] === true ? styles.itemActive : activeItems[5] === false ? styles.itemCollapsed : ''}`}
                style={{ '--item-index': 5, '--card-enter-x': '22px' }}
              >
                <div className={`${styles.timelineNode} ${fillProgress >= 62 ? styles.nodeActive : ''}`}>
                  <div className={styles.nodeInnerCircle} />
                </div>
                <div className={styles.timelineContentWrapper}>
                  <div className={styles.cardDateBlock}>
                    <span className={styles.timelineYear}>2025</span>
                    <h4 className={styles.timelineMonth}>Setembro</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={foto05} alt="Adoração Intensa" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[ESTRATÉGIA CORE]:</strong>A primeira reunião de alinhamento e preparativos que estruturou a base para o nascimento da nossa primeira edição.
                    </p>
                  </div>
                </div>
              </div>

              {/* ITEM 7: JANEIRO 2026 (LEFT) */}
              <div
                data-index="6"
                className={`${styles.timelineItem} ${styles.timelineItemLeft} ${activeItems[6] === true ? styles.itemActive : activeItems[6] === false ? styles.itemCollapsed : ''}`}
                style={{ '--item-index': 6, '--card-enter-x': '-22px' }}
              >
                <div className={`${styles.timelineNode} ${fillProgress >= 74 ? styles.nodeActive : ''}`}>
                  <div className={styles.nodeInnerCircle} />
                </div>
                <div className={styles.timelineContentWrapper}>
                  <div className={styles.cardDateBlock}>
                    <span className={styles.timelineYear}>2025</span>
                    <h4 className={styles.timelineMonth}>Março</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={foto06} alt="Planejamento Anual" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[EXPANSÃO TERRITORIAL]:</strong>Missão rumo à Paraíba para romper fronteiras e estabelecer a visão do Iron Dome em novas cidades.
                    </p>
                  </div>
                </div>
              </div>

              {/* ITEM 8: MARÇO 2026 (RIGHT) */}
              <div
                data-index="7"
                className={`${styles.timelineItem} ${styles.timelineItemRight} ${activeItems[7] === true ? styles.itemActive : activeItems[7] === false ? styles.itemCollapsed : ''}`}
                style={{ '--item-index': 7, '--card-enter-x': '22px' }}
              >
                <div className={`${styles.timelineNode} ${fillProgress >= 86 ? styles.nodeActive : ''}`}>
                  <div className={styles.nodeInnerCircle} />
                </div>
                <div className={styles.timelineContentWrapper}>
                  <div className={styles.cardDateBlock}>
                    <span className={styles.timelineYear}>2026</span>
                    <h4 className={styles.timelineMonth}>Março</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={Familia01} alt="Consagração" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[FRUTO DA PROMESSA]:</strong>A emoção de ver as novas gerações passando pelo Iron Dome e dando continuidade ao legado.
                    </p>
                  </div>
                </div>
              </div>

              {/* ITEM 9: MAIO 2026 (LEFT) */}
              <div
                data-index="8"
                className={`${styles.timelineItem} ${styles.timelineItemLeft} ${activeItems[8] === true ? styles.itemActive : activeItems[8] === false ? styles.itemCollapsed : ''}`}
                style={{ '--item-index': 8, '--card-enter-x': '-22px' }}
              >
                <div className={`${styles.timelineNode} ${fillProgress >= 98 ? styles.nodeActive : ''}`}>
                  <div className={styles.nodeInnerCircle} />
                </div>
                <div className={styles.timelineContentWrapper}>
                  <div className={styles.cardDateBlock}>
                    <span className={styles.timelineYear}>2026</span>
                    <h4 className={styles.timelineMonth}>Maio</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={Adoracao03} alt="Consolidação" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[A PRIMEIRA TURMA]:</strong>O marco histórico da primeira edição em Botucatu, onde nasceram os primeiros veteranos do Iron Dome.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ─── FOOTER DA SEÇÃO ─── */}
        <div className={styles.finalBridgeContainer} style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
          <hr />
          <span className={styles.bridgeTitle}>
            A HISTÓRIA CONTINUA SENDO ESCRITA
          </span>
          <p className={styles.bridgeDesc}>
            A cada vida alcançada é um novo capítulo na nossa caminhada.
            Veja abaixo os testemunhos de pessoas que já passaram por esse encontro.
          </p>
        </div>

      </div>
    </section>
  );
}
