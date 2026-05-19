import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useConfiguracion() {
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

  return { config, loading }
}
