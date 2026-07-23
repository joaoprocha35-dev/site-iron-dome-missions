// ============================================================
// HeroBanner/index.jsx
// ============================================================
import 'react-bootstrap'
import styles from './HeroBanner.module.scss'
export default function HeroBanner() {

  return (

    <section className={styles.hero} aria-label="Banner principal">

      {/* Camadas decorativas de fundo */}
      <div className={styles.bgBase}  aria-hidden="true" />
      <div className={styles.bgGlow}  aria-hidden="true" />
      <div className={styles.bgCross}  aria-hidden="true"> <span className={styles.cruz}>✝</span></div>
      <div className={styles.bgOverlay} aria-hidden="true" />

      {/* Conteúdo principal */}
      <div className={styles.content}>

        <h1 className={styles.headline}>
          Seja bem vindo a nossa tela Principal<br/>
          <em className={styles.headlineAccent}>Aonde você irá entender um pouquinho do que é o Iron Dome. </em>
        </h1>

       
      </div>

    </section>
  )
} 

