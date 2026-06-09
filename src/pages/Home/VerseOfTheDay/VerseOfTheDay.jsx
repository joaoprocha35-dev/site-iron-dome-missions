// ============================================================
// VerseOfTheDay/index.jsx (Atualizado com controle de Scroll)
// ============================================================
import { useEffect, useRef } from 'react'
import styles from './VerseOfTheDay.module.scss'
import fotoLideranca from '../../../assets/imagensHome/lideranca.png'
import equipe1 from '../../../assets/imagensHome/equipe1.png'

export default function VerseOfTheDay() {
    const containerRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Quando o elemento passar da barreira configurada, ele ativa
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible)
                    }
                });
            },
            { 
                // CONTROLE DO GATILHO:
                // 0.3 significa que 15% do card precisa estar na tela.
                threshold: 0.15, 
                
                // MÁGICA PARA O CELULAR: 
                // Recua a linha de ativação em 150px para cima do rodapé. 
                // O card só anima quando você realmente começar a ver o conteúdo dele!
                rootMargin: "0px 0px -150px 0px" 
            }
        );

        const cards = containerRef.current.querySelectorAll(`.${styles.card}`)
        cards.forEach((card) => observer.observe(card))

        return () => observer.disconnect()
    }, [])

    return (
        <div ref={containerRef} className={styles.gridContainer}>

            {/* QUADRANTE 1 */}
            <aside className={styles.card} aria-label="Liderança">
                <h2 className={styles.title}>
                    <span className={styles.icon} aria-hidden="true">👥</span>
                    Liderança
                </h2>
                <div className={styles.imageWrapper}>
                    <img src={fotoLideranca} alt="Liderança" className={styles.imageAnimated} />
                </div>
                <p className={styles.textAnimated}>
                    Ao ouvir tantos relatos sobre jovens, nasceu em nós o desejo de ajudá-los a resgatar sua identidade. Assim, em 04 de maio de 2024, surgiu o Iron Dome: um trabalho interdenominacional para que o jovem resolva seus conflitos de forma leve, tendo Deus como amigo.
                </p>
            </aside>

            {/* QUADRANTE 2 */}
            <aside className={styles.card} aria-label="Histórico de Encontros">
                <h2 className={styles.title}>
                    <span className={styles.icon} aria-hidden="true">📍</span>
                    Histórico de Encontros Realizados
                </h2>
                <ul className={styles.locationList}>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> Botucatu</li>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> Botucatu</li>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> São Paulo</li>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> Rio Claro</li>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> Botucatu</li>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> São Paulo</li>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> Paraíba</li>
                </ul>
            </aside>

            {/* QUADRANTE 3 */}
            <aside className={styles.card} aria-label="Histórico de Edições">
                <h2 className={styles.title}>
                    <span className={styles.icon} aria-hidden="true">🎖️</span>
                    Histórico de Edições Realizadas
                </h2>
                <ul className={styles.locationList}>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> <div><strong>EJC Nível 1</strong><br/><span className={styles.subText}>Botucatu</span></div></li>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> <div><strong>EJC Nível 2</strong><br/><span className={styles.subText}>Botucatu</span></div></li>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> <div><strong>EJC Nível 3</strong><br/><span className={styles.subText}>São Paulo</span></div></li>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> <div><strong>EJC Nível 4</strong><br/><span className={styles.subText}>Rio Claro</span></div></li>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> <div><strong>EJC Nível 5</strong><br/><span className={styles.subText}>Botucatu</span></div></li>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> <div><strong>EJC Nível 6</strong><br/><span className={styles.subText}>São Paulo</span></div></li>
                    <li className={styles.locationItem}><span className={styles.checkIcon}>✔</span> <div><strong>EJC Nível 7</strong><br/><span className={styles.subText}>Paraíba</span></div></li>
                </ul>
            </aside>

            {/* QUADRANTE 4 */}
            <aside className={styles.card} aria-label="Nossa Equipe">
                <h2 className={styles.title}>
                    <span className={styles.icon} aria-hidden="true">🔥</span>
                    Não somos apenas equipes
                </h2>
                <div className={styles.imageWrapper}>
                    <img src={equipe1} alt="Equipe" className={styles.imageAnimated} />
                </div>
                <p className={styles.textAnimated}>
                    Somos pessoas dispostas a correr em direção à dor para resgatar vidas, restaurar esperança e mostrar que ninguém luta sozinho.
                    <br/><br/>
                    Em cada encontro, nasce uma missão. Em cada missão, vidas são alcançadas.
                </p>
            </aside>

        </div>
    )
}