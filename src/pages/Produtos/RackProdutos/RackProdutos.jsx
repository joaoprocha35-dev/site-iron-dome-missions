import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { ShieldCheck, MessageSquare } from 'lucide-react';

/* IMPORTS OBRIGATÓRIOS DO CORE DO SWIPER */
import 'swiper/css';
import 'swiper/css/effect-coverflow';

// Importando imagens dos cards
import foto01 from '../../../assets/imagensProdutos/foto01.jpg';
import foto02 from '../../../assets/imagensProdutos/foto02.jpg';
import foto03 from '../../../assets/imagensProdutos/foto03.jpg';
// Card 2
import foto04 from '../../../assets/imagensProdutos/foto04.jpg';
import foto05 from '../../../assets/imagensProdutos/foto05.png';
import foto06 from '../../../assets/imagensProdutos/foto06.png';
// Card 3
import foto07 from '../../../assets/imagensProdutos/foto07.png';
import foto08 from '../../../assets/imagensProdutos/foto08.png';
import foto09 from '../../../assets/imagensProdutos/foto09.png';

import styles from './RackProdutos.module.scss';

const colecoes = {
  camisetasTaticas: [
    { id: 1, titulo: 'CAMISETA COMBAT GREEN', preco: 'R$ 119,90', desc: 'Camiseta operacional verde oliva com tecido de alta absorção e reforço duplo nas costuras.', img: foto01 },
    { id: 2, titulo: 'TACTICAL BLACK STEALTH', preco: 'R$ 129,90', desc: 'Modelagem slim tática preta, desenvolvida para alta performance e camuflagem noturna.', img: foto02 },
    { id: 3, titulo: 'ESTANDARTE DESERT KHAKI', preco: 'R$ 115,00', desc: 'Tom areia desértico com estampa texturizada de alta resistência a lavagens e atritos.', img: foto03 }
  ],
  cortaVentos: [
    { id: 4, titulo: 'WIND JACKET FRONT LINE', preco: 'R$ 249,90', desc: 'Corta-vento impermeável camuflado com capuz ajustável e bolsos utilitários selados.', img: foto04 },
    { id: 5, titulo: 'ANORAK SOLDIER SHIELD', preco: 'R$ 269,90', desc: 'Proteção térmica absoluta contra ventos fortes. Tecido ripstop militar ultra-resistente.', img: foto05 },
    { id: 6, titulo: 'CORTA-VENTO URBAN COMMAND', preco: 'R$ 239,90', desc: 'Versão tática urbana em preto fosco com detalhes refletivos e respiradores laterais.', img: foto06 }
  ],
  blusasElite: [
    { id: 7, titulo: 'HOODIE QUARTEL OVERSIZE', preco: 'R$ 199,90', desc: 'Moletom de alta gramatura com forro tático térmico e capuz balístico reforçado.', img: foto07 },
    { id: 8, titulo: 'BLUSA SWEATER ELITE', preco: 'R$ 189,90', desc: 'Suéter tático canelado com reforço de sarja nos ombros e cotoveleiras integradas.', img: foto08 },
    { id: 9, titulo: 'BLUSA BOMBER DEFENDER', preco: 'R$ 219,90', desc: 'Jaqueta bomber de peso médio inspirada no esquadrão de elite com zíper tratorado.', img: foto09 }
  ]
};

export default function RackProdutos() {
  const swiperInstances = useRef([]);
  const rowRefs = useRef([]);

  const handleWhatsAppClick = (titulo) => {
    const msg = encodeURIComponent(`Olá! Quero garantir este item preparado no Quartel: ${titulo}.`);
    window.open(`https://wa.me/5500000000000?text=${msg}`, '_blank');
  };

  useEffect(() => {
    const activeObservers = [];

    rowRefs.current.forEach((rowElement, index) => {
      if (!rowElement) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          const swiperInstance = swiperInstances.current[index];
          
          if (swiperInstance && swiperInstance.autoplay) {
            if (entry.isIntersecting) {
              swiperInstance.autoplay.start();
              swiperInstance.update(); 
            } else {
              swiperInstance.autoplay.stop();
            }
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(rowElement);
      activeObservers.push({ observer, element: rowElement });
    });

    return () => {
      activeObservers.forEach(({ observer, element }) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const saveSwiperInstance = (swiper, index) => {
    if (swiper) {
      swiperInstances.current[index] = swiper;
    }
  };

  const swiperConfig = {
    modules: [EffectCoverflow, Autoplay],
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 0,
    loop: true,
    observer: true,
    observeParents: true,
    coverflowEffect: {
      rotate: 12,
      stretch: -15,
      depth: 120,
      modifier: 1,
      slideShadows: false,
    }
  };

  const renderSlides = (produtos) => {
    const itensSeguros = produtos.length < 5 ? [...produtos, ...produtos, ...produtos] : produtos;

    return itensSeguros.map((p, index) => (
      <SwiperSlide key={`${p.id}-${index}`} className={styles.slideCard}>
        <div className={styles.tacticalCard}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className={styles.badgeTag}>PRIMEIRA LINHA</span>
            <ShieldCheck className={styles.iconCheck} size={18} />
          </div>
          <div className={styles.imageBox}>
            <img src={p.img} alt={p.titulo} className={styles.productImg} />
            <div className={styles.overlayGrid}></div>
          </div>
          <div className="mt-3 d-flex flex-column flex-grow-1">
            <h3 className={styles.productTitle}>{p.titulo}</h3>
            <p className={styles.productDescription}>{p.desc}</p>
            <div className="mt-auto pt-3">
              <span className={styles.productPrice}>{p.preco}</span>
              <button onClick={() => handleWhatsAppClick(p.titulo)} className={styles.btnWhatsApp}>
                <MessageSquare size={16} /> ADQUIRIR NO QUARTEL
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <section className={styles.rackSection}>
      {/* Camadas Atmosféricas Controladas (UX Suave) */}
      <div className={styles.vignetteOverlay}></div>
      <div className={styles.ambientOverlay}></div>
      <div className={styles.neonCoreGlow}></div>

      {/* Sistema Otimizado de Partículas */}
      <div className={styles.particlesContainer}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`${styles.dustParticle} ${styles[`p${i + 1}`]}`} />
        ))}
      </div>
      
      {/* FILEIRA 1: CAMISETAS */}
      <div ref={(el) => (rowRefs.current[0] = el)} className={`${styles.carrosselContainer} position-relative`}>
        <h2 className={styles.categoriaTitulo}>
          CAMISETAS <span className={styles.verdeDestaque}>TÁTICAS</span>
        </h2>
        <Swiper 
          {...swiperConfig} 
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          onSwiper={(swiper) => saveSwiperInstance(swiper, 0)}
          className={styles.swiperRack}
        >
          {renderSlides(colecoes.camisetasTaticas)}
        </Swiper>
      </div>

      {/* FILEIRA 2: CORTA VENTOS */}
      <div ref={(el) => (rowRefs.current[1] = el)} className={`${styles.carrosselContainer} position-relative`}>
        <h2 className={styles.categoriaTitulo}>
          CORTA-VENTOS <span className={styles.verdeDestaque}>DE SOLDADO</span>
        </h2>
        <Swiper 
          {...swiperConfig} 
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          onSwiper={(swiper) => saveSwiperInstance(swiper, 1)}
          className={styles.swiperRack}
        >
          {renderSlides(colecoes.cortaVentos)}
        </Swiper>
      </div>

      {/* FILEIRA 3: BLUSAS */}
      <div ref={(el) => (rowRefs.current[2] = el)} className={`${styles.carrosselContainer} position-relative`}>
        <h2 className={styles.categoriaTitulo}>
          BLUSAS <span className={styles.verdeDestaque}>DE ELITE</span>
        </h2>
        <Swiper 
          {...swiperConfig} 
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSwiper={(swiper) => saveSwiperInstance(swiper, 2)}
          className={styles.swiperRack}
        >
          {renderSlides(colecoes.blusasElite)}
        </Swiper>
      </div>
    </section>
  );
}