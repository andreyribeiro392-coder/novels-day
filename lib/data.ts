import { createClient } from '@supabase/supabase-js'
import type { Series } from './types'

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

export async function getPublishedSeries(): Promise<Series[]> {
  const supabase = getClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('series')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('NOVELS.DAY: erro ao carregar catálogo', error.message)
    return []
  }

  return (data ?? []) as Series[]
}
