import Link from 'next/link'
import { Search, Home, Compass, Bookmark, User, Play, Plus } from 'lucide-react'
import { getPublishedSeries } from '@/lib/data'

export const revalidate = 60

export default async function HomePage() {
  const series = await getPublishedSeries()
  const featured = series.find((item) => item.featured) ?? series[0]

  return (
    <main className="site-shell">
      <header className="topbar">
        <Link href="/" className="brand" aria-label="NOVELS.DAY">
          <span className="brand-mark">N</span>
          <span className="brand-name">NOVELS<span>.DAY</span></span>
        </Link>
        <nav className="desktop-nav">
          <Link href="/">Início</Link>
          <Link href="/explorar">Explorar</Link>
          <Link href="/minha-lista">Minha lista</Link>
        </nav>
        <Link className="icon-button" href="/buscar" aria-label="Buscar"><Search size={20} /></Link>
      </header>

      {featured ? (
        <section className="hero" style={featured.hero_url ? { backgroundImage: `linear-gradient(90deg, rgba(8,5,13,.98) 0%, rgba(8,5,13,.72) 45%, rgba(8,5,13,.18) 100%), linear-gradient(0deg,#09060f 0%,transparent 40%), url(${featured.hero_url})` } : undefined}>
          <div className="hero-content">
            <span className="eyebrow">NOVELS.DAY</span>
            <h1>{featured.title}</h1>
            {featured.synopsis && <p>{featured.synopsis}</p>}
            <div className="hero-actions">
              <Link href={`/novela/${featured.slug}`} className="primary-button"><Play size={19} fill="currentColor" /> Assistir</Link>
              <Link href={`/novela/${featured.slug}`} className="secondary-button"><Plus size={20} /> Detalhes</Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="empty-hero">
          <div className="empty-orb" />
          <div className="empty-copy">
            <span className="eyebrow">NOVELS.DAY</span>
            <h1>Histórias que começam aqui.</h1>
            <p>O catálogo ainda está vazio. Quando você publicar sua primeira novela no painel administrativo, ela aparecerá aqui automaticamente.</p>
          </div>
        </section>
      )}

      <section className="catalog-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CATÁLOGO</span>
            <h2>{series.length ? 'Novelas' : 'Nenhum conteúdo publicado'}</h2>
          </div>
          {series.length > 0 && <span className="catalog-count">{series.length} {series.length === 1 ? 'título' : 'títulos'}</span>}
        </div>

        {series.length > 0 ? (
          <div className="poster-grid">
            {series.map((item) => (
              <Link key={item.id} href={`/novela/${item.slug}`} className="poster-card">
                <div className="poster-image" style={item.cover_url ? { backgroundImage: `url(${item.cover_url})` } : undefined}>
                  {!item.cover_url && <span className="poster-letter">{item.title.slice(0,1).toUpperCase()}</span>}
                  <span className="poster-play"><Play size={22} fill="currentColor" /></span>
                </div>
                <strong>{item.title}</strong>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-catalog">
            <div className="empty-icon"><Bookmark size={24} /></div>
            <div>
              <strong>Seu catálogo vai aparecer aqui.</strong>
              <p>Nenhum título fictício foi adicionado. Esta área usa somente conteúdo publicado no seu banco de dados.</p>
            </div>
          </div>
        )}
      </section>

      <nav className="mobile-nav" aria-label="Navegação principal">
        <Link href="/" className="active"><Home size={21}/><span>Início</span></Link>
        <Link href="/explorar"><Compass size={21}/><span>Explorar</span></Link>
        <Link href="/buscar"><Search size={21}/><span>Buscar</span></Link>
        <Link href="/minha-lista"><Bookmark size={21}/><span>Minha lista</span></Link>
        <Link href="/conta"><User size={21}/><span>Conta</span></Link>
      </nav>
    </main>
  )
}
