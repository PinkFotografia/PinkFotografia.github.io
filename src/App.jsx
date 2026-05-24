import { Routes, Route } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import PaquetesPage from './pages/PaquetesPage'
import PortafolioPage from './pages/PortafolioPage'
import AdminPage from './pages/AdminPage'
import TerminosPage from './pages/TerminosPage'
import ScrollToTop from './components/ui/ScrollToTop'

export default function App() {
  return (
    <LangProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/paquetes/:categoria" element={<Layout><PaquetesPage /></Layout>} />
        <Route path="/portafolio/:categoria" element={<Layout><PortafolioPage /></Layout>} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/terminos" element={<Layout><TerminosPage /></Layout>} />
      </Routes>
    </LangProvider>
  )
}
