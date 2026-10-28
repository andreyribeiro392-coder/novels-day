'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, Compass, Home, Search, UserRound } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/explorar', label: 'Explorar', icon: Compass },
  { href: '/buscar', label: 'Buscar', icon: Search },
  { href: '/minha-lista', label: 'Minha lista', icon: Bookmark },
  { href: '/conta', label: 'Conta', icon: UserRound },
]

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPlayer = pathname.includes('/episodio/')
  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)
  if (isPlayer) return <>{children}</>
  return <div className="app-frame">
    <header className="app-header">
      <Link href="/" className="logo-link" aria-label="Novels Day — início">
        <Image src="/novels-day-logo.webp" alt="Novels Day" width={48} height={48} priority />
        <span className="logo-copy"><strong>novels.day</strong><small>Histórias que marcam</small></span>
      </Link>
      <Link href="/conta" className="header-account" aria-label="Abrir minha conta"><UserRound size={19}/></Link>
    </header>
    {children}
    <footer className="site-footer">
      <Image src="/novels-day-logo.webp" alt="" width={58} height={58}/>
      <div><strong>novels.day</strong><p>Novelas curtas. Emoções gigantes.</p></div>
      <nav aria-label="Links institucionais"><Link href="/termos">Termos de uso</Link><Link href="/privacidade">Privacidade</Link><Link href="/ajuda">Ajuda</Link></nav>
      <small>© {new Date().getFullYear()} Novels Day. Todos os direitos reservados.</small>
    </footer>
    <nav className="mobile-nav" aria-label="Navegação principal">
      {navItems.map(({href,label,icon:Icon})=><Link key={href} href={href} className={active(href)?'active':undefined} aria-current={active(href)?'page':undefined}><Icon size={21}/><span>{label}</span></Link>)}
    </nav>
  </div>
}
