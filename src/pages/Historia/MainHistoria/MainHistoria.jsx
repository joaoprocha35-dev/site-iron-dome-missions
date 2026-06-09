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
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './MainHistoria.module.scss';

// ─── IMPORTAÇÃO MANUAL DO ACERVO DE MÍDIA CRIPTOGRAFADO ──────────────────────
import Lideranca   from '../../../assets/imagensHistoria/lideranca.png';
import CasaOracao  from '../../../assets/imagensHistoria/casa-oracao.png';
import Joao        from '../../../assets/imagensHistoria/joao.png';
import Familia01   from '../../../assets/imagensHistoria/familia01.png';
import Oracao04    from '../../../assets/imagensHistoria/oracao04.png';
import Adoracao01  from '../../../assets/imagensHistoria/adoracao01.png';
import Adoracao02  from '../../../assets/imagensHistoria/adoracao02.png';
import Adoracao03  from '../../../assets/imagensHistoria/adoracao03.jpg';

// Parâmetros estáticos de calibração fina da interface
const HYSTERESIS = 6;

export default function MainHistoria() {
  const sectionRef  = useRef(null);
  const timelineRef = useRef(null);
  const rafRef      = useRef(null);
  const canvasRef   = useRef(null);

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
    8: undefined
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
    const vh   = window.innerHeight;

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

      <div className="container-fluid px-md-5" style={{ position: 'relative', zIndex: 3 }}>

        {/* ─── HEADER DA SEÇÃO ─── */}
        <div className="row align-items-start justify-content-between gy-5 mb-5">
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
        <div className="row mt-5 pt-3 justify-content-center">
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
                      <strong>[DIRETRIZ CORE]:</strong> Início dos primeiros encontros e alinhamento da visão core em Botucatu.
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
                    <span className={styles.timelineYear}>2024</span>
                    <h4 className={styles.timelineMonth}>Março</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={CasaOracao} alt="Casa de Oração" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[ESTRUTURAÇÃO]:</strong> Estabelecimento da primeira casa de oração oficial para reuniões estratégicas.
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
                    <span className={styles.timelineYear}>2024</span>
                    <h4 className={styles.timelineMonth}>Julho</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={Joao} alt="Liderança João" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[EXPANSÃO]:</strong> Integração de novas lideranças focadas no crescimento do corpo de membros.
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
                    <span className={styles.timelineYear}>2024</span>
                    <h4 className={styles.timelineMonth}>Dezembro</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={Familia01} alt="Família" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[COMUNHÃO]:</strong> Consolidação dos núcleos familiares e celebração do primeiro ano de avanços.
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
                    <h4 className={styles.timelineMonth}>Maio</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={Oracao04} alt="Ação de Oração" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[AÇÃO SOCIAL]:</strong> Desdobramento dos primeiros clamores de rua e suporte às famílias locais.
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
                      <img src={Adoracao01} alt="Adoração Intensa" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[AVIVAMENTO]:</strong> Vigílias e cultos marcados por um ambiente profundo de adoração e quebra de cadeias.
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
                    <span className={styles.timelineYear}>2026</span>
                    <h4 className={styles.timelineMonth}>Janeiro</h4>
                  </div>
                  <div className={styles.mediaContainer}>
                    <div className={styles.imageWrapper}>
                      <img src={Adoracao02} alt="Planejamento Anual" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[MATURIDADE]:</strong> Alinhamento tático para a abertura de novas frentes de ação na região metropolitana.
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
                      <img src={Adoracao01} alt="Consagração" className="img-fluid" loading="lazy" />
                    </div>
                    <p className={styles.mediaDescription}>
                      <strong>[SISTEMA ATIVO]:</strong> Formação contínua de oficiais e envio estratégico de equipes para campo.
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
                      <strong>[STATUS OPERACIONAL]:</strong> Consolidação atual do Iron Dome como um refúgio e farol para a cidade.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ─── FOOTER DA SEÇÃO ─── */}
        <div className={styles.finalBridgeContainer}>
          <hr />
          <span className={styles.bridgeTitle}>
            A HISTÓRIA CONTINUA SENDO ESCRITA
          </span>
          <p className={styles.bridgeDesc}>
            A cada vida alcançada é um novo capítulo na nossa caminhada.
            Descubra abaixo como fazer parte da nossa base estratégica.
          </p>
        </div>

      </div>
    </section>
  );
}