// src/App.jsx
// ============================================================
// App.jsx — Iron Dome (Exército da Fé) - Versão Protegida
// ============================================================
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Layout compartilhado (Aponta para o index dentro da pasta Layout)
import Layout from './components/Layout/Layout'

// Páginas Reais
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Home from './pages/Home/Home'
import Testemunhos from "./pages/Testemunhos/Testemunho.jsx";

// Estilos globais (Carregados na ordem correta)
import './styles/main.scss'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sua Landing Page Real — standalone, sem Navbar/Footer */}
        <Route path="/" element={<LandingPage />} />

        {/* Rotas com Layout compartilhado (Navbar + Conteúdo + Footer) */}
        <Route element={<Layout />}>
          <Route path="/home"     element={<Home />}     />
          <Route path="/historia" element={<Historia />} />
          <Route path="/testemunho" element={<Testemunhos />} />

        </Route>
        
        {/* Se o usuário digitar qualquer rota inexistente, manda para a Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}