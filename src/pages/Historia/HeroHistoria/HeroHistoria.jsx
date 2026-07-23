import styles from './HeroHistoria.module.scss';

export default function HeroHistoria() {
  const titleText = "O LEGADO DA ";
  const greenText = "MISSÃO";

  return (
    <header className={`${styles.heroSection} ${styles.animateBg} d-flex align-items-center w-100`}>
      
      <div className="container px-4 text-center">
        <div className="row justify-content-center">
          
          <div className="col-12 col-md-10 col-lg-8">
            
            {/* TÍTULO PRINCIPAL: Letra por letra */}
            <h1 className={`${styles.mainTitle} fw-800 text-white mb-3`}>
              {titleText.split("").map((char, index) => (
                <span 
                  key={`white-${index}`} 
                  className={styles.char} 
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
              
              <span className={styles.greenLaser}>
                {greenText.split("").map((char, index) => (
                  <span 
                    key={`green-${index}`} 
                    className={styles.char} 
                    style={{ animationDelay: `${(titleText.length + index) * 0.05}s` }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </h1>
            
            {/* TEXTO EMOCIONAL */}
            <p className={`${styles.emotionalText} ${styles.animateText} text-white m-0`}>
              O Iron Dome não nasceu de uma simples ideia; nasceu de um clamor por resgate. Nós escolhemos não recuar diante do caos de uma geração. Somos a resposta viva de que nenhuma fortaleza de dor resiste quando o Reino de Deus decide avançar.
            </p>
            
          </div>

        </div>
      </div>

    </header>
  );
}