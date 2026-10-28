import Link from 'next/link'
import { ArrowRight, Crown, Play, Plus, Sparkles } from 'lucide-react'
import { getPublishedSeries } from '@/lib/data'

export const revalidate = 60

export default async function HomePage() {
  const series = await getPublishedSeries()
  const featured = series.find(item => item.featured) ?? series[0]
  return <main className="site-shell">
    <section className="brand-banner" aria-label="Apresentação Novels Day"><div>
      <span className="banner-kicker"><Sparkles size={13}/> histórias novas para maratonar</span>
      <h1>Uma novela inteira<br/><em>na palma da mão.</em></h1>
      <p>Capítulos rápidos, personagens inesquecíveis e aquele gancho que faz você pedir a próxima parte.</p>
    </div></section>
    {featured ? <section className="hero" style={featured.hero_url?{backgroundImage:`linear-gradient(0deg,rgba(10,5,7,.98) 0%,rgba(10,5,7,.18) 74%),url(${featured.hero_url})`}:undefined}>
      <div className="hero-content"><span className="story-badge"><Crown size={13}/> DESTAQUE DO DIA</span><h2>{featured.title}</h2>
      <div className="story-meta"><span>Novela original</span><i/><span>Episódios curtos</span></div>
      {featured.synopsis&&<p>{featured.synopsis}</p>}<div className="hero-actions">
      <Link href={`/novela/${featured.slug}`} className="primary-button"><Play size={18} fill="currentColor"/> Assistir agora</Link>
      <Link href={`/novela/${featured.slug}`} className="secondary-button"><Plus size={19}/> Detalhes</Link></div></div>
    </section>:<section className="empty-hero"><div className="empty-copy"><span className="eyebrow">EM BREVE</span><h2>Histórias que começam aqui.</h2><p>As primeiras novelas estão sendo preparadas para você.</p></div></section>}
    <section className="catalog-section"><div className="section-heading"><div><span className="eyebrow">PARA MARATONAR</span><h2>{series.length?'Novelas que prendem':'Novidades em breve'}</h2></div>{series.length>0&&<Link href="/explorar" className="see-all">Ver tudo <ArrowRight size={15}/></Link>}</div>
    {series.length?<div className="poster-grid">{series.map((item,index)=><Link key={item.id} href={`/novela/${item.slug}`} className="poster-card"><div className="poster-image" style={item.cover_url?{backgroundImage:`url(${item.cover_url})`}:undefined}>{!item.cover_url&&<span className="poster-letter">{item.title.slice(0,1).toUpperCase()}</span>}{index===0&&<span className="new-ribbon">NOVO</span>}<span className="poster-play"><Play size={18} fill="currentColor"/></span></div><strong>{item.title}</strong><span className="card-caption">Comece a assistir</span></Link>)}</div>:<div className="empty-catalog"><div><strong>O catálogo está sendo preparado.</strong><p>Assim que uma novela for publicada, ela aparecerá aqui automaticamente.</p></div></div>}</section>
    <section className="premium-strip"><Crown size={24}/><div><span>Novels Day Premium</span><strong>Histórias sem interrupção.</strong></div><Link href="/assinar">Conhecer</Link></section>
  </main>
}

