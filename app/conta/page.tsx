'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { ArrowLeft, LogOut, UserRound } from 'lucide-react'
import { getBrowserSupabase } from '@/lib/supabase-browser'

const supabase = getBrowserSupabase()

export default function AccountPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(true)

  useEffect(() => {
    async function boot() {
      if (!supabase) return setBusy(false)
      const { data } = await supabase.auth.getSession()
      setUserEmail(data.session?.user.email ?? null)
      setBusy(false)
    }
    boot()
    if (!supabase) return
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUserEmail(session?.user.email ?? null))
    return () => data.subscription.unsubscribe()
  }, [])

  async function signIn(event: FormEvent) {
    event.preventDefault()
    if (!supabase) return
    setBusy(true); setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    setMessage(error ? error.message : 'Login realizado com sucesso.')
  }

  async function signUp() {
    if (!supabase || !email || !password) return
    setBusy(true); setMessage('')
    const { error } = await supabase.auth.signUp({ email, password })
    setBusy(false)
    setMessage(error ? error.message : 'Conta criada. Se a confirmação de e-mail estiver ativada no Supabase, confirme sua caixa de entrada.')
  }

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    setUserEmail(null)
  }

  return (
    <main className="utility-page">
      <div className="utility-header">
        <div className="utility-title"><span className="eyebrow">CONTA</span><h1>Seu acesso</h1><p>Login e cadastro usam diretamente o Supabase Auth.</p></div>
        <Link href="/" className="back-link"><ArrowLeft size={17}/> Início</Link>
      </div>

      {!supabase ? <div className="utility-empty">Configure as variáveis do Supabase para ativar contas reais.</div> : userEmail ? (
        <section className="account-card">
          <UserRound size={25}/><h2>Conta conectada</h2><p className="utility-message">{userEmail}</p>
          <button className="text-button" onClick={signOut}><LogOut size={16}/> Sair</button>
        </section>
      ) : (
        <form className="account-card" onSubmit={signIn}>
          <label>E-mail<input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email"/></label>
          <label>Senha<input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} autoComplete="current-password"/></label>
          <div className="account-actions"><button className="primary-button" type="submit" disabled={busy}>{busy ? 'Aguarde…' : 'Entrar'}</button><button className="text-button" type="button" disabled={busy} onClick={signUp}>Criar conta</button></div>
          {message && <div className="utility-message">{message}</div>}
        </form>
      )}
    </main>
  )
}
