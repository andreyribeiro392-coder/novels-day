import Link from 'next/link'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getEpisode, getSeriesBySlug } from '@/lib/catalog'

export const revalidate = 30

export default async function EpisodePage({ params }: { params: Promise<{ slug: string; number: string }> }) {
  const { slug, number } = await params
  const series = await getSeriesBySlug(slug)
  if (!series) notFound()

  const episodeNumber = Number(number)
  if (!Number.isInteger(episodeNumber) || episodeNumber < 1) notFound()
  const episode = await getEpisode(series.id, episodeNumber)
  if (!episode) notFound()

  if (episode.access === 'premium') {
    return (
      <main className="player-page locked-player">
        <Link href={`/novela/${series.slug}`} className="back-button"><ArrowLeft size={20}/> Episódios</Link>
        <div className="premium-lock-card">
          <div className="lock-badge"><LockKeyhole size={25}/></div>
          <span className="eyebrow">NOVELS.DAY PREMIUM</span>
          <h1>{episode.title}</h1>
          <p>Este episódio está marcado como Premium. O acesso só deve ser liberado após uma assinatura válida.</p>
          <Link href="/assinar" className="primary-button">Ver assinatura</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="player-page">
      <div className="player-header">
        <Link href={`/novela/${series.slug}`} className="back-button"><ArrowLeft size={20}/> Episódios</Link>
        <div><span>{series.title}</span><strong>EP. {episode.number} — {episode.title}</strong></div>
      </div>

      <section className="video-stage">
        {episode.video_url ? (
          <video controls playsInline preload="metadata" poster={episode.thumbnail_url ?? undefined} src={episode.video_url} />
        ) : (
          <div className="video-empty"><strong>Vídeo ainda não enviado.</strong><span>Adicione a URL do vídeo deste episódio no painel administrativo.</span></div>
        )}
      </section>

      <section className="episode-description">
        <span className="eyebrow">EPISÓDIO {episode.number}</span>
        <h1>{episode.title}</h1>
        {episode.description && <p>{episode.description}</p>}
      </section>
    </main>
  )
}
