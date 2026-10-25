'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, Bookmark, Play } from 'lucide-react'
import { getBrowserSupabase } from '@/lib/supabase-browser'

const supabase = getBrowserSupabase()

type FavoriteRow = {
  series: {
    id: string
    slug: string
    title: string
    cover_url: string | null
    status: string
  } | null
}

export default function MyListPage() {
  const [loading, setLoading] = useState(true)
  const [logged, setLogged] = useState(false)
  const [items, setItems] = useState<FavoriteRow[]>([])

  useEffect(() => {
    async function load() {
      if (!supabase) return setLoading(false)
      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData.session?.user
      if (!user) return setLoading(false)
      setLogged(true)
      const { data } = await supabase.from('favorites').select('series:series_id(id,slug,title,cover_url,status)').eq('user_id', user.id).order('created_at', { ascending: false })
      setItems((data ?? []) as unknown as FavoriteRow[])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <main className="utility-page">
      <div className="utility-header">
        <div className="utility-title"><span className="eyebrow">MINHA LISTA</span><h1>Salvos</h1><p>Esta área mostra apenas títulos realmente salvos na sua conta.</p></div>
        <Link href="/" className="back-link"><ArrowLeft size={17}/> Início</Link>
      </div>

      {loading ? <div className="utility-empty">Carregando sua lista…</div> : !supabase ? <div className="utility-empty">Configure o Supabase para usar a lista de favoritos.</div> : !logged ? <div className="utility-empty">Entre na sua <Link href="/conta">conta</Link> para acessar sua lista.</div> : items.filter(item => item.series).length ? (
        <div className="poster-grid">{items.filter(item => item.series).map(item => { const series = item.series!; return <Link key={series.id} href={`/novela/${series.slug}`} className="poster-card"><div className="poster-image" style={series.cover_url ? { backgroundImage: `url(${series.cover_url})` } : undefined}>{!series.cover_url && <span className="poster-letter">{series.title.slice(0,1).toUpperCase()}</span>}<span className="poster-play"><Play size={22} fill="currentColor"/></span></div><strong>{series.title}</strong></Link> })}</div>
      ) : <div className="utility-empty"><Bookmark size={20}/> Sua lista está vazia. Nenhum item foi preenchido automaticamente.</div>}
    </main>
  )
}
