import { Outlet } from 'react-router-dom'

// Importações apontando para os nomes reais dos arquivos das pastas vizinhas
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import styles from './Layout.module.scss'

export default function Layout() {
  return (
    <div className={styles.shell}>
      <Navbar />
      
      {/* O Outlet é onde as páginas internas (Home, Historia, etc) serão renderizadas */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}