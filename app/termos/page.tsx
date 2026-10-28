import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata:Metadata={title:'Termos de Uso'}
export default function TermsPage(){return <main className="legal-page"><span className="eyebrow">ÚLTIMA ATUALIZAÇÃO: 28/10/2026</span><h1>Termos de Uso</h1><p className="legal-lead">Estes termos explicam as regras para usar o Novels Day. Ao criar uma conta ou assistir ao conteúdo, você concorda com eles.</p>
<section><h2>1. Sobre o serviço</h2><p>O Novels Day oferece novelas, histórias e episódios digitais para entretenimento. Parte do catálogo pode ser gratuita e parte pode exigir assinatura ativa.</p></section>
<section><h2>2. Conta e acesso</h2><p>Você deve informar dados verdadeiros, proteger sua senha e não compartilhar o acesso de forma indevida. Podemos solicitar a confirmação do e-mail para verificar a conta.</p></section>
<section><h2>3. Conteúdo e direitos</h2><p>Os vídeos, textos, marcas e artes são protegidos. O acesso é pessoal. Não é permitido copiar, revender, distribuir, baixar por meios não autorizados ou publicar o conteúdo em outra plataforma.</p></section>
<section><h2>4. Conduta</h2><p>Não use o serviço para fraude, invasão, assédio, envio de conteúdo ilegal ou tentativa de contornar controles de acesso. Contas que violem estas regras podem ser suspensas.</p></section>
<section><h2>5. Planos e pagamentos</h2><p>Preço, duração e renovação serão mostrados antes da contratação. Cancelamentos e reembolsos seguirão a oferta exibida e a legislação aplicável.</p></section>
<section><h2>6. Mudanças</h2><p>Podemos atualizar catálogo, recursos e estes termos. Mudanças relevantes serão comunicadas no site.</p></section>
<section><h2>7. Contato</h2><p>Em caso de dúvida, use a página de <Link href="/ajuda">Ajuda</Link>. Consulte também nossa <Link href="/privacidade">Política de Privacidade</Link>.</p></section></main>}

