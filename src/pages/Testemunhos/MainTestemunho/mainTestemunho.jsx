// ============================================================
// mainTestemunho.jsx — Grid de 12 Cards de Testemunho
// Projeto: Iron Dome — Design System Civil
// ============================================================
// Estrutura visual:
//   1. Cabeçalho da seção  → "N DEPOIMENTOS" com linhas deco
//   2. Filtro por tema     → botões de tag para filtrar os cards
//   3. Grid de cards       → 12 cards em layout responsivo Bootstrap
//
// Cada card contém:
//   - Tag de tema (canto superior)
//   - Vídeo com lazy load (thumbnail → iframe só ao clicar)
//   - Label "RELATÓRIO EM VÍDEO" com ponto piscante
//   - Avatar com iniciais + identidade (cargo e nome)
//   - Avaliação em estrelas
//   - Divisória + resumo textual
//
// Estratégia de animação:
//   DESKTOP (> 768px):
//     Cards entram em cascata da esq para dir via @keyframes
//     mtCardReveal com animation-delay = --mt-stagger-delay (index * 0.1s).
//     A animação fica pausada até a seção receber data-visible="true".
//
//   MOBILE (≤ 768px):
//     Cada card tem IntersectionObserver próprio (threshold 0.15).
//     Ao entrar na viewport → data-visible="true" → transição suave.
//     Ao SAIR da viewport → data-visible removido → volta ao estado oculto.
//     Isso libera memória e torna a rolagem ultra leve no celular.
//
// Lazy loading de vídeo:
//   Estado inicial: apenas a thumbnail do YouTube (hqdefault).
//   URL: https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg
//   Ao clicar no play → substitui pelo iframe com autoplay=1.
//   O iframe nunca é criado antes do clique (zero impacto na banda).
//
// MANUTENÇÃO:
//   Para adicionar/editar cards, edite apenas TESTIMONIALS_DATA.
//   videoId: substitua 'ID_DO_VIDEO_AQUI' pelo ID de 11 chars do YouTube.
// ============================================================

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './mainTestemunho.module.scss';

// ── Dados dos 12 testemunhos (Alternando entre Encontristas e Servos) ──
const TESTIMONIALS_DATA = [
  {
    id            : 1,
    name          : 'Lucas Pereira',
    role          : 'Encontrista',
    avatarInitials: 'LP',
    avatarColor   : '#0d2b1a',
    tag           : 'IDENTIDADE',
    rating        : 5,
    videoId       : 'ID_DO_VIDEO_AQUI',
    summary       : 'Lucas descreve como o Iron Dome o ajudou a reconstruir sua identidade depois de anos se sentindo vazio e focado apenas em metas comerciais. A fé voltou a ser o centro da sua vida e dos seus negócios.',
  },
  {
    id            : 2,
    name          : 'Anderson Souza',
    role          : 'Servo',
    avatarInitials: 'AS',
    avatarColor   : '#0d1a2b',
    tag           : 'ANSIEDADE',
    rating        : 5,
    videoId       : 'ID_DO_VIDEO_AQUI',
    summary       : 'Anderson vencia grandes desafios profissionais no mercado de trabalho, mas perdia as batalhas internas. O programa o ensinou a confrontar a ansiedade com ferramentas concretas ancoradas na Palavra.',
  },
  {
    id            : 3,
    name          : 'Maria Ferreira',
    role          : 'Encontrista',
    avatarInitials: 'MF',
    avatarColor   : '#2b0d0d',
    tag           : 'FÉ',
    rating        : 5,
    videoId       : 'ID_DO_VIDEO_AQUI',
    summary       : 'Maria reencontrou sua fé depois de passar por um período de forte estresse profissional. O suporte espiritual do Iron Dome foi decisivo para sua recuperação emocional e paixão pela carreira.',
  },
  {
    id            : 4,
    name          : 'Rafael Oliveira',
    role          : 'Servo',
    avatarInitials: 'RO',
    avatarColor   : '#1a1a0d',
    tag           : 'PROPÓSITO',
    rating        : 5,
    videoId       : 'ID_DO_VIDEO_AQUI',
    summary       : 'Rafael chegou ao Iron Dome sem saber qual rumo tomar ou o que queria do futuro. Saiu com clareza de propósito, direção vocacional e uma comunidade que o sustenta diariamente.',
  },
  {
    id            : 5,
    name          : 'Thiago Mendes',
    role          : 'Encontrista',
    avatarInitials: 'TM',
    avatarColor   : '#1a0d2b',
    tag           : 'RESTAURAÇÃO',
    rating        : 5,
    videoId       : 'ID_DO_VIDEO_AQUI',
    summary       : 'Thiago trabalhava num ambiente corporativo exaustivo que sufocava sua espiritualidade. O Iron Dome foi o espaço seguro que ele precisava para restaurar sua relação com Deus.',
  },
  {
    id            : 6,
    name          : 'Camila Torres',
    role          : 'Servo',
    avatarInitials: 'CT',
    avatarColor   : '#2b1a0d',
    tag           : 'ESGOTAMENTO',
    rating        : 5,
    videoId       : 'ID_DO_VIDEO_AQUI',
    summary       : 'Após enfrentar uma rotina desgastante na área da saúde, Camila estava no limite do esgotamento. O programa a ajudou a distinguir o cuidar dos outros de se destruir para servi-los.',
  },
  {
    id            : 7,
    name          : 'Felipe Costa',
    role          : 'Encontrista',
    avatarInitials: 'FC',
    avatarColor   : '#0d2b0d',
    tag           : 'LIDERANÇA',
    rating        : 5,
    videoId       : 'ID_DO_VIDEO_AQUI',
    summary       : 'Felipe queria ser um líder melhor para sua equipe no escritório. O Iron Dome o ensinou que a liderança genuína e influente começa com autoconhecimento e espírito de serviço.',
  },
  {
    id            : 8,
    name          : 'Juliana Ramos',
    role          : 'Servo',
    avatarInitials: 'JR',
    avatarColor   : '#2b0d1a',
    tag           : 'IDENTIDADE',
    rating        : 5,
    videoId       : 'ID_DO_VIDEO_AQUI',
    summary       : 'Juliana vivia num ciclo constante de insegurança e comparação profissional. O programa a confrontou com verdades sobre identidade em Cristo que transformaram totalmente sua postura em sala de aula.',
  },
  {
    id            : 9,
    name          : 'Bruno Alves',
    role          : 'Encontrista',
    avatarInitials: 'BA',
    avatarColor   : '#0d1a1a',
    tag           : 'FÉ',
    rating        : 5,
    videoId       : 'ID_DO_VIDEO_AQUI',
    summary       : 'Bruno havia se afastado da fé por muitos anos devido às decepções da rotina. O Iron Dome foi o ambiente acolhedor e sem julgamentos que ele precisava para voltar a crer — primeiro em Deus, depois em si mesmo.',
  },
  {
    id            : 10,
    name          : 'Isabela Nunes',
    role          : 'Servo',
    avatarInitials: 'IN',
    avatarColor   : '#1a0d1a',
    tag           : 'PROPÓSITO',
    rating        : 5,
    videoId       : 'ID_DO_VIDEO_AQUI',
    summary       : 'Isabela, que passa o dia ajudando outras pessoas a direcionarem suas vidas, admite que precisava de direcionamento também. O Iron Dome integrou desenvolvimento pessoal e fé de forma extraordinária.',
  },
  {
    id            : 11,
    name          : 'Gabriel Rocha',
    role          : 'Encontrista',
    avatarInitials: 'GR',
    avatarColor   : '#1b1b1b',
    tag           : 'DEPRESSÃO',
    rating        : 5,
    videoId       : 'ID_DO_VIDEO_AQUI',
    summary       : 'Gabriel enfrentava o desgaste mental e o peso psicológico de litígios complexos cotidianamente. O método tático e o refrigério espiritual do Iron Dome quebraram o ciclo depressivo que ameaçava sua vida pessoal.',
  },
  {
    id            : 12,
    name          : 'Rodrigo Teixeira',
    role          : 'Servo',
    avatarInitials: 'RT',
    avatarColor   : '#3a0f0d',
    tag           : 'LIDERANÇA',
    rating        : 5,
    videoId       : 'ID_DO_VIDEO_AQUI',
    summary       : 'Mesmo liderando dezenas de colaboradores, Rodrigo se sentia isolado e cansado ao chegar em casa. No Iron Dome, ele descobriu como usar a vulnerabilidade estratégica para guiar sua família com sabedoria.',
  },
];

const ALL_TAGS = ['TODOS', ...new Set(TESTIMONIALS_DATA.map(t => t.tag))];

// ── Sub-componente: StarRating ────────────────────────────────
const StarRating = ({ value = 5 }) => (
  <div
    className={styles['mt-card__stars']}
    aria-label={`Avaliação: ${value} de 5 estrelas`}
    role="img"
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={[
          styles['mt-card__star'],
          i < value ? styles['mt-card__star--filled'] : '',
        ].join(' ')}
        aria-hidden="true"
      >
        ★
      </span>
    ))}
  </div>
);

// ── Sub-componente: VideoThumb (Lazy Load) ────────────────────
const VideoThumb = ({ videoId, name }) => {
  const [playing, setPlaying] = useState(false);

  const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  const handlePlay = useCallback(() => setPlaying(true), []);

  if (playing) {
    return (
      <div className={styles['mt-card__video-wrapper']}>
        <iframe
          className={styles['mt-card__video-iframe']}
          src={embedUrl}
          title={`Depoimento de ${name}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={styles['mt-card__video-wrapper']}>
      <img
        src={thumbUrl}
        alt={`Capa do vídeo de ${name}`}
        className={styles['mt-card__video-thumb']}
        loading="lazy"
      />
      <button
        className={styles['mt-card__video-play-btn']}
        onClick={handlePlay}
        aria-label={`Reproduzir depoimento de ${name}`}
        type="button"
      >
        <span
          className={styles['mt-card__video-play-circle']}
          aria-hidden="true"
        >
          <span className={styles['mt-card__video-play-triangle']} />
        </span>
      </button>
    </div>
  );
};

// ── Sub-componente: TestimonyCard ──────────────────────────────
const TestimonyCard = ({ data, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-visible', 'true');
        } else {
          el.removeAttribute('data-visible');
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
      style={{ '--mt-stagger-delay': `${index * 0.1}s` }}
      aria-label={`Testemunho de ${data.name}, ${data.role}`}
    >
      <span
        className={styles['mt-card__tag']}
        aria-label={`Tema: ${data.tag}`}
      >
        {data.tag}
      </span>

      <VideoThumb videoId={data.videoId} name={data.name} />

      <div className={styles['mt-card__video-label']} aria-hidden="true">
        <span className={styles['mt-card__video-dot']} />
        RELATÓRIO EM VÍDEO
      </div>

      <div className={styles['mt-card__avatar-wrapper']}>
        <div
          className={styles['mt-card__avatar']}
          style={{ background: data.avatarColor }}
          aria-hidden="true"
        >
          <span className={styles['mt-card__avatar-initials']}>
            {data.avatarInitials}
          </span>
        </div>
        <div className={styles['mt-card__identity']}>
          <p className={styles['mt-card__role']}>{data.role}</p>
          <h3 className={styles['mt-card__name']}>{data.name}</h3>
        </div>
      </div>

      <StarRating value={data.rating} />

      <div className={styles['mt-card__divider']} aria-hidden="true" />
      <p className={styles['mt-card__summary']}>
        <span className={styles['mt-card__summary-label']}>RESUMO: </span>
        {data.summary}
      </p>
    </article>
  );
};

// ── Componente principal exportado ────────────────────────────
const MainTestemunho = () => {
  const sectionRef = useRef(null);
  const [activeTag, setActiveTag] = useState('TODOS');

  const filtered = activeTag === 'TODOS'
    ? TESTIMONIALS_DATA
    : TESTIMONIALS_DATA.filter(t => t.tag === activeTag);

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
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles['mt-section']}
      aria-labelledby="mt-section-title"
    >
      <Container>

        {/* Cabeçalho da seção */}
        <div className={`${styles['mt-section__header']} mb-4`}>
          <div className={styles['mt-section__header-line']} aria-hidden="true" />
          <h2 id="mt-section-title" className={styles['mt-section__title']}>
            <span className={styles['mt-section__title-count']}>
              {filtered.length}
            </span>
            {' '}DEPOIMENTOS
          </h2>
          <div className={styles['mt-section__header-line']} aria-hidden="true" />
        </div>

        {/* Filtro por tema */}
        <div
          className={`${styles['mt-filter']} mb-5`}
          role="group"
          aria-label="Filtrar por tema"
        >
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={[
                styles['mt-filter__btn'],
                activeTag === tag ? styles['mt-filter__btn--active'] : '',
              ].join(' ')}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid de cards */}
        <Row
          className="g-4 justify-content-center"
          role="list"
          aria-label="Lista de testemunhos"
        >
          {filtered.map((item, idx) => (
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