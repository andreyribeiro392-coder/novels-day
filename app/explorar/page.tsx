import Link from 'next/link'
import { ArrowLeft, Play } from 'lucide-react'
import { getPublishedSeries } from '@/lib/data'

export const revalidate = 60

export default async function ExplorePage() {
  const series = await getPublishedSeries()
  return (
    <main className="utility-page">
      <div className="utility-header">
        <div className="utility-title"><span className="eyebrow">EXPLORAR</span><h1>Catálogo</h1><p>Somente títulos que você publicou no painel aparecem aqui.</p></div>
        <Link href="/" className="back-link"><ArrowLeft size={17}/> Início</Link>
      </div>
      {series.length ? <div className="poster-grid">{series.map(item => <Link key={item.id} href={`/novela/${item.slug}`} className="poster-card"><div className="poster-image" style={item.cover_url ? { backgroundImage: `url(${item.cover_url})` } : undefined}>{!item.cover_url && <span className="poster-letter">{item.title.slice(0,1).toUpperCase()}</span>}<span className="poster-play"><Play size={22} fill="currentColor"/></span></div><strong>{item.title}</strong></Link>)}</div> : <div className="utility-empty">Nenhuma novela foi publicada ainda.</div>}
    </main>
  )
}
