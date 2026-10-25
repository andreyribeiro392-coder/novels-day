import type { Metadata } from 'next'
import './globals.css'
import './detail.css'

export const metadata: Metadata = {
  title: 'NOVELS.DAY',
  description: 'Novelas curtas, episódios rápidos e histórias que prendem.',
  applicationName: 'NOVELS.DAY',
  themeColor: '#0b0712'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
