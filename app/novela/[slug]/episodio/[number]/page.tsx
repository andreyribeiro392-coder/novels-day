import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getEpisode, getSeriesBySlug } from '@/lib/catalog'
import EpisodePlayer from '@/components/EpisodePlayer'

export const revalidate = 30

export default async function EpisodePage({ params }: { params: Promise<{ slug: string; number: string }> }) {
  const { slug, number } = await params
  const series = await getSeriesBySlug(slug)
  if (!series) notFound()

  const episodeNumber = Number(number)
  if (!Number.isInteger(episodeNumber) || episodeNumber < 1) notFound()
  const episode = await getEpisode(series.id, episodeNumber)
  if (!episode) notFound()

  return (
    <main className="player-page">
      <div className="player-header">
        <Link href={`/novela/${series.slug}`} className="back-button"><ArrowLeft size={20}/> Episódios</Link>
        <div><span>{series.title}</span><strong>EP. {episode.number} — {episode.title}</strong></div>
      </div>

      <EpisodePlayer
        episodeId={episode.id}
        access={episode.access}
        videoUrl={episode.video_url}
        thumbnailUrl={episode.thumbnail_url}
      />

      <section className="episode-description">
        <span className="eyebrow">EPISÓDIO {episode.number}</span>
        <h1>{episode.title}</h1>
        {episode.description && <p>{episode.description}</p>}
      </section>
    </main>
  )
}
