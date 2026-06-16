import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/home/Hero'
import Servicios from '../components/home/Servicios'
import PortfolioPreview from '../components/home/PortfolioPreview'
import SobreMi from '../components/home/SobreMi'
import Resenas from '../components/home/Resenas'
import Reservas from '../components/home/Reservas'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return
    const el = document.getElementById(target)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <Hero />
      <SobreMi />
      <Servicios />
      <PortfolioPreview />
      <Resenas />
      <Reservas />
    </>
  )
}
