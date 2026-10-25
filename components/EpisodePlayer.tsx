'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { LockKeyhole } from 'lucide-react'
import { getBrowserSupabase } from '@/lib/supabase-browser'

const supabase = getBrowserSupabase()

type Props = {
  episodeId: string
  access: 'free' | 'premium'
  videoUrl: string | null
  thumbnailUrl: string | null
}

export default function EpisodePlayer({ episodeId, access, videoUrl, thumbnailUrl }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const lastSaved = useRef(0)
  const [checking, setChecking] = useState(access === 'premium')
  const [allowed, setAllowed] = useState(access === 'free')
  const [userId, setUserId] = useState<string | null>(null)
  const [resumeAt, setResumeAt] = useState(0)

  useEffect(() => {
    async function boot() {
      if (!supabase) {
        setChecking(false)
        return
      }
      const { data: sessionData } = await supabase.auth.getSession()
      const uid = sessionData.session?.user.id ?? null
      setUserId(uid)

      if (uid) {
        const { data: progress } = await supabase.from('viewing_progress').select('position_seconds').eq('user_id', uid).eq('episode_id', episodeId).maybeSingle()
        if (progress?.position_seconds) setResumeAt(progress.position_seconds)
      }

      if (access === 'free') {
        setAllowed(true)
        setChecking(false)
        return
      }

      if (!uid) {
        setAllowed(false)
        setChecking(false)
        return
      }

      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('status,current_period_end')
        .eq('user_id', uid)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      const stillValid = Boolean(subscription) && (!subscription?.current_period_end || new Date(subscription.current_period_end).getTime() > Date.now())
      setAllowed(stillValid)
      setChecking(false)
    }
    boot()
  }, [access, episodeId])

  async function saveProgress(force = false) {
    const video = videoRef.current
    if (!supabase || !userId || !video) return
    const position = Math.floor(video.currentTime)
    if (!force && Math.abs(position - lastSaved.current) < 5) return
    lastSaved.current = position
    await supabase.from('viewing_progress').upsert({
      user_id: userId,
      episode_id: episodeId,
      position_seconds: position,
      completed: video.duration > 0 ? video.currentTime / video.duration >= .95 : false,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,episode_id' })
  }

  if (checking) {
    return <div className="video-stage"><div className="video-empty"><strong>Verificando assinatura…</strong></div></div>
  }

  if (!allowed) {
    return (
      <div className="premium-lock-card player-lock-inline">
        <div className="lock-badge"><LockKeyhole size={25}/></div>
        <span className="eyebrow">NOVELS.DAY PREMIUM</span>
        <h2>Este episódio é exclusivo para assinantes.</h2>
        <p>{userId ? 'Sua conta não possui uma assinatura ativa.' : 'Entre na sua conta e assine para continuar.'}</p>
        <div className="lock-actions">
          {!userId && <Link href="/conta" className="secondary-button">Entrar</Link>}
          <Link href="/assinar" className="primary-button">Ver assinatura</Link>
        </div>
      </div>
    )
  }

  return (
    <section className="video-stage">
      {videoUrl ? (
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster={thumbnailUrl ?? undefined}
          src={videoUrl}
          onLoadedMetadata={() => {
            if (videoRef.current && resumeAt > 0 && resumeAt < videoRef.current.duration - 3) videoRef.current.currentTime = resumeAt
          }}
          onTimeUpdate={() => saveProgress(false)}
          onPause={() => saveProgress(true)}
          onEnded={() => saveProgress(true)}
        />
      ) : (
        <div className="video-empty"><strong>Vídeo ainda não enviado.</strong><span>Adicione a URL real do vídeo no painel administrativo.</span></div>
      )}
    </section>
  )
}
