// ============================================================
// LandingPage.jsx — Portal de Entrada Iron Dome (Sênior Version)
// ============================================================

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.scss';
import imagemSoldado from '../../assets/imagensHome/soldado.avif';

/**
 * COMPONENTE ISOLADO: TacticalCounter
 * Controla a subida do número partindo do 0 até o valor alvo de forma linear e fluida.
 * Usa requestAnimationFrame para garantir performance máxima sem engasgos de processamento.
 */
function TacticalCounter({ targetValue, prefix = "", suffix = "" }) {
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    const animationDuration = 3000; // Tempo total da subida (3 segundos para melhor apreciação)
    let animationFrameId;
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);

      // Cálculo do valor atual baseado no progresso da animação
      const nextCount = Math.floor(progress * targetValue);
      setCurrentCount(nextCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };

    animationFrameId = requestAnimationFrame(updateNumber);

    // Limpeza de memória ao desmontar o componente
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue]);

  return <span className="hero-stat-value">{prefix}{currentCount}{suffix}</span>;
}

function LandingPage() {
  const navigate = useNavigate();
  const embers = Array.from({ length: 20 });

  // Strings decompostas em arrays para podermos animar caractere por caractere via CSS
  const txtIron = "IRON";
  const txtDome = "DOME";

  return (
    <section className="hero-section">

      {/* BACKGROUND E CAMADAS DE CORTE VISUAL */}
      <div className="hero-background">
        <img
          src={imagemSoldado}
          alt="Operação Iron Dome"
          className="hero-background-image"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* SISTEMA DE PARTÍCULAS (BRASAS ATMOSFÉRICAS) */}
      <div className="ember-container">
        {embers.map((_, index) => (
          <div key={index} className="ember-particle" />
        ))}
      </div>

      {/* CONTEÚDO OPERACIONAL */}
      <div className="container position-relative z-2 text-center text-white px-4">

        {/* BADGE BÍBLICO SUPERIOR */}
        <div className="hero-badge-wrapper mb-4">
          <div className="hero-badge">
            <span className="hero-badge-icon"></span>
            2 Coríntios 10:4-5 • As armas com as quais lutamos não são humanas; ao contrário, são poderosas em Deus para destruir fortalezas.

            5Destruímos argumentos e toda pretensão que se levanta contra o conhecimento de Deus e levamos cativo todo pensamento, para torná-lo obediente a Cristo.
          </div>
        </div>

        {/* TÍTULO PRINCIPAL (Efeito Typewriter Cadenciado / Lento) */}
        <h1 className="hero-title">
          <span className="hero-title-accent">
            {txtIron.split("").map((letter, idx) => (
              <span key={idx} style={{ '--letter-index': idx }}>{letter}</span>
            ))}
          </span>
          <span className="hero-title-main">
            {txtDome.split("").map((letter, idx) => (
              <span key={idx} style={{ '--letter-index': idx + txtIron.length }}>{letter}</span>
            ))}
          </span>
        </h1>

        {/* REVEAL WRAPPER: Sobe em bloco logo após a digitação do título */}
        <div className="hero-reveal-content">

          <p className="hero-subtitle mx-auto">
            Uma geração está sendo atacada pela ansiedade, pelo vazio e pela perda de identidade.
            O Iron Dome nasceu para levantar jovens preparados para vencer batalhas internas,
            restaurar sua fé e encontrar em Deus um refúgio inabalável.
          </p>

          <p
            className="fw-bold tracking-wide text-uppercase mt-4 mb-5"
            style={{ letterSpacing: '1px' }}
          >
            “Porque Deus não nos deu espírito de medo, mas de poder.” • 2 TIMÓTEO 1:7
          </p>

          {/* BOTÕES TÁTICOS */}
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center">
            <button className="hero-btn hero-btn-primary">
              <span className="hero-btn-icon hero-btn-icon-shield"></span>
              Quero fazer parte
            </button>

            <button className="hero-btn hero-btn-secondary" onClick={() => navigate('/home')}>
              <span className="hero-btn-icon hero-btn-icon-play"></span>
              Entrar no Portal
            </button>
          </div>

          {/* PAINEL DE MÉTRICAS (Contadores Progressivos ativos) */}
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