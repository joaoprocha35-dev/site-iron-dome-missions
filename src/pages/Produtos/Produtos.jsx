import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// IMPORTAÇÕES DE COMPONENTES LOCAIS
import BannerRestrito from './BannerRestrito/BannerRestrito';
import HeaderArsenal from './HeaderArsenal/HeaderArsenal'; 
import RackProdutos from './RackProdutos/RackProdutos';

// IMPORTAÇÃO DE ESTILOS MODULARES
import styles from './Produtos.module.scss';

export default function Produtos() {
  const navigate = useNavigate();

  // Estado para controlar a ativação da animação ultra lenta do bloco legado
  const [isLegadoVisible, setIsLegadoVisible] = useState(false);
  
  // Referência vinculada ao container tático que monitora a rolagem a 80% da tela
  const legadoContainerRef = useRef(null);

  useEffect(() => {
    // INTERSECTION OBSERVER CALIBRADO PARA 80% DA VIEWPORT (Recuo inferior de -20%)
    const observerOptions = {
      root: null, 
      rootMargin: '0px 0px -20% 0px', 
      threshold: 0.1 
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsLegadoVisible(true);
          // Auto-unobserve garante performance máxima e evita re-execuções desnecessárias
          if (legadoContainerRef.current) observer.unobserve(legadoContainerRef.current);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (legadoContainerRef.current) {
      observer.observe(legadoContainerRef.current);
    }

    return () => {
      if (legadoContainerRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <main className={styles.containerQuartel}>
      
      {/* 1. HERO SECTION: Banner principal com mensagem de acesso restrito */}
      <BannerRestrito />
      
      {/* WRAPPER DE CONTEÚDO: Isola o fluxo vertical e impede o "Layout Shift" que causa travas na rolagem */}
      <div className={`${styles.contentWrapper} container-xl`}>
        
        {/* 2. MANIFESTO / VERSÍCULO: Componente original exibindo a semântica do Quartel de Elite */}
        <HeaderArsenal />
        
        {/* 3. CARROSSÉIS DE PRODUTOS: Renderização das vitrines rotativas em 3D Coverflow */}
        <RackProdutos />
        
        {/* 4. CONTAINER DE CONTROLE DE ROLAGEM (NOVO CONTEXTO DE ISOLAMENTO) */}
        <div ref={legadoContainerRef} className={styles.fadeContainer}>
          
          {/* BLOCO CONVERSÃO / LEGADO: Ativação lenta de 5 segundos ao cruzar os 80% da tela inferior */}
          <section 
            className={`
              ${styles.secaoLegado} 
              ${isLegadoVisible ? styles.revealActive : styles.revealHidden} 
              row align-items-center justify-content-between m-0
            `}
          >
            
            {/* Textos institucionais alinhados à esquerda */}
            <div className="col-12 col-md-8 text-start mb-3 mb-md-0 p-0">
              <h3 className={styles.legadoTitulo}>LEGADO EM CADA PONTO</h3>
              <p className={styles.legadoTexto}>
                Ao adquirir um item em nosso Quartel, você financia diretamente o avanço do Reino e a manutenção de nossa história de missão urbana.
              </p>
            </div>
            
            {/* Botão direcionador alinhado à direita */}
            <div className="col-12 col-md-4 text-md-end text-start p-0">
              <button className={styles.btnLegado} onClick={() => navigate('/home')}>
                CONHEÇA NOSSA MISSÃO
              </button>
            </div>

          </section>

        </div>
      </div>
    </main>
  );
}