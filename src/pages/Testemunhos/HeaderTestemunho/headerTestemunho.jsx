// ============================================================
// headerTestemunho.jsx — Header da Tela de Testemunhos
// Projeto: Iron Dome — Tactical Mission Design System
// ============================================================
// Estrutura visual (de cima para baixo):
//   1. Top Bar         → "ACESSO RESTRITO" + contador de operadores ativos
//   2. Badge           → "RELATÓRIOS DE CAMPO VERIFICADOS" com shimmer
//   3. Linha deco      → expande de 0 → 80px ao entrar na viewport
//   4. Título h1       → duas linhas com typewriter letra por letra
//   5. Subtítulo verde → label de categoria tática
//   6. Linha deco      → segunda linha decorativa
//   7. Barras de acesso→ 4 níveis visuais de classificação
//   8. Tagline         → citação bíblica estilizada em blockquote
//
// Animações:
//   IntersectionObserver injeta data-visible="true" no <header>.
//   O CSS reage a esse atributo para disparar todas as transições.
//   Cada letra do título usa CSS custom property --i para
//   calcular seu animation-delay individualmente (typewriter).
// ============================================================

import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './headerTestemunho.module.scss';
import HeaderParticles from './headerParticles';

// ── Constantes de conteúdo ─────────────────────────────────────
const RESTRICTED_LABEL = 'ARQUIVOS REAIS DE TRANSFORMAÇÃO';
const BADGE_LABEL      = 'RELATÓRIOS SELECIONADOS DA LINHA DE FRENTE';
const HEADLINE_LINE1   = 'O QUE NINGUÉM CONTA.';
const HEADLINE_LINE2   = 'PROVA DO CAMPO.';
const SUBTITLE_LABEL   = 'ROLE PARA BAIXO PARA ACESSAR OS DEPOIMENTOS DE QUEM SOBREVIVEU E VENCEU';
const TAGLINE          = '"A história é escrita pelos sobreviventes. Role e veja a verdade gravada nas cicatrizes de quem não recuou."';
const ACTIVE_COUNT     = '847+';

// Níveis de classificação visual — barras de acesso
const ACCESS_LEVELS = [
  { label: 'PÚBLICO',      active: true  },
  { label: 'RESTRITO',     active: true  },
  { label: 'CONFIDENCIAL', active: true  },
  { label: 'SECRETO',      active: false },
];

const HeaderTestemunho = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-visible', 'true');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={styles['ht-header']}
      ref={headerRef}
      role="banner"
    >
      <HeaderParticles />
      {/* ── 1. Top Bar ─────────────────────────────────────── */}
      <div className={styles['ht-header__topbar']} aria-label="Status do sistema">

        {/* Lado esquerdo: status de acesso restrito */}
        <div className={styles['ht-header__topbar-left']}>
          <span className={styles['ht-header__topbar-dot']} aria-hidden="true" />
          <span className={styles['ht-header__topbar-text']}>{RESTRICTED_LABEL}</span>
        </div>

        {/* Lado direito: contador de operadores ativos ao vivo */}
        <div className={styles['ht-header__topbar-right']}>
          <span className={styles['ht-header__topbar-live']} aria-hidden="true" />
          <span className={styles['ht-header__topbar-count']}>
            {ACTIVE_COUNT} Total de pessoas transformadas pelo projeto.
          </span>
        </div>

      </div>

      {/* ── 2–8. Corpo central ─────────────────────────────── */}
      <Container className={styles['ht-header__body']}>
        <Row className="justify-content-center text-center">
          {/* CORREÇÃO: Alterado de lg={7} para lg={10} para abrir espaço para o título */}
          <Col xs={12} md={10} lg={10}>

            {/* 2. Badge com shimmer */}
            <div
              className={styles['ht-header__badge']}
              aria-label="Categoria do conteúdo"
            >
              <span className={styles['ht-header__badge-dot']} aria-hidden="true" />
              <span className={styles['ht-header__badge-text']}>{BADGE_LABEL}</span>
            </div>

            {/* 3. Linha decorativa superior */}
            <div className={styles['ht-header__deco-line']} aria-hidden="true" />

            {/* 4. Título principal — typewriter letra por letra */}
            <h1
              className={styles['ht-header__headline']}
              aria-label={`${HEADLINE_LINE1} ${HEADLINE_LINE2}`}
            >
              {/* Linha 1: branca */}
              <span
                className={`${styles['ht-header__hl-line']} ${styles['ht-header__hl-line--1']} d-block`}
              >
                {HEADLINE_LINE1.split('').map((char, i) => (
                  <span
                    key={i}
                    className={styles['ht-header__hl-char']}
                    style={{ '--i': i }}
                    aria-hidden="true"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>

              {/* Linha 2: verde tático — delay continua da linha 1 */}
              <span
                className={`${styles['ht-header__hl-line']} ${styles['ht-header__hl-line--2']} d-block`}
              >
                {HEADLINE_LINE2.split('').map((char, i) => (
                  <span
                    key={i}
                    className={styles['ht-header__hl-char']}
                    style={{ '--i': HEADLINE_LINE1.length + i }}
                    aria-hidden="true"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>

              {/* Texto real para leitores de tela */}
              <span className="visually-hidden">
                {HEADLINE_LINE1} {HEADLINE_LINE2}
              </span>
            </h1>

            {/* 5. Subtítulo verde */}
            <p className={styles['ht-header__subtitle']}>{SUBTITLE_LABEL}</p>

            {/* 6. Linha decorativa inferior */}
            <div className={styles['ht-header__deco-line']} aria-hidden="true" />

            {/* 7. Barras de nível de acesso */}
            <div
              className={styles['ht-header__access']}
              role="group"
              aria-label="Nível de classificação de acesso"
            >
              {ACCESS_LEVELS.map((level) => (
                <div
                  key={level.label}
                  className={[
                    styles['ht-header__access-item'],
                    level.active ? styles['ht-header__access-item--active'] : '',
                  ].join(' ')}
                  aria-label={`${level.label}: ${level.active ? 'liberado' : 'bloqueado'}`}
                >
                  <span className={styles['ht-header__access-bar']} aria-hidden="true" />
                  <span className={styles['ht-header__access-label']}>{level.label}</span>
                </div>
              ))}
            </div>

            {/* 8. Tagline / citação bíblica */}
            <blockquote className={styles['ht-header__tagline']}>
              {TAGLINE}
            </blockquote>

          </Col>
        </Row>
      </Container>

    </header>
  );
};

export default HeaderTestemunho;