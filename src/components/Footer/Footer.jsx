// ============================================================
// Footer/index.jsx
// ============================================================
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container fluid className={styles.inner}>
        <Row className="align-items-center">
          <Col xs={12} md={3}>
            <span className={styles.brand}>IRON DOME</span>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <p className={styles.copy}>© 2024 IRON DOME. MISSÃO INABALÁVEL.</p>
            <p className={styles.attribution}>
              Imagem por <a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer">Freepik</a>
            </p>
          </Col>
          <Col xs={12} md={3} className="d-flex justify-content-end">
            <nav className={styles.links}>
              <NavLink to="#">Privacidade</NavLink>
              <NavLink to="#">Termos de Uso</NavLink>
              <NavLink to="#">Contato</NavLink>
            </nav>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}