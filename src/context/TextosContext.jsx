import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const TextosContext = createContext({ textos: {}, loading: true })

export function TextosProvider({ children }) {
  const [textos, setTextos] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('textos')
      .select('clave, valor_es, valor_en')
      .then(({ data }) => {
        if (data) {
          const map = {}
          data.forEach(row => { map[row.clave] = { es: row.valor_es, en: row.valor_en } })
          setTextos(map)
        }
        setLoading(false)
      })
  }, [])

  return (
    <TextosContext.Provider value={{ textos, loading }}>
      {children}
    </TextosContext.Provider>
  )
}

export function useTextos() {
  return useContext(TextosContext)
}
