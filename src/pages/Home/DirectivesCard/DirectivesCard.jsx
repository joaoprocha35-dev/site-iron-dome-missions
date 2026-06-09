// ============================================================
// DirectivesCard/index.jsx (Versão Animada Avançada)
// ============================================================
import styles from './DirectivesCard.module.scss'

export default function DirectivesCard() {
    // Dados do Calendário com o mês de Julho ativado
const timelineData = [
    { id: 1, date: 'JAN 2026', title: 'Regional Centro', active: false },
    { id: 2, date: 'MAR 2026', title: 'Missão Leste', active: false },
    { id: 3, date: 'MAI 2026', title: 'Congresso Nacional', active: false },
    { id: 4, date: 'JUL 2026', title: 'Retiro de Joves', active: true }, // 🗓️ Julho agora está ativo e vai pulsar!
    { id: 5, date: 'SET 2026', title: 'Missão Sul', active: false },
    { id: 6, date: 'NOV 2026', title: 'Conferência Iron', active: false },
    { id: 7, date: 'DEZ 2026', title: 'Encerramento', active: false },
];

    const scheduleData = [
        { id: 1, day: 'SEXTA', events: '20:00 - Chegada e Acomodação | 22:00 - Culto de Abertura' },
        { id: 2, day: 'SÁBADO', events: '08:00 - Café da Manhã | 10:00 - Dinâmicas | 15:00 - Louvor | 20:00 - Vigília' },
        { id: 3, day: 'DOMINGO', events: '09:00 - Testemunhos | 12:00 - Almoço de Encerramento | 14:00 - Despedida' },
    ];

    return (
        <article className={styles.cardContainer}>
            
            {/* SEÇÃO 1: Calendário de Encontros */}
            <section className={styles.section}>
                <header className={styles.header}>
                    <h2 className={styles.title}>
                        <span className={styles.icon} aria-hidden="true">🗓️</span>
                        Calendário de Encontros 2026
                    </h2>
                </header>
                
                <p className={styles.description}>
                    Acompanhe as próximas datas e locais onde a missão será estabelecida ao longo de todo o ano.
                </p>

                <div className={styles.timeline}>
                    <div className={styles.timelineLine}></div>
                    <div className={styles.timelineGrid}>
                        {timelineData.map((item, index) => (
                            <div 
                                key={item.id} 
                                className={styles.timelineItem}
                                style={{ '--item-index': index }} // Controla o delay da animação
                            >
                                <div className={`${styles.dot} ${item.active ? styles.dotActive : ''}`}></div>
                                <h3 className={styles.timeDate}>{item.date}</h3>
                                <p className={styles.timeTitle}>{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <hr className={styles.divider} />

            {/* SEÇÃO 2: Cronograma */}
            <section className={styles.section}>
                <header className={styles.header}>
                    <h2 className={styles.title}>
                        <span className={styles.icon} aria-hidden="true">🏕️</span>
                        Cronograma de Retiro de Jovens
                    </h2>
                </header>

                <ul className={styles.scheduleList}>
                    {scheduleData.map((item, index) => (
                        <li 
                            key={item.id} 
                            className={styles.scheduleItem}
                            style={{ '--item-index': index }} // Controla o delay da lista
                        >
                            <div className={styles.scheduleDay}>{item.day}</div>
                            <div className={styles.scheduleEvents}>{item.events}</div>
                        </li>
                    ))}
                </ul>
            </section>

        </article>
    )
}