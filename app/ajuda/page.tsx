import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, KeyRound, Mail, ShieldCheck } from 'lucide-react'
export const metadata:Metadata={title:'Ajuda'}
export default function HelpPage(){return <main className="legal-page help-page"><span className="eyebrow">CENTRAL DE AJUDA</span><h1>Como podemos ajudar?</h1><p className="legal-lead">Respostas rápidas para acessar sua conta e assistir às histórias.</p><div className="help-grid">
<section><Mail/><h2>Confirmar e-mail</h2><p>Abra a mensagem do Novels Day e toque no link de confirmação. Confira o spam se ela não aparecer.</p></section>
<section><KeyRound/><h2>Esqueci a senha</h2><p>Na página <Link href="/conta">Conta</Link>, toque em “Esqueci minha senha”.</p></section>
<section><ShieldCheck/><h2>Login com Google</h2><p>Use “Continuar com Google” para entrar com segurança sem criar outra senha.</p></section>
<section><CheckCircle2/><h2>Conta verificada</h2><p>Quando o e-mail for confirmado, o selo aparece dentro da sua conta.</p></section></div>
<section><h2>Precisa falar com a equipe?</h2><p>Envie uma mensagem pelas redes oficiais do Novels Day informando o e-mail da conta e o problema. Nunca envie sua senha.</p></section></main>}

