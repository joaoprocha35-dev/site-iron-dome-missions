/**
 * ============================================================
 * mainTestemunho.jsx
 * Componente: Seção Principal de Cards de Testemunhos
 * Projeto: Iron Dome — Tactical Mission Design System
 * ------------------------------------------------------------
 * Responsabilidades:
 * - Renderizar grid de cards de vídeo-testemunho
 * - Exibir avatar/thumbnail, nome, cargo e resumo de cada depoimento
 * - Animação stagger de entrada nos cards (via IntersectionObserver)
 * - Estado de hover com destaque em borda verde tática
 * - Badge de patente/cargo no avatar
 *
 * Props: nenhuma (dados mockados em TESTIMONIALS_DATA)
 *
 * Para adicionar/remover testemunhos:
 * - Edite o array TESTIMONIALS_DATA abaixo
 * - Cada item requer: id, name, role, unit, avatarInitials,
 * avatarColor, videoLabel, summary, rating
 *
 * Para conectar a uma API real:
 * - Substitua TESTIMONIALS_DATA por um hook (ex: useTestimonials)
 * - Mantenha a mesma estrutura de objeto por compatibilidade
 *
 * Dependências:
 * - mainTestemunho.scss (estilos locais)
 *
 * Manutenção:
 * - Classes seguem padrão BEM: .mt-[bloco]__[elemento]--[modificador]
 * - Ícones usam Unicode/emoji para zero dependência externa
 * ============================================================
 */

import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './mainTestemunho.module.scss';

// ── Dados dos testemunhos ─────────────────────────────────────
// MANUTENÇÃO: adicione novos depoimentos aqui sem tocar no JSX.
const TESTIMONIALS_DATA = [
  {
    id          : 1,
    name        : 'Lucas Pereira',
    role        : 'Policial Militar',
    unit        : 'P.M.',
    avatarInitials: 'LP',
    avatarColor : '#1a3a1a',
    accentColor : '#6cd106',
    videoLabel  : 'VIDEO REPORT',
    summary     : 'Depoimento sobre a Armadura M-9. Destaca a leveza e a proteção em operações de campo. Vídeo demonstra a flexibilidade do equipamento.',
    rating      : 5,
    tag         : 'MOBILIDADE',
  },
  {
    id          : 2,
    name        : 'Anderson Souza',
    role        : 'Sargento',
    unit        : 'B.O.P.E.',
    avatarInitials: 'AS',
    avatarColor : '#1a1a3a',
    accentColor : '#6cd106',
    videoLabel  : 'VIDEO REPORT',
    summary     : 'Relatório sobre a linha Elite Guard. Analisa o sistema modular e a proteção balística testada. Vídeo mostra testes de impacto.',
    rating      : 5,
    tag         : 'BALÍSTICA',
  },
  {
    id          : 3,
    name        : 'Maria Ferreira',
    role        : 'Bombeiro Civil',
    unit        : 'CBMSP',
    avatarInitials: 'MF',
    avatarColor : '#3a1a1a',
    accentColor : '#6cd106',
    videoLabel  : 'VIDEO REPORT',
    summary     : 'Depoimento sobre o material do M-9. Foca na mobilidade e na proteção térmica em resgates. Vídeo ilustra a resistência ao fogo.',
    rating      : 5,
    tag         : 'TÉRMICO',
  },
];

// ── Sub-componente: Estrelas de avaliação ─────────────────────
// Renderiza estrelas cheias/vazias com base no valor 0–5.
const StarRating = ({ value = 5 }) => (
  <div className={styles['mt-card__stars']} aria-label={`Avaliação: ${value} de 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`${styles['mt-card__star']} ${i < value ? styles['mt-card__star--filled'] : ''}`}
        aria-hidden="true"
      >
        ★
      </span>
    ))}
  </div>
);

// ── Sub-componente: Card individual ───────────────────────────
const TestimonyCard = ({ data, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    /**
     * IntersectionObserver por card:
     * Cada card anima independentemente ao entrar na viewport.
     * O delay de stagger é calculado via CSS custom property
     * '--mt-stagger-delay', que é passada como inline style.
     */
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
    <article
      ref={cardRef}
      className={styles['mt-card']}
      // Stagger delay: cada card atrasa 120ms a mais que o anterior
      style={{ '--mt-stagger-delay': `${index * 0.12}s` }}
      aria-label={`Testemunho de ${data.name}, ${data.role}`}
    >
      {/* ── Tag de categoria (canto superior direito) ── */}
      <span className={styles['mt-card__tag']} aria-label={`Categoria: ${data.tag}`}>
        {data.tag}
      </span>

      {/* ── Área do avatar + badge de unidade ── */}
      <div className={styles['mt-card__avatar-wrapper']}>
        <div
          className={styles['mt-card__avatar']}
          style={{ background: data.avatarColor }}
          aria-hidden="true"
        >
          <span className={styles['mt-card__avatar-initials']}>{data.avatarInitials}</span>

          {/* Ícone de play sobre o avatar — indica vídeo disponível */}
          <div className={styles['mt-card__play-overlay']} aria-hidden="true">
            <span className={styles['mt-card__play-icon']}>▶</span>
          </div>
        </div>

        {/* Badge de unidade (PM, BOPE, CBMSP…) */}
        <span className={styles['mt-unit-badge']}>{data.unit}</span>
      </div>

      {/* ── Label de vídeo ── */}
      <div className={styles['mt-card__video-label']} aria-hidden="true">
        <span className={styles['mt-card__video-dot']} />
        {data.videoLabel}
      </div>

      {/* ── Identidade do operador ── */}
      <div className={styles['mt-card__identity']}>
        <p className={styles['mt-card__role']}>{data.role}</p>
        <h3 className={styles['mt-card__name']}>{data.name}</h3>
      </div>

      {/* ── Avaliação ── */}
      <StarRating value={data.rating} />

      {/* ── Resumo do depoimento ── */}
      <div className={styles['mt-card__divider']} aria-hidden="true" />
      <p className={styles['mt-card__summary']}>
        <span className={styles['mt-card__summary-label']}>RESUMO DO VÍDEO: </span>
        {data.summary}
      </p>
    </article>
  );
};

// ── Componente principal exportado ────────────────────────────

/**
 * MainTestemunho
 * Renderiza a seção principal com o grid de cards de testemunho.
 * O sectionRef é usado para o observer do título da seção.
 */
const MainTestemunho = () => {
  const sectionRef = useRef(null);

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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles['mt-section']} py-5`}
      aria-labelledby="mt-section-title"
    >
      <Container>
        {/* ── Cabeçalho da seção ── */}
        <div className={`${styles['mt-section__header']} mb-5`}>
          <div className={styles['mt-section__header-line']} aria-hidden="true" />
          <h2 id="mt-section-title" className={styles['mt-section__title']}>
            <span className={styles['mt-section__title-count']}>
              {TESTIMONIALS_DATA.length}
            </span>
            {' '}OPERADORES RELATAM
          </h2>
          <div className={styles['mt-section__header-line']} aria-hidden="true" />
        </div>

        {/* ── Grid de cards utilizando Row/Col do Bootstrap ── */}
        <Row 
          className="g-4 justify-content-center" 
          role="list"
          aria-label="Lista de testemunhos de campo"
        >
          {TESTIMONIALS_DATA.map((item, idx) => (
            <Col 
              key={item.id} 
              xs={12} 
              sm={6} 
              lg={4} 
              role="listitem"
              className="d-flex justify-content-center"
            >
              <TestimonyCard data={item} index={idx} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MainTestemunho;