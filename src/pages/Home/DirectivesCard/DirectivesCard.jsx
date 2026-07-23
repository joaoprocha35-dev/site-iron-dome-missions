// ============================================================
// DirectivesCard/index.jsx (Versão Final com Scroll e Sincronia)
// ============================================================
import { useEffect, useRef, useState } from "react";
import styles from "./DirectivesCard.module.scss";

export default function DirectivesCard() {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  const timelineData = [
    { id: 1, date: "JAN 2026", title: "Reunião", active: false },
    { id: 2, date: "MAR 2026", title: "Retiro Iron dome", active: false },
    { id: 3, date: "MAI 2026", title: "Reunião de alinhamento", active: false },
    { id: 4, date: "JUL 2026", title: "Retiro iron dome", active: true }, //  Alvo da animação
    { id: 5, date: "SET 2026", title: "Novidades em breve", active: false },
    { id: 6, date: "NOV 2026", title: "Local e tema a definir", active: false },
    { id: 7, date: "DEZ 2026", title: "Encerramento", active: false },
  ];

  useEffect(() => {
    // 1. Salva a referência atual em uma variável local
    const currentElement = cardRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 2. Usa a variável local para parar de observar
          if (currentElement) observer.unobserve(currentElement);
        }
      },
      {
        threshold: 0.4,
      },
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    // 3. A limpeza agora limpa o observer com segurança
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className={`${styles.cardContainer} ${isVisible ? styles.isVisible : ""}`}
    >
      <section className={styles.section}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.icon} aria-hidden="true"></span>
            Calendário de Encontros 2026
          </h2>
        </header>

        <p className={styles.description}>
          Acompanhe as próximas datas e locais onde a missão será estabelecida
          ao longo de todo o ano.
        </p>

        <div className={styles.timeline}>
          {/* Linha guia de fundo (cinza) */}
          <div className={styles.timelineLine}></div>

          {/* Linha de progresso animada (verde) */}
          <div className={styles.timelineProgress}></div>

          <div className={styles.timelineGrid}>
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={styles.timelineItem}
                style={{ "--item-index": index }}
              >
                <div
                  className={`${styles.dot} ${item.active ? styles.dotActive : ""}`}
                ></div>
                <h3 className={styles.timeDate}>{item.date}</h3>
                <p className={styles.timeTitle}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
