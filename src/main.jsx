import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/main.scss' // Garante que seus estilos globais e Bootstrap sejam carregados

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)