import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const ConfiguracionContext = createContext({ config: {}, loading: true })

export function ConfiguracionProvider({ children }) {
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('configuracion')
      .select('clave, valor')
      .then(({ data }) => {
        if (data) {
          const map = {}
          data.forEach(row => { map[row.clave] = row.valor })
          setConfig(map)
        }
        setLoading(false)
      })
  }, [])

  return (
    <ConfiguracionContext.Provider value={{ config, loading }}>
      {children}
    </ConfiguracionContext.Provider>
  )
}

export function useConfiguracion() {
  return useContext(ConfiguracionContext)
}
