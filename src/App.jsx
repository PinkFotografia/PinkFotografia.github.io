import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import { ConfiguracionProvider } from './context/ConfiguracionContext'
import { TextosProvider } from './context/TextosContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ScrollToTop from './components/ui/ScrollToTop'

const PaquetesPage   = lazy(() => import('./pages/PaquetesPage'))
const PortafolioPage = lazy(() => import('./pages/PortafolioPage'))
const AdminPage      = lazy(() => import('./pages/AdminPage'))
const TerminosPage   = lazy(() => import('./pages/TerminosPage'))

export default function App() {
  return (
    <LangProvider>
      <ConfiguracionProvider>
        <TextosProvider>
          <ScrollToTop />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/paquetes" element={<Navigate to="/paquetes/pre-cumple" replace />} />
              <Route path="/paquetes/:categoria" element={<Layout><PaquetesPage /></Layout>} />
              <Route path="/portafolio/:categoria" element={<Layout><PortafolioPage /></Layout>} />
              <Route path="/admin/*" element={<AdminPage />} />
              <Route path="/terminos" element={<Layout><TerminosPage /></Layout>} />
            </Routes>
          </Suspense>
        </TextosProvider>
      </ConfiguracionProvider>
    </LangProvider>
  )
}
