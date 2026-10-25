import { createClient } from '@supabase/supabase-js'
import type { Episode, Series } from './types'

function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  const supabase = client()
  if (!supabase) return null
  const { data } = await supabase.from('series').select('*').eq('slug', slug).eq('status', 'published').maybeSingle()
  return (data as Series | null) ?? null
}

export async function getEpisodes(seriesId: string): Promise<Episode[]> {
  const supabase = client()
  if (!supabase) return []
  const { data } = await supabase.from('episodes').select('*').eq('series_id', seriesId).eq('status', 'published').order('number')
  return (data ?? []) as Episode[]
}

export async function getEpisode(seriesId: string, number: number): Promise<Episode | null> {
  const supabase = client()
  if (!supabase) return null
  const { data } = await supabase.from('episodes').select('*').eq('series_id', seriesId).eq('number', number).eq('status', 'published').maybeSingle()
  return (data as Episode | null) ?? null
}
