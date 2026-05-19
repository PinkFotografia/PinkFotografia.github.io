import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useAlbumes(categoria) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!categoria) return

    setLoading(true)
    supabase
      .from('albumes')
      .select('*')
      .eq('categoria', categoria)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error)
        else setData(data || [])
        setLoading(false)
      })
  }, [categoria])

  return { data, loading, error }
}
