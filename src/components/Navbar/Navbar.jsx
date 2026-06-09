import { useState } from 'react'
import { Container, Nav, Navbar as BSNavbar, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.scss'

export default function Navbar() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  const fecharMenu = () => setExpanded(false)

  return (
    <BSNavbar
      expanded={expanded}
      onToggle={setExpanded}
      expand="lg"
      className={styles.navbar}
      sticky="top"
    >
      <Container fluid className={styles.inner}>

        {/* Brand */}
        <BSNavbar.Brand
          as={NavLink}
          to="/home"
          className={styles.brand}
          onClick={fecharMenu}
        >
          <span className={styles.brandIcon} aria-hidden="true">✦</span>
          IRON DOME
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="main-nav" className={styles.toggler} />

        <BSNavbar.Collapse id="main-nav">
          <Nav className={`mx-auto ${styles.navLinks}`}>

            {/* Links com a tag <p> e classes distintas restauradas */}
            <Nav.Link
              as={NavLink}
              to="/home"
              className={({ isActive }) => `${styles.linkContainer} ${isActive ? styles.linkActive : ''}`}
              onClick={fecharMenu}
            >
              <p className={styles.linkText}>Home</p>
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/historia"
              className={({ isActive }) => `${styles.linkContainer} ${isActive ? styles.linkActive : ''}`}
              onClick={fecharMenu}
            >
              <p className={styles.linkText}>Nossa História</p>
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/produtos"
              className={({ isActive }) => `${styles.linkContainer} ${isActive ? styles.linkActive : ''}`}
              onClick={fecharMenu}
            >
              <p className={styles.linkText}>Produtos</p>
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/testemunho"
              className={({ isActive }) => `${styles.linkContainer} ${isActive ? styles.linkActive : ''}`}
              onClick={fecharMenu}
            >
              <p className={styles.linkText}>Testemunhos</p>
            </Nav.Link>

          </Nav>

          <Button
            className={styles.voltarbtn}
            onClick={() => {
              fecharMenu();
              navigate('/LandingPage');
            }}
          >
            Sair
          </Button>
        </BSNavbar.Collapse>

      </Container>
    </BSNavbar>
  )
}