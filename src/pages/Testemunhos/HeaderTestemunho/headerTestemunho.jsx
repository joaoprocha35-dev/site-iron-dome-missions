import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './headerTestemunho.module.scss';

// ── Constantes de conteúdo (fácil manutenção sem tocar no JSX) ──
const RESTRICTED_LABEL  = 'ACESSO RESTRITO: ACADEMIA DE OPERAÇÕES ESPECIAIS';
const BADGE_LABEL       = 'RELATÓRIOS DE CAMPO';
const HEADLINE_LINE1    = 'BALÍSTICA SUPERIOR.';
const HEADLINE_LINE2    = 'RELATÓRIOS DE MISSÃO.';
const SUBTITLE_GREEN    = 'NOSSA FORÇA DE SERVIÇO';
const TAGLINE           =
  '"Revista-te da melhor proteção tática, para garantir tua integridade e o sucesso da missão."';

/**
 * HeaderTestemunho
 * Renderiza o cabeçalho completo da seção de testemunhos.
 * 100% Responsivo com Bootstrap e integrado com CSS Modules.
 */
const HeaderTestemunho = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    /**
     * IntersectionObserver via Data-Attribute:
     * Evita problemas de hash com as classes geradas pelo CSS Modules.
     */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-visible', 'true');
          observer.disconnect(); // Anima apenas uma vez na viewport
        }
      },
      { threshold: 0.2 }
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
      {/* ── Top Bar: Acesso Restrito ── */}
      <div className={styles['ht-header__topbar']} aria-label="Nível de acesso">
        <span className={styles['ht-header__topbar-icon']} aria-hidden="true">🔒</span>
        <span className={styles['ht-header__topbar-text']}>{RESTRICTED_LABEL}</span>
        <span className={styles['ht-header__topbar-icon']} aria-hidden="true">🔒</span>
      </div>

      {/* ── Corpo central do header com Grid Responsivo Bootstrap ── */}
      <Container className={`${styles['ht-header__body']} py-5`}>
        <Row className="justify-content-center text-center">
          <Col xs={12} md={10} lg={8}>
            
            {/* Badge de categoria */}
            <div className={styles['ht-header__badge']} aria-label="Categoria">
              <span className={styles['ht-header__badge-dot']} aria-hidden="true" />
              {BADGE_LABEL}
            </div>

            {/* Linha decorativa animada superior */}
            <div className={`${styles['ht-header__deco-line']} ${styles['ht-header__deco-line--top']}`} aria-hidden="true" />

            {/* Título principal — animação stagger por linha */}
            <h1 className={styles['ht-header__headline']} aria-label={`${HEADLINE_LINE1} ${HEADLINE_LINE2}`}>
              <span className={`${styles['ht-header__headline-line']} ${styles['ht-header__headline-line--1']} d-block`}>
                {HEADLINE_LINE1}
              </span>
              <span className={`${styles['ht-header__headline-line']} ${styles['ht-header__headline-line--2']} d-block`}>
                {HEADLINE_LINE2}
              </span>
            </h1>

            {/* Subtítulo em verde tático — destaque principal */}
            <p className={styles['ht-header__subtitle']} aria-label={SUBTITLE_GREEN}>
              {SUBTITLE_GREEN}
            </p>

            {/* Linha decorativa animada inferior */}
            <div className={`${styles['ht-header__deco-line']} ${styles['ht-header__deco-line--bottom']}`} aria-hidden="true" />

            {/* Tagline / citação */}
            <blockquote className={`${styles['ht-header__tagline']} mx-auto px-3`}>
              {TAGLINE}
            </blockquote>

          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default HeaderTestemunho;