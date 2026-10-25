import Link from 'next/link'
import { ArrowLeft, Play, Search } from 'lucide-react'
import { getPublishedSeries } from '@/lib/data'

export const revalidate = 30

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams
  const query = q.trim().toLowerCase()
  const all = await getPublishedSeries()
  const results = query ? all.filter(item => `${item.title} ${item.synopsis ?? ''}`.toLowerCase().includes(query)) : []

  return (
    <main className="utility-page">
      <div className="utility-header">
        <div className="utility-title"><span className="eyebrow">BUSCAR</span><h1>Encontre sua próxima história</h1></div>
        <Link href="/" className="back-link"><ArrowLeft size={17}/> Início</Link>
      </div>
      <form className="search-form" action="/buscar">
        <input name="q" defaultValue={q} placeholder="Digite o nome da novela..." autoFocus />
        <button type="submit" aria-label="Buscar"><Search size={19}/></button>
      </form>
      {!query ? <div className="utility-empty">Digite o nome de uma novela publicada para pesquisar.</div> : results.length ? <div className="poster-grid">{results.map(item => <Link key={item.id} href={`/novela/${item.slug}`} className="poster-card"><div className="poster-image" style={item.cover_url ? { backgroundImage: `url(${item.cover_url})` } : undefined}>{!item.cover_url && <span className="poster-letter">{item.title.slice(0,1).toUpperCase()}</span>}<span className="poster-play"><Play size={22} fill="currentColor"/></span></div><strong>{item.title}</strong></Link>)}</div> : <div className="utility-empty">Nenhum título publicado corresponde a “{q}”.</div>}
    </main>
  )
}
