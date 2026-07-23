// ============================================================
// LandingPage.jsx — Portal de Entrada Iron Dome
// ============================================================
// ALTERAÇÕES REALIZADAS:
//   1. Removido o segundo botão "Quero Fazer Parte"
//   2. Botão único "Entrar no Portal" mantido e aprimorado
//   3. Seta trocada pela seta clássica estilo Bootstrap (→)
//      com animação arrowBounce fluida (vai-e-volta com pausa no pico)
//   4. Hover: seta pausa a animação e avança 6px para a direita
// ============================================================

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.scss';
import imagemSoldado from '../../assets/imagensHome/soldado.avif';

/**
 * COMPONENTE ISOLADO: TacticalCounter
 * ------------------------------------------------------------
 * Anima um número de 0 até `targetValue` em 3 segundos usando
 * requestAnimationFrame para garantir fluidez máxima sem
 * travar a thread principal ou causar re-renders desnecessários.
 *
 * Props:
 *   targetValue {number} — valor final da contagem
 *   prefix      {string} — texto antes do número (ex: "+")
 *   suffix      {string} — texto depois do número (ex: "%")
 */
function TacticalCounter({ targetValue, prefix = "", suffix = "" }) {
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    const animationDuration = 3000; // 3 segundos de subida linear
    let animationFrameId;
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);
      const nextCount = Math.floor(progress * targetValue);
      setCurrentCount(nextCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };

    animationFrameId = requestAnimationFrame(updateNumber);

    // Cleanup: cancela o frame ao desmontar o componente
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue]);

  return (
    <span className="hero-stat-value">
      {prefix}{currentCount}{suffix}
    </span>
  );
}

/**
 * COMPONENTE PRINCIPAL: LandingPage
 * ------------------------------------------------------------
 * Tela de entrada do portal Iron Dome. Estrutura:
 *   - Background com imagem + overlay escuro
 *   - Sistema de partículas (brasas atmosféricas)
 *   - Badge bíblico superior
 *   - Título com efeito typewriter letra por letra
 *   - Bloco de conteúdo com reveal de baixo para cima
 *   - Botão único "Entrar no Portal" com borda animada verde
 *   - Painel de métricas com contadores animados
 */
function LandingPage() {
  const navigate = useNavigate();

  // 25 partículas — quantidade densa mas performática
  const embers = Array.from({ length: 25 });

  const txtIron = "IRON";
  const txtDome = "DOME";

  return (
    <section className="hero-section">

      {/* ── BACKGROUND: imagem com filtro escuro + overlay gradiente ── */}
      <div className="hero-background">
        <img
          src={imagemSoldado}
          alt="Operação Iron Dome"
          className="hero-background-image"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* ── PARTÍCULAS: brasas de fogo atmosféricas (decorativo) ── */}
      <div className="ember-container" aria-hidden="true">
        {embers.map((_, index) => (
          <div key={index} className="ember-particle" />
        ))}
      </div>

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <div className="container position-relative z-2 text-center text-white px-4">

        {/* BADGE BÍBLICO — aparece com fadeIn antes do título */}
        <div className="hero-badge-wrapper mb-4">
          <div className="hero-badge">
            <span className="hero-badge-icon"></span>
            2 Coríntios 10:4-5 • As armas com as quais lutamos não são humanas; ao contrário,
            são poderosas em Deus para destruir fortalezas. Destruímos argumentos e toda pretensão
            que se levanta contra o conhecimento de Deus e levamos cativo todo pensamento,
            para torná-lo obediente a Cristo.
          </div>
        </div>

        {/* TÍTULO — efeito typewriter: cada letra entra com delay escalonado */}
        <h1 className="hero-title">
          {/* "IRON" — acento em verde tático */}
          <span className="hero-title-accent">
            {txtIron.split("").map((letter, idx) => (
              <span key={idx} style={{ '--letter-index': idx }}>{letter}</span>
            ))}
          </span>
          {/* "DOME" — branco com sombra profunda */}
          <span className="hero-title-main">
            {txtDome.split("").map((letter, idx) => (
              <span key={idx} style={{ '--letter-index': idx + txtIron.length }}>{letter}</span>
            ))}
          </span>
        </h1>

        {/* BLOCO REVEAL — sobe em bloco após a digitação do título (delay 1.2s) */}
        <div className="hero-reveal-content">

          {/* Subtítulo descritivo da missão */}
          <p className="hero-subtitle mx-auto">
            Uma geração está sendo atacada pela ansiedade, pelo vazio e pela perda de identidade.
            O Iron Dome nasceu para levantar jovens preparados para vencer batalhas internas,
            restaurar sua fé e encontrar em Deus um refúgio inabalável.
          </p>

          {/* Versículo de apoio */}
          <p
            className="fw-bold tracking-wide text-uppercase mt-4 mb-5"
            style={{ letterSpacing: '1px' }}
          >
            "Porque Deus não nos deu espírito de medo, mas de poder." • 2 TIMÓTEO 1:7
          </p>

          {/* ── BOTÃO ÚNICO: "Entrar no Portal" ──────────────────────────
              Estrutura em camadas:
              - <button>          → overflow: hidden + padding 1.5px = espaço da borda
              - ::before          → conic-gradient girando = trilha luminosa verde
              - .hero-btn-mask    → fundo escuro interno que "tampona" o centro
              - .hero-btn-text    → label em uppercase
              - .hero-btn-icon    → seta Bootstrap (→) com animação arrowBounce
          ─────────────────────────────────────────────────────────────── */}
          <div className="d-flex justify-content-center align-items-center">
            <button className="hero-btn" onClick={() => navigate('/home')}>
              <span className="hero-btn-mask">
                <span className="hero-btn-text">Entrar no Portal</span>

                {/* Seta estilo Bootstrap com animação bounce contínua */}
                <span className="hero-btn-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="13 6 19 12 13 18" />
                  </svg>
                </span>
              </span>
            </button>
          </div>

          {/* ── PAINEL DE MÉTRICAS: 4 contadores animados ── */}
          <div className="hero-stats d-flex justify-content-center align-items-center gap-2 gap-md-4 mt-5 pt-5 flex-wrap">

            <div className="hero-stat-item">
              <TacticalCounter targetValue={600} prefix="+" />
              <span className="hero-stat-label">JOVENS IMPACTADOS</span>
            </div>

            <div className="hero-stat-divider d-none d-sm-block"></div>

            <div className="hero-stat-item">
              <TacticalCounter targetValue={8} />
              <span className="hero-stat-label">EDIÇÕES REALIZADAS</span>
            </div>

            <div className="hero-stat-divider d-none d-sm-block"></div>

            <div className="hero-stat-item">
              <TacticalCounter targetValue={40} prefix="+" />
              <span className="hero-stat-label">DENOMINAÇÕES ENVOLVIDAS</span>
            </div>

            <div className="hero-stat-divider d-none d-sm-block"></div>

            <div className="hero-stat-item">
              <TacticalCounter targetValue={17} />
              <span className="hero-stat-label">ANOS DE MISSÃO</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;