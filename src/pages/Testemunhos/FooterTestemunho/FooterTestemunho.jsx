// ============================================================
// footerTestemunho.jsx — Footer da Tela de Testemunhos
// Projeto: Iron Dome — Tactical Mission Design System
// ============================================================

import { useEffect, useRef, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './FooterTestemunho.module.scss';
import FooterParticles from './FooterParticles';

// Configuração do WhatsApp do Operador
const WHATSAPP_PHONE = '5514998813787'; // DDI + DDD + Número

// ── Constantes do Botão 1: QUERO PARTICIPAR ──
const PROMPT_NOVO = 'Gostou do que viu? Mande uma mensagem para nós e saiba como participar.';
const BTN_NOVO    = 'QUERO PARTICIPAR';
const MSG_NOVO    = 'Eu fiquei muito interessada(o) em participar do Iron Dome, como que eu faço?';

// ── Constantes do Botão 2: VETERANOS ──
const PROMPT_VET  = 'Já participou do Iron Dome e quer enviar seu relatório em vídeo? Aperte aqui.';
const BTN_VET     = 'ENVIAR RELATÓRIO TÁTICO';
const MSG_VET     = 'Olá! Participei/sirvo no Encontro Iron Dome e gostaria de enviar meu testemunho para o projeto.';

// Estatísticas exibidas na faixa superior
const STATS_DATA = [
  { value: '12', label: 'RELATÓRIOS ATIVOS',    icon: '🎖️' },
  { value: '8',  label: 'TEMÁTICAS DE COMBATE', icon: '🎯' },
  { value: '4.97', label: 'MÉDIA DE AVALIAÇÃO', icon: '⭐' },
  { value: '100%', label: 'SATISFAÇÃO',         icon: '🛡️' },
];

// Links do rodapé legal
const FOOTER_LINKS = [
  { label: 'Política de Privacidade', href: '#' },
  { label: 'Termos de Uso',           href: '#' },
  { label: 'Suporte Tático',          href: '#' },
];

const BRAND_NAME = 'IRON DOME';
const COPYRIGHT  = `© ${new Date().getFullYear()} Iron Dome — Todos os direitos reservados.`;

const FooterTestemunho = () => {
  const sectionRef = useRef(null);

  // IntersectionObserver: injeta data-visible para animar os filhos
  useEffect(() => {
    const el = sectionRef.current;
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

  // Redirecionamentos para WhatsApp
  const handleWhatsAppNovo = useCallback(() => {
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(MSG_NOVO)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleWhatsAppVet = useCallback(() => {
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(MSG_VET)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <footer
      ref={sectionRef}
      className={styles['ft-footer']}
      aria-label="Estatísticas, chamada para ação e rodapé"
    >
      <FooterParticles />
      <Container fluid className="px-0">

        {/* ── 1. Faixa de estatísticas ──────────────────────── */}
        <div
          className={styles['ft-footer__stats']}
          role="list"
          aria-label="Estatísticas de campo"
        >
          <Container>
            <Row className="g-3 text-center justify-content-center">
              {STATS_DATA.map((stat, i) => (
                <Col
                  key={stat.label}
                  xs={6}
                  md={3}
                  className="d-flex justify-content-center"
                >
                  <div
                    className={styles['ft-footer__stat']}
                    role="listitem"
                    style={{ '--ft-stat-delay': `${i * 0.1}s` }}
                    aria-label={`${stat.label}: ${stat.value}`}
                  >
                    <span
                      className={styles['ft-footer__stat-icon']}
                      aria-hidden="true"
                    >
                      {stat.icon}
                    </span>
                    <span className={styles['ft-footer__stat-value']}>
                      {stat.value}
                    </span>
                    <span className={styles['ft-footer__stat-label']}>
                      {stat.label}
                    </span>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        {/* ── 2. Bloco CTA ──────────────────────────────────── */}
        <div className={styles['ft-footer__cta']}>
          <Container>
            <Row className="justify-content-center text-center">
              <Col xs={12} lg={10}>

                {/* Linha decorativa superior */}
                <div
                  className={styles['ft-footer__cta-line']}
                  aria-hidden="true"
                />

                {/* CONTAINER DAS AÇÕES TÁTICAS (2 COLUNAS) */}
                <Row className="g-5 mt-3 mb-5 justify-content-center">
                  
                  {/* Bloco 1: Quero Participar */}
                  <Col xs={12} md={6} className="d-flex flex-column align-items-center">
                    <p className={styles['ft-cta-prompt']}>{PROMPT_NOVO}</p>
                    <button
                      className={styles['ft-glass-btn']}
                      onClick={handleWhatsAppNovo}
                      type="button"
                    >
                      <span className={styles['ft-glass-btn-icon']} aria-hidden="true">🎯</span>
                      <span className={styles['ft-glass-btn-text']}>{BTN_NOVO}</span>
                    </button>
                  </Col>

                  {/* Bloco 2: Enviar Relatório */}
                  <Col xs={12} md={6} className="d-flex flex-column align-items-center">
                    <p className={styles['ft-cta-prompt']}>{PROMPT_VET}</p>
                    <button
                      className={styles['ft-glass-btn']}
                      onClick={handleWhatsAppVet}
                      type="button"
                    >
                      <span className={styles['ft-glass-btn-icon']} aria-hidden="true">📋</span>
                      <span className={styles['ft-glass-btn-text']}>{BTN_VET}</span>
                    </button>
                  </Col>

                </Row>

                {/* CTA SECUNDÁRIO: RETORNO DIRETAMENTE À ROTA HISTÓRIA */}
                <div className={styles['ft-back-home-block']}>
                  <a href="/historia" className={styles['ft-back-home-link']}>
                    <span className={styles['ft-back-home-icon']}>←</span>
                    RETORNAR AO QG PRINCIPAL
                  </a>
                </div>

                {/* Linha decorativa inferior */}
                <div
                  className={styles['ft-footer__cta-line']}
                  aria-hidden="true"
                />

              </Col>
            </Row>
          </Container>
        </div>

        {/* ── 3. Rodapé legal ───────────────────────────────── */}
        <div className={styles['ft-footer__legal']}>
          <Container>
            <Row className="align-items-center g-3 text-center text-md-start">
              {/* Brand */}
              <Col xs={12} md={4}>
                <span
                  className={styles['ft-footer__brand']}
                  aria-label={`Marca: ${BRAND_NAME}`}
                >
                  {BRAND_NAME}
                </span>
              </Col>

              {/* Links legais */}
              <Col xs={12} md={4} className="d-flex justify-content-center">
                <nav
                  className={styles['ft-footer__links']}
                  aria-label="Links legais do rodapé"
                >
                  {FOOTER_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={styles['ft-footer__link']}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </Col>

              {/* Copyright */}
              <Col xs={12} md={4} className="text-center text-md-end">
                <p className={styles['ft-footer__copy']}>{COPYRIGHT}</p>
              </Col>
            </Row>
          </Container>
        </div>

      </Container>
    </footer>
  );
};

export default FooterTestemunho;