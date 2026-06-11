// ============================================================
// Testemunho.jsx — Componente Raiz da Tela de Testemunhos
// Projeto: Iron Dome — Tactical Mission Design System
// ============================================================
// Responsabilidades:
//   Compõe a tela completa em três blocos sequenciais:
//     1. HeaderTestemunho  → banner de acesso + títulos animados
//     2. MainTestemunho    → grid de 10 cards com vídeo lazy load
//     3. FooterTestemunho  → estatísticas + CTA + rodapé legal
//
// Roteamento sugerido:
//   <Route path="/testemunhos" element={<Testemunho />} />
//
// Manutenção:
//   Para reordenar ou remover seções, edite apenas este arquivo.
//   O scroll suave entre seções é controlado pelo CSS do wrapper.
// ============================================================

import React from 'react';
import styles from './Testemunho.module.scss';

import HeaderTestemunho from './HeaderTestemunho/HeaderTestemunho';
import MainTestemunho   from './MainTestemunho/MainTestemunho';
import FooterTestemunho from './FooterTestemunho/FooterTestemunho';

const Testemunho = () => {
  return (
    <div className={styles.page} aria-label="Tela de testemunhos de campo">

      {/* ── 1. Header: banner + título animado ── */}
      <HeaderTestemunho />

      {/* ── 2. Main: grid de 10 cards de depoimento ── */}
      <MainTestemunho />

      {/* ── 3. Footer: estatísticas + CTA + rodapé ── */}
      <FooterTestemunho />

    </div>
  );
};

export default Testemunho;
