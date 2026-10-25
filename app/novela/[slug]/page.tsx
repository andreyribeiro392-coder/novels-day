import Link from 'next/link'
import { ArrowLeft, LockKeyhole, Play } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getEpisodes, getSeriesBySlug } from '@/lib/catalog'
import FavoriteButton from '@/components/FavoriteButton'

export const revalidate = 60

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const series = await getSeriesBySlug(slug)
  if (!series) notFound()
  const episodes = await getEpisodes(series.id)

  return (
    <main className="detail-page">
      <section className="detail-hero" style={series.hero_url ? { backgroundImage: `linear-gradient(0deg,#09060f 0%,rgba(9,6,15,.4) 55%,rgba(9,6,15,.15)), linear-gradient(90deg,rgba(9,6,15,.92),transparent 70%), url(${series.hero_url})` } : undefined}>
        <Link href="/" className="back-button"><ArrowLeft size={20}/> Voltar</Link>
        <div className="detail-copy">
          <span className="eyebrow">NOVELS.DAY</span>
          <h1>{series.title}</h1>
          {series.synopsis && <p>{series.synopsis}</p>}
          <div className="detail-actions">
            {episodes[0] && <Link className="primary-button detail-play" href={`/novela/${series.slug}/episodio/${episodes[0].number}`}><Play size={18} fill="currentColor"/> Começar</Link>}
            <FavoriteButton seriesId={series.id}/>
          </div>
        </div>
      </section>

      <section className="episodes-section">
        <div className="section-heading"><div><span className="eyebrow">EPISÓDIOS</span><h2>{episodes.length ? 'Temporada atual' : 'Nenhum episódio publicado'}</h2></div></div>
        {episodes.length ? (
          <div className="episode-list">
            {episodes.map((episode) => (
              <Link key={episode.id} href={`/novela/${series.slug}/episodio/${episode.number}`} className="episode-card">
                <div className="episode-thumb" style={episode.thumbnail_url ? { backgroundImage: `url(${episode.thumbnail_url})` } : undefined}>
                  <span className="episode-number">{episode.number}</span>
                  <span className="episode-play">{episode.access === 'premium' ? <LockKeyhole size={20}/> : <Play size={20} fill="currentColor"/>}</span>
                </div>
                <div className="episode-copy">
                  <div className="episode-title-row"><strong>{episode.title}</strong><span>{episode.access === 'premium' ? 'Premium' : 'Grátis'}</span></div>
                  {episode.description && <p>{episode.description}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-catalog"><div><strong>Esta novela ainda não tem episódios publicados.</strong><p>Assim que um episódio for publicado no painel, ele aparecerá nesta página.</p></div></div>
        )}
      </section>
    </main>
  )
}
