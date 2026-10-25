'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, LockKeyhole, Play } from 'lucide-react'
import { getBrowserSupabase } from '@/lib/supabase-browser'

const supabase = getBrowserSupabase()

type Props = {
  episodeId: string
  access: 'free' | 'premium'
  videoUrl: string | null
  videoPath: string | null
  thumbnailUrl: string | null
  subtitleUrl: string | null
  backHref: string
}

export default function EpisodePlayer({ episodeId, access, videoUrl, videoPath, thumbnailUrl, subtitleUrl, backHref }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const lastSaved = useRef(0)
  const viewRegistered = useRef(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [checking, setChecking] = useState(access === 'premium' || Boolean(videoPath))
  const [allowed, setAllowed] = useState(access === 'free')
  const [userId, setUserId] = useState<string | null>(null)
  const [resumeAt, setResumeAt] = useState(0)
  const [resolvedVideo, setResolvedVideo] = useState(videoUrl)
  const [controlsVisible, setControlsVisible] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    async function boot() {
      if (!supabase) { setChecking(false); return }
      const { data: sessionData } = await supabase.auth.getSession()
      const uid = sessionData.session?.user.id ?? null
      setUserId(uid)

      if (uid) {
        const { data: progress } = await supabase.from('viewing_progress').select('position_seconds').eq('user_id', uid).eq('episode_id', episodeId).maybeSingle()
        if (progress?.position_seconds) setResumeAt(progress.position_seconds)
      }

      let canWatch = access === 'free'
      if (access === 'premium' && uid) {
        const { data: subscription } = await supabase.from('subscriptions').select('status,current_period_end').eq('user_id', uid).eq('status', 'active').order('created_at', { ascending: false }).limit(1).maybeSingle()
        canWatch = Boolean(subscription) && (!subscription?.current_period_end || new Date(subscription.current_period_end).getTime() > Date.now())
      }
      setAllowed(canWatch)

      if (canWatch && videoPath) {
        const { data, error } = await supabase.storage.from('novels-videos').createSignedUrl(videoPath, 60 * 60 * 4)
        if (!error && data?.signedUrl) setResolvedVideo(data.signedUrl)
      }
      setChecking(false)
    }
    boot()
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current) }
  }, [access, episodeId, videoPath])

  function revealControls() {
    setControlsVisible(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setControlsVisible(false), 2600)
  }

  async function registerView() {
    if (!supabase || viewRegistered.current) return
    viewRegistered.current = true
    const key = `novels-session-${episodeId}`
    let sessionId = sessionStorage.getItem(key)
    if (!sessionId) { sessionId = crypto.randomUUID(); sessionStorage.setItem(key, sessionId) }
    await supabase.from('episode_views').insert({ episode_id: episodeId, user_id: userId, session_id: sessionId })
  }

  async function saveProgress(force = false) {
    const video = videoRef.current
    if (!supabase || !userId || !video) return
    const position = Math.floor(video.currentTime)
    if (!force && Math.abs(position - lastSaved.current) < 5) return
    lastSaved.current = position
    await supabase.from('viewing_progress').upsert({ user_id:userId, episode_id:episodeId, position_seconds:position, completed:video.duration > 0 ? video.currentTime / video.duration >= .95 : false, updated_at:new Date().toISOString() }, { onConflict:'user_id,episode_id' })
  }

  if (checking) return <div className="vertical-player-shell"><div className="video-empty"><strong>Preparando episódio…</strong></div></div>
  if (!allowed) return <div className="premium-lock-card player-lock-inline"><div className="lock-badge"><LockKeyhole size={25}/></div><span className="eyebrow">NOVELS.DAY PREMIUM</span><h2>Continue esta história</h2><p>{userId ? 'Este episódio está disponível para assinantes ativos.' : 'Entre na sua conta e assine para desbloquear este episódio.'}</p><div className="lock-actions">{!userId && <Link href="/conta" className="secondary-button">Entrar</Link>}<Link href="/assinar" className="primary-button">Assinar por R$ 19,99</Link></div></div>

  return (
    <section className="vertical-player-shell" onClick={revealControls}>
      {resolvedVideo ? <>
        <video ref={videoRef} playsInline controls={started} preload="metadata" poster={thumbnailUrl ?? undefined} src={resolvedVideo}
          onLoadedMetadata={() => { if (videoRef.current && resumeAt > 0 && resumeAt < videoRef.current.duration - 3) videoRef.current.currentTime = resumeAt }}
          onPlay={() => { setStarted(true); registerView(); revealControls() }} onTimeUpdate={() => saveProgress(false)} onPause={() => saveProgress(true)} onEnded={() => saveProgress(true)}>
          {subtitleUrl && <track kind="subtitles" src={subtitleUrl} srcLang="pt-BR" label="Português" default />}
        </video>
        {!started && <button className="big-play" onClick={(e)=>{e.stopPropagation();setStarted(true);videoRef.current?.play()}} aria-label="Reproduzir"><Play fill="currentColor"/></button>}
        <div className={`tap-overlay ${controlsVisible ? 'visible' : ''}`}>
          <Link href={backHref} className="floating-back" onClick={e=>e.stopPropagation()}><ArrowLeft/> <span>Voltar</span></Link>
        </div>
      </> : <div className="video-empty"><strong>Vídeo ainda não enviado.</strong><span>Envie o arquivo pelo painel administrativo.</span></div>}
    </section>
  )
}
