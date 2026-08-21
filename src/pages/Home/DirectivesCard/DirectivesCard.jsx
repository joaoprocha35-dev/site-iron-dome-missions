import { useEffect, useRef, useState } from "react";
import styles from "./DirectivesCard.module.scss";

export default function DirectivesCard() {
  // Aqui eu crio um aviso para saber se a pessoa já rolou a tela até chegar nesse cartão
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Aqui eu guardo a minha lista com as datas do ano, os títulos dos encontros e qual é o próximo destaque
  const timelineData = [
    { id: 1, date: "JAN 2026", title: "Reunião", active: false },
    { id: 2, date: "MAR 2026", title: "Retiro Iron dome", active: false },
    { id: 3, date: "MAI 2026", title: "Reunião de alinhamento", active: false },
    { id: 4, date: "JUL 2026", title: "Retiro iron dome", active: false }, 
    { id: 5, date: "SET 2026", title: "Novidades em breve", active: false },
    { id: 6, date: "NOV 2026", title: "Proxímo Retiro de Jovens - Botucatu", active: true },
    { id: 7, date: "DEZ 2026", title: "Encerramento", active: false },
  ];

  // Aqui eu ligo o "radar" do site: assim que a pessoa enxergar essa parte da página, as animações começam a rodar
  useEffect(() => {
    const currentElement = cardRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    // Aqui eu coloco o cartão na tela e ativo a animação se a pessoa já estiver vendo ele
    <article
      ref={cardRef}
      className={`${styles.cardContainer} ${isVisible ? styles.isVisible : ""}`}
    >
      <section className={styles.section}>
        {/* Aqui eu mostro o título principal da seção */}
        <header className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.icon} aria-hidden="true"></span>
            Calendário de Encontros 2026
          </h2>
        </header>

        {/* Aqui eu coloco a frase explicativa do calendário */}
        <p className={styles.description}>
          Acompanhe as próximas datas e locais onde a missão será estabelecida
          ao longo de todo o ano.
        </p>

        {/* Aqui fica a estrutura do caminho: a linha cinza e a linha verde */}
        <div className={styles.timeline}>
          <div className={styles.timelineLine}></div>
          <div className={styles.timelineProgress}></div>

          {/* Aqui eu faço um loop para desenhar cada mês na tela, um por um */}
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