'use client'

import { useEffect, useState } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { getBrowserSupabase } from '@/lib/supabase-browser'

const supabase = getBrowserSupabase()

export default function FavoriteButton({ seriesId }: { seriesId: string }) {
  const [userId, setUserId] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    async function load() {
      if (!supabase) return
      const { data } = await supabase.auth.getSession()
      const uid = data.session?.user.id ?? null
      setUserId(uid)
      if (!uid) return
      const { data: favorite } = await supabase.from('favorites').select('series_id').eq('user_id', uid).eq('series_id', seriesId).maybeSingle()
      setSaved(Boolean(favorite))
    }
    load()
  }, [seriesId])

  async function toggle() {
    if (!supabase || !userId || busy) {
      if (!userId) window.location.href = '/conta'
      return
    }
    setBusy(true)
    if (saved) {
      const { error } = await supabase.from('favorites').delete().eq('user_id', userId).eq('series_id', seriesId)
      if (!error) setSaved(false)
    } else {
      const { error } = await supabase.from('favorites').insert({ user_id: userId, series_id: seriesId })
      if (!error) setSaved(true)
    }
    setBusy(false)
  }

  return (
    <button className="secondary-button favorite-button" type="button" onClick={toggle} disabled={busy}>
      {saved ? <BookmarkCheck size={19}/> : <Bookmark size={19}/>} {saved ? 'Salvo' : 'Minha lista'}
    </button>
  )
}
