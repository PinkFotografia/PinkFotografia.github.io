import { createContext, useContext, useState } from 'react'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es')

  const toggle = () => setLang(l => (l === 'es' ? 'en' : 'es'))

  // t('texto en español', 'text in english')
  const t = (es, en) => (lang === 'es' ? es : en)

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
