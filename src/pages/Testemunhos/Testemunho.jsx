/**
 * ============================================================
 * Testemunho.jsx
 * Componente Raiz: Tela Completa de Testemunhos
 * Projeto: Iron Dome — Tactical Mission Design System
 * ------------------------------------------------------------
 * Responsabilidades:
 *  - Montar a tela de testemunhos composta por três blocos:
 *      1. HeaderTestemunho  → banner de acesso + títulos animados
 *      2. MainTestemunho    → grid de cards de depoimento
 *      3. FooterTestemunho  → estatísticas + CTA + rodapé legal
 *
 * Uso:
 *  import Testemunho from './Testemunho';
 *  <Testemunho />
 *
 * Roteamento (exemplo com React Router):
 *  <Route path="/testemunhos" element={<Testemunho />} />
 *
 * Manutenção:
 *  - Para adicionar/remover seções, edite apenas este arquivo
 *  - A ordem visual é determinada pela ordem dos componentes no JSX
 *  - O scroll suave entre seções é controlado pelo CSS no wrapper
 *  - Classes CSS: Testemunho.module.scss (CSS Modules)
 *    → prefixo automático evita colisão com outros módulos
 *
 * Dependências diretas:
 *  - HeaderTestemunho/headerTestemunho.jsx
 *  - MainTestemunho/mainTestemunho.jsx
 *  - FooterTestemunho/footerTestemunho.jsx
 *  - Testemunho.module.scss
 * ============================================================
 */

import React from 'react';
import styles from './Testemunho.module.scss';

import HeaderTestemunho from './HeaderTestemunho/headerTestemunho';
import MainTestemunho   from './MainTestemunho/mainTestemunho';
import FooterTestemunho from './FooterTestemunho/footerTestemunho';

/**
 * Testemunho
 * Página de testemunhos de campo do sistema Iron Dome.
 * Composição linear: Header → Main → Footer.
 *
 * O wrapper (.page) garante:
 *  - min-height 100vh para ocupar toda a tela
 *  - overflow-x hidden para evitar scroll horizontal
 *  - background consolidado alinhado ao $color-neutral do DS
 */
const Testemunho = () => {
  return (
    <div className={styles.page} aria-label="Tela de testemunhos de campo">

      {/* ── 1. Header: banner + títulos animados ── */}
      <HeaderTestemunho />

      {/* ── 2. Main: grid de cards de depoimento ── */}
      <MainTestemunho />

      {/* ── 3. Footer: estatísticas + CTA + rodapé ── */}
      <FooterTestemunho />

    </div>
  );
};

export default Testemunho;
