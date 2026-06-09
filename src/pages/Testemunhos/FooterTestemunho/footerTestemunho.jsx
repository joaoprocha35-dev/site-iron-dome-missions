/**
 * ============================================================
 * footerTestemunho.jsx
 * Componente: Footer / CTA da Tela de Testemunhos
 * Projeto: Iron Dome — Tactical Mission Design System
 * ------------------------------------------------------------
 * Responsabilidades:
 * - Exibir call-to-action principal ("OPERADOR, REGISTRE…")
 * - Renderizar botão de envio de relatório tático com efeito ripple
 * - Mostrar estatísticas resumidas (total de operadores, missões, avaliação)
 * - Exibir rodapé com copyright e links táticos
 *
 * Props: nenhuma
 *
 * Eventos do botão CTA:
 * - onClick: dispara handleReportClick()
 * - Integrado com react-router-dom para gerenciamento real de rotas.
 *
 * Para alterar estatísticas exibidas:
 * - Edite o array STATS_DATA
 *
 * Dependências:
 * - footerTestemunho.scss (estilos locais)
 * - react-router-dom (Roteamento tático)
 *
 * Manutenção:
 * - Classes BEM: .ft-[bloco]__[elemento]--[modificador]
 * - O efeito ripple do botão é 100% CSS, não precisa de lib
 * ============================================================
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './footerTestemunho.module.scss';

// ── Constantes de conteúdo ─────────────────────────────────────
const CTA_LABEL     = 'OPERADOR, REGISTRE TUA EXPERIÊNCIA DE CAMPO';
const CTA_BUTTON    = 'ENVIAR RELATÓRIO TÁTICO';
const CTA_SUBLABEL  = 'Tua experiência fortalece a missão de todo o time.';

// ── Estatísticas exibidas na faixa de dados ────────────────────
// MANUTENÇÃO: ajuste os valores ou adicione novos itens aqui.
const STATS_DATA = [
  { value: '847+',  label: 'Operadores',    icon: '🎖️' },
  { value: '1.2K',  label: 'Missões',       icon: '🎯' },
  { value: '4.97',  label: 'Avg. Rating',   icon: '⭐' },
  { value: '100%',  label: 'Satisfação',    icon: '🛡️' },
];

// ── Constantes do rodapé ───────────────────────────────────────
const FOOTER_BRAND   = 'IRON DOME';
const FOOTER_COPY    = `© ${new Date().getFullYear()} Iron Dome — Todos os direitos reservados.`;
const FOOTER_LINKS   = [
  { label: 'Política de Privacidade', href: '#' },
  { label: 'Termos de Uso',           href: '#' },
  { label: 'Suporte Tático',          href: '#' },
];

/**
 * FooterTestemunho
 * Renderiza o bloco de CTA + estatísticas + rodapé da tela.
 * 100% Responsivo com Bootstrap, CSS Modules e Roteamento ativo.
 */
const FooterTestemunho = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // ── IntersectionObserver para animações de entrada ──────────
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

  /**
   * handleReportClick
   * Handler do botão CTA com redirecionamento de rota real.
   * Redireciona o operador para a rota do formulário de relatório.
   */
  const handleReportClick = useCallback(() => {
    console.log('[Iron Dome] CTA clicado: Redirecionando para rota de relatório');
    navigate('/relatorio-tatico');
  }, [navigate]);

  return (
    <footer
      ref={sectionRef}
      className={styles['ft-footer']}
      aria-label="Seção de chamada para ação e rodapé"
    >
      <Container fluid className="px-0">
        
        {/* ── Faixa de estatísticas responsiva com Bootstrap ── */}
        <div className={styles['ft-footer__stats']} role="list" aria-label="Estatísticas de campo">
          <Container>
            <Row className="g-4 text-center justify-content-center">
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
                  >
                    <span className={styles['ft-footer__stat-icon']} aria-hidden="true">{stat.icon}</span>
                    <span className={styles['ft-footer__stat-value']}>{stat.value}</span>
                    <span className={styles['ft-footer__stat-label']}>{stat.label}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        {/* ── CTA principal centralizado ── */}
        <div className={styles['ft-footer__cta']}>
          <Container>
            <Row className="justify-content-center text-center">
              <Col xs={12} lg={8}>
                {/* Linha decorativa superior do CTA */}
                <div className={styles['ft-footer__cta-line']} aria-hidden="true" />

                <p className={styles['ft-footer__cta-title']}>{CTA_LABEL}</p>
                <p className={styles['ft-footer__cta-sub']}>{CTA_SUBLABEL}</p>

                {/* Botão CTA com efeito ripple */}
                <button
                  className={styles['ft-footer__cta-btn']}
                  onClick={handleReportClick}
                  type="button"
                  aria-label={CTA_BUTTON}
                >
                  <span className={styles['ft-footer__cta-btn-icon']} aria-hidden="true">📋</span>
                  {CTA_BUTTON}
                </button>

                {/* Linha decorativa inferior do CTA */}
                <div className={styles['ft-footer__cta-line']} aria-hidden="true" />
              </Col>
            </Row>
          </Container>
        </div>

        {/* ── Rodapé legal com Grid alinhado ── */}
        <div className={styles['ft-footer__legal']}>
          <Container>
            <Row className="align-items-center g-3 text-center text-md-start">
              <Col xs={12} md={4}>
                <span className={styles['ft-footer__brand']} aria-label={`Iron Dome — ${FOOTER_BRAND}`}>
                  {FOOTER_BRAND}
                </span>
              </Col>
              
              <Col xs={12} md={4} className="d-flex justify-content-center">
                <nav
                  className={styles['ft-footer__links']}
                  aria-label="Links do rodapé"
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

              <Col xs={12} md={4} className="text-center text-md-end">
                <p className={styles['ft-footer__copy']}>{FOOTER_COPY}</p>
              </Col>
            </Row>
          </Container>
        </div>

      </Container>
    </footer>
  );
};

export default FooterTestemunho;