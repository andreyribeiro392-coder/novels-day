import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getEpisode, getSeriesBySlug } from '@/lib/catalog'
import EpisodePlayer from '@/components/EpisodePlayer'

export const revalidate = 10

export default async function EpisodePage({ params }: { params: Promise<{ slug: string; number: string }> }) {
  const { slug, number } = await params
  const series = await getSeriesBySlug(slug)
  if (!series) notFound()

  const episodeNumber = Number(number)
  if (!Number.isInteger(episodeNumber) || episodeNumber < 1) notFound()
  const episode = await getEpisode(series.id, episodeNumber)
  if (!episode) notFound()
  const effectiveAccess = episode.number <= 2 ? 'free' : episode.access

  return (
    <main className="player-page vertical-experience">
      <div className="player-topline">
        <Link href={`/novela/${series.slug}`} className="quiet-back"><ArrowLeft size={18}/> Episódios</Link>
        <div className="episode-meta"><span>{series.title}</span><strong>EP. {episode.number}</strong></div>
      </div>

      <EpisodePlayer
        episodeId={episode.id}
        access={effectiveAccess}
        videoUrl={episode.video_url}
        videoPath={episode.video_path}
        thumbnailUrl={episode.thumbnail_url}
        subtitleUrl={episode.subtitle_url}
        backHref={`/novela/${series.slug}`}
      />

      <section className="episode-description compact-description">
        <div className="episode-heading-line">
          <div><span className="eyebrow">EPISÓDIO {episode.number}</span><h1>{episode.title}</h1></div>
          <span className={`access-pill ${effectiveAccess}`}>{effectiveAccess === 'premium' ? 'Premium' : 'Grátis'}</span>
        </div>
        {episode.description && <p>{episode.description}</p>}
        {episode.caption && <div className="episode-caption"><span>Legenda / texto</span><p>{episode.caption}</p></div>}
      </section>
    </main>
  )
}

