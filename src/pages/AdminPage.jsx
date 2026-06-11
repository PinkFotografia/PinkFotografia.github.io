import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import TabResumen from '../components/admin/TabResumen'
import TabSesiones from '../components/admin/TabSesiones'
import TabGastos from '../components/admin/TabGastos'
import TabPaquetes from '../components/admin/TabPaquetes'
import TabAlbumes from '../components/admin/TabAlbumes'
import TabConfiguracion from '../components/admin/TabConfiguracion'

const TABS = [
  { id: 'resumen',       label: 'Resumen' },
  { id: 'sesiones',      label: 'Sesiones' },
  { id: 'gastos',        label: 'Gastos' },
  { id: 'paquetes',      label: 'Paquetes' },
  { id: 'albumes',       label: 'Álbumes' },
  { id: 'configuracion', label: 'Configuración' },
]

const TAB_COMPONENTS = {
  resumen:       TabResumen,
  sesiones:      TabSesiones,
  gastos:        TabGastos,
  paquetes:      TabPaquetes,
  albumes:       TabAlbumes,
  configuracion: TabConfiguracion,
}

export default function AdminPage() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('resumen')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <div className="text-white/20 text-[11px] tracking-[0.2em] uppercase">Cargando…</div>
    </div>
  )

  if (!session) return <LoginForm />

  const ActiveTab = TAB_COMPONENTS[activeTab]

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex">
      <aside className="w-[220px] min-h-screen bg-[#111] border-r border-white/[0.06] flex flex-col flex-shrink-0 fixed top-0 left-0 h-full">
        <div className="px-6 py-8 border-b border-white/[0.06]">
          <div className="font-serif italic text-[1.4rem] text-pink-mid leading-none">Pink</div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-white/25 mt-1">Admin Panel</div>
        </div>

        <nav className="flex-1 py-3">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-6 py-[0.7rem] text-[11px] tracking-[0.1em] uppercase font-sans transition-colors
                ${activeTab === tab.id
                  ? 'text-pink bg-pink/[0.08] border-r-2 border-pink'
                  : 'text-white/35 hover:text-white/60 hover:bg-white/[0.03]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-5 border-t border-white/[0.06]">
          <div className="text-[11px] text-white/20 mb-3 truncate">{session.user.email}</div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-[11px] tracking-[0.08em] uppercase text-white/35 hover:text-pink transition-colors font-sans"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-[220px] min-h-screen overflow-y-auto">
        <ActiveTab />
      </main>
    </div>
  )
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      <div className="w-full max-w-[360px]">
        <div className="text-center mb-10">
          <div className="font-serif italic text-[2.8rem] text-pink-mid leading-none">Pink</div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-white/25 mt-2">Administración</div>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1A1A1A] rounded-[14px] p-8 border border-white/[0.06]">
          <div className="mb-5">
            <label className="block text-[10px] tracking-[0.12em] uppercase text-white/35 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-[8px] px-4 py-[0.65rem] text-[13px] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-pink transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] tracking-[0.12em] uppercase text-white/35 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-[8px] px-4 py-[0.65rem] text-[13px] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-pink transition-colors"
            />
          </div>

          {error && (
            <div className="mb-5 text-[12px] text-red-400 bg-red-400/[0.08] rounded-[6px] px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink text-white py-[0.8rem] rounded-[8px] text-[11px] tracking-[0.12em] uppercase font-sans hover:bg-pink-dark transition-colors disabled:opacity-50"
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
