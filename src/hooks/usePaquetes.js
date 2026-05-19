import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function usePaquetes(categoria) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!categoria) return

    setLoading(true)
    supabase
      .from('paquetes')
      .select('*')
      .eq('categoria', categoria)
      .order('orden', { ascending: true })
      .then(({ data, error }) => {
        if (error) setError(error)
        else setData(data || [])
        setLoading(false)
      })
  }, [categoria])

  return { data, loading, error }
}
