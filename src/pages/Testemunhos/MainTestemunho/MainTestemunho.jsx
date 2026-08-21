// ============================================================
// MainTestemunho.jsx — Grid de Cards de Testemunho
// Projeto: Iron Dome — Design System Civil (Premium Dark)
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './MainTestemunho.module.scss';

// ── Dados dos testemunhos ──
// Aqui eu substitui os dados de teste pelos 8 testemunhos reais.
// Separei apenas o código final (ID) de cada link do YouTube para o player funcionar corretamente.
const TESTIMONIALS_DATA = [
  {
    id            : 1,
    name          : 'João Rocha',
    role          : 'Servo',
    avatarInitials: 'JR',
    avatarColor   : '#0a120e',
    tag           : 'TRANSFORMAÇÃO',
    rating        : 5,
    videoId       : 'hZeAcnRk8iQ', // Extraído de https://youtu.be/hZeAcnRk8iQ
    summary       : 'João compartilha como o projeto trouxe uma verdadeira transformação para a sua vida, mudando suas atitudes e seu modo de enxergar o mundo.',
  },
  {
    id            : 2,
    name          : 'Yan',
    role          : 'Servo',
    avatarInitials: 'Y',
    avatarColor   : '#0a120e',
    tag           : 'CHAMADO',
    rating        : 5,
    videoId       : 'KcUO_zWLw5I', // Extraído de https://youtu.be/KcUO_zWLw5I
    summary       : 'Yan descreve o momento exato em que entendeu o seu chamado e como isso deu um novo propósito para sua caminhada na fé.',
  },
  {
    id            : 3,
    name          : 'André',
    role          : 'Servo',
    avatarInitials: 'A',
    avatarColor   : '#0a120e',
    tag           : 'RESTAURAÇÃO',
    rating        : 5,
    videoId       : 'j37nh5waSX8', // Extraído de https://youtu.be/j37nh5waSX8
    summary       : 'Um relato forte sobre como Deus restaurou áreas da sua vida que pareciam perdidas, trazendo paz e um novo recomeço.',
  },
  {
    id            : 4,
    name          : 'Arthur',
    role          : 'Servo',
    avatarInitials: 'A',
    avatarColor   : '#0a120e',
    tag           : 'CHAMADO',
    rating        : 5,
    videoId       : '-GF8X4UYS5g', // Extraído de https://youtu.be/-GF8X4UYS5g
    summary       : 'Arthur conta sobre os desafios e as confirmações que teve ao aceitar o seu chamado para servir no Iron Dome.',
  },
  {
    id            : 5,
    name          : 'Chrystian',
    role          : 'Servo',
    avatarInitials: 'C',
    avatarColor   : '#0a120e',
    tag           : 'RESTAURAÇÃO',
    rating        : 5,
    videoId       : 'xT5deZOA2Og', // Extraído de https://youtu.be/xT5deZOA2Og
    summary       : 'O testemunho de Chrystian é focado na cura interior e na reconstrução da sua base espiritual através da fé.',
  },
  {
    id            : 6,
    name          : 'Hugo',
    role          : 'Servo',
    avatarInitials: 'H',
    avatarColor   : '#0a120e',
    tag           : 'IDENTIDADE',
    rating        : 5,
    videoId       : 'z6BQPnFbf9s', // Extraído de https://youtu.be/z6BQPnFbf9s
    summary       : 'Hugo descreve como o Iron Dome o ajudou a reconstruir sua identidade, preenchendo o vazio e voltando a ter Jesus como centro.',
  },
  {
    id            : 7,
    name          : 'Pedro',
    role          : 'Servo',
    avatarInitials: 'P',
    avatarColor   : '#0a120e',
    tag           : 'RESTAURAÇÃO',
    rating        : 5,
    videoId       : 'F6mBj8nqeLM', // Extraído de https://youtu.be/F6mBj8nqeLM
    summary       : 'Pedro compartilha um testemunho emocionante sobre a restauração da sua família e de seus princípios cristãos.',
  },
  {
    id            : 8,
    name          : 'Rayane',
    role          : 'Servo',
    avatarInitials: 'R',
    avatarColor   : '#0a120e',
    tag           : 'FÉ',
    rating        : 5,
    videoId       : 'c7zlVE7QJA8', // Extraído de https://youtu.be/c7zlVE7QJA8
    summary       : 'Rayane fala sobre os testes que enfrentou e como sua fé foi fortalecida durante sua trajetória servindo no projeto.',
  }
];

// Mapeio todas as tags únicas automaticamente para gerar os botões de filtro
const ALL_TAGS = ['TODOS', ...new Set(TESTIMONIALS_DATA.map(t => t.tag))];

// ── Sub-componente: StarRating ────────────────────────────────
// Renderiza as 5 estrelas de avaliação
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

// ── Sub-componente: VideoThumb ────────────────────────────────
// Cuida da exibição da miniatura real do vídeo e do player do YouTube
const VideoThumb = ({ videoId, name }) => {
  const [playing, setPlaying] = useState(false);

  // Se não houver videoId cadastrado ainda, renderizo um espaço vazio
  if (!videoId) {
    return <div className={styles['mt-card__video-wrapper']} />;
  }

  // A MÁGICA ACONTECE AQUI: 
  // Usamos '0.jpg' para forçar o YouTube a entregar o frame automático do vídeo!
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  // Se o usuário clicou em play, substituo a imagem pelo iframe do vídeo
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

  // Estado inicial: Mostro a miniatura com o botão de play em cima
  return (
    <div className={styles['mt-card__video-wrapper']}>
      <img
        src={thumbUrl}
        alt={`Capa do vídeo de ${name}`}
        className={styles['mt-card__video-thumb']}
        loading="lazy"
        // Estilo extra para garantir que o frame preencha o espaço sem distorcer
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      <div className={styles['mt-card__video-overlay']} />
      <button
        className={styles['mt-card__video-play-btn']}
        onClick={() => setPlaying(true)}
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
// Estrutura de cada Card individual do grid
const TestimonyCard = ({ data, index }) => {
  const cardRef = useRef(null);

  // Adiciona animação de scroll no mobile
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
      <div className={styles['mt-card__content-inner']}>
        
        {/* Tag no topo (ex: FÉ, RESTAURAÇÃO, etc) */}
        <span
          className={styles['mt-card__tag']}
          aria-label={`Tema: ${data.tag}`}
        >
          {data.tag}
        </span>

        {/* Player de vídeo do YouTube */}
        <VideoThumb videoId={data.videoId} name={data.name} />

        <div className={styles['mt-card__video-label']} aria-hidden="true">
          <span className={styles['mt-card__video-dot']} />
          RELATÓRIO EM VÍDEO
        </div>

        {/* Informações de perfil (Foto/Iniciais e Nome) */}
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

        {/* Estrelinhas de avaliação */}
        <StarRating value={data.rating} />

        <div className={styles['mt-card__divider']} aria-hidden="true" />
        
        {/* Resumo em texto daquele testemunho */}
        <p className={styles['mt-card__summary']}>
          <span className={styles['mt-card__summary-label']}>RESUMO: </span>
          {data.summary}
        </p>

      </div>
    </article>
  );
};

// ── Componente principal exportado ────────────────────────────
// Ponto de entrada que carrega tudo na tela
const MainTestemunho = () => {
  const sectionRef = useRef(null);
  const [activeTag, setActiveTag] = useState('TODOS');

  // Filtra os cards baseados na tag selecionada
  const filtered = activeTag === 'TODOS'
    ? TESTIMONIALS_DATA
    : TESTIMONIALS_DATA.filter(t => t.tag === activeTag);

  // Efeito para adicionar visibilidade assim que entra na tela (Intersection Observer)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-visible', 'true');
          observer.disconnect(); // Disconecta para animar apenas na primeira vez
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

        {/* Cabeçalho da seção mostrando a quantidade de resultados */}
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

        {/* Filtros para o usuário clicar (Ex: TODOS, FÉ, CHAMADO) */}
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

        {/* Renderização do Grid de cards filtrados */}
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