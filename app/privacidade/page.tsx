import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata:Metadata={title:'Política de Privacidade'}
export default function PrivacyPage(){return <main className="legal-page"><span className="eyebrow">PRIVACIDADE E LGPD</span><h1>Política de Privacidade</h1><p className="legal-lead">A gente coleta somente o necessário para manter sua conta, lembrar suas histórias e melhorar o Novels Day.</p>
<section><h2>1. Dados tratados</h2><p>Podemos tratar e-mail, identificador da conta, método de login, novelas salvas, progresso dos episódios, informações de assinatura e dados técnicos básicos.</p></section>
<section><h2>2. Por que usamos</h2><p>Usamos esses dados para autenticar você, recuperar senha, manter sua lista, continuar episódios, controlar acesso Premium, prevenir abuso e melhorar o serviço.</p></section>
<section><h2>3. Serviços parceiros</h2><p>O Supabase processa autenticação e dados. A Vercel hospeda o site. O Google participa somente quando você escolhe entrar com sua conta Google.</p></section>
<section><h2>4. Compartilhamento</h2><p>Não vendemos dados pessoais. O compartilhamento ocorre somente com fornecedores necessários, por obrigação legal ou para proteger direitos e segurança.</p></section>
<section><h2>5. Seus direitos</h2><p>Nos termos da LGPD, você pode pedir confirmação, acesso, correção, informação sobre compartilhamento e exclusão, quando aplicável.</p></section>
<section><h2>6. Segurança e retenção</h2><p>Usamos controles de acesso e autenticação. Guardamos os dados pelo tempo necessário para prestar o serviço e cumprir obrigações legais.</p></section>
<section><h2>7. Contato</h2><p>Para solicitar ajuda, acesse <Link href="/ajuda">Ajuda</Link>. Leia também os <Link href="/termos">Termos de Uso</Link>.</p></section></main>}

