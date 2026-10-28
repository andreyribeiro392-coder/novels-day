import type { Metadata, Viewport } from 'next'
import AppChrome from '@/components/AppChrome'
import './globals.css'
import './detail.css'
import './player.css'
import './utility.css'
import './interactive.css'

export const metadata: Metadata = {
  title: { default: 'Novels Day', template: '%s | Novels Day' },
  description: 'Novelas curtas, episódios rápidos e histórias que prendem.',
  applicationName: 'Novels Day',
  icons: { icon: '/novels-day-logo.webp', apple: '/novels-day-logo.webp' },
  openGraph: { title: 'Novels Day', description: 'Novelas curtas. Emoções gigantes.', type: 'website' }
}
export const viewport: Viewport = { width:'device-width', initialScale:1, viewportFit:'cover', themeColor:'#12090c' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><AppChrome>{children}</AppChrome></body></html>
}
