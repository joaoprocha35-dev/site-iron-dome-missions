import { useState, useEffect } from 'react';
import styles from './HeroBanner.module.scss';

export default function HeroBanner() {
  const fullText = "Aonde você irá entender um pouquinho do que é o Iron Dome.";
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const initialDelay = 800; // Tempo de espera inicial antes de começar a digitar

    const startTimer = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTypingComplete(true);
          clearInterval(typingInterval);
        }
      }, 40); // Velocidade de digitação por caractere (ms)

      return () => clearInterval(typingInterval);
    }, initialDelay);

    return () => clearTimeout(startTimer);
  }, []);

  return (
    <section className={styles.hero} aria-label="Banner principal">

      {/* Camadas decorativas de fundo */}
      <div className={styles.bgBase} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgCross} aria-hidden="true">
        <span className={styles.cruz}>✝</span>
      </div>
      <div className={styles.bgOverlay} aria-hidden="true" />

      {/* Conteúdo principal */}
      <div className={styles.content}>

        {/* Badge Tático de Entrada */}
        <div className={styles.badgeTactical}>
          <span className={styles.badgeDot} />
          <span>Base do Altar &amp; Propósito</span>
        </div>

        <h1 className={styles.headline}>
          Seja bem-vindo à nossa tela Principal
          
          <em className={styles.headlineAccent}>
            {displayedText}
            <span 
              className={`${styles.cursor} ${isTypingComplete ? styles.cursorPulse : ''}`}
              aria-hidden="true"
            >
              |
            </span>
          </em>
        </h1>

      </div>

    </section>
  );
}