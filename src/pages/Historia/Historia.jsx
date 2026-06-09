// O React gerencia o ciclo de vida e a renderização do componente
import React from 'react';
// Importa o arquivo de estilos global específico desta página
import styles from './Historia.module.scss';
// Importa o componente da seção do topo (Hero)
import HeroHistoria from './HeroHistoria/HeroHistoria';
// Importa o componente da seção de conteúdo e métricas (Main)
import MainHistoria from './MainHistoria/MainHistoria';
import FooterHistoria from './FooterHistoria/FooterHistoria';

export default function Historia() {
  return (
    // Aplicando a classe de container principal vinda do SCSS
    <main className={styles.page}>
      
      {/* 1. SEÇÃO HERO: Contém o cabeçalho tático com imagem de fundo e o manifesto principal */}
      <HeroHistoria />
      
      {/* 2. SEÇÃO MAIN: Contém o texto institucional de Botucatu e os cards de métricas de impacto */}
      <MainHistoria />
      <FooterHistoria />
      
    </main>
  );
}