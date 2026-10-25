import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'

export default function SubscribePage() {
  const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL
  return (
    <main className="utility-page">
      <div className="utility-header">
        <div className="utility-title"><span className="eyebrow">NOVELS.DAY PREMIUM</span><h1>Continue todas as histórias</h1><p>Os episódios gratuitos continuam disponíveis normalmente. O Premium libera os episódios marcados como exclusivos.</p></div>
        <Link href="/" className="back-link"><ArrowLeft size={17}/> Início</Link>
      </div>
      <section className="plan-card">
        <span className="eyebrow">PLANO MENSAL</span>
        <div className="plan-price">R$ 19,99 <small>/ mês</small></div>
        <ul>
          <li><Check size={14}/> Acesso aos episódios Premium</li>
          <li><Check size={14}/> Catálogo publicado no NOVELS.DAY</li>
          <li><Check size={14}/> Cancelamento conforme as regras do provedor de pagamento</li>
        </ul>
        {checkoutUrl ? <a className="primary-button" href={checkoutUrl}>Assinar agora</a> : <div className="utility-message">O checkout real ainda não foi conectado. Defina <code>NEXT_PUBLIC_CHECKOUT_URL</code> na Vercel quando o provedor de pagamento estiver pronto.</div>}
      </section>
    </main>
  )
}
